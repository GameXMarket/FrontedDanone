"use client";

import { ChangeEvent, FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import { AdminMessage, LeftMessage, ParcelMessage, RightMessage } from "./messages";
import { AddFileIcon } from "../../icons/BellIcon";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { cn, convertToBase64 } from "@/lib/utils";
import { messengerService } from "@/requests/messenger/messenger.service";
import { AttachmentApiService } from "@/requests/attachment/attachment-service";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import { ChatProps } from "../interfaces/chat.interfaces";
import { safeCreateConfirmationRequest, salesApiService } from "@/requests/sales/sales-service";
import { Button } from "@/components/ui/button";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { CreateConfirmationRequestDto } from "@/requests/sales/schemas";
import toast from "react-hot-toast";
import { purchaseApiService, safeCompletePurchase } from "@/requests/purchase/purchase-service";
import { CompletePurchaseDto } from "@/requests/purchase/schemas";

const Chat:FC<PropsWithChildren<ChatProps>> = ({sortedDialogs, setSortedDialogs, dialog, dialogError, userIdFromOffer, offerId }) => {
    const queryClient = useQueryClient()

    const webSocket = useRef<WebSocket>();
    const [messages, setMessages] = useState<Array<any>>([]);

    const { data: messagesData, isLoading, refetch } = useAuthQuery({
        queryKey: ["get messages for chat", dialog?.chat_id],
        queryFn: () => messengerService.getChatMessages(dialog.chat_id),
    });

    const {mutation: saleMutation} = useSafeMutation<CreateConfirmationRequestDto, unknown>(safeCreateConfirmationRequest, {
        onSuccess(data: any) {
            queryClient.invalidateQueries({queryKey: ["offer_status", data.offer_id]})
            toast.success("Запрос отправлен!")
        }
    })

    const createConfRequest = () => {
        if(sales?.[0]){
            saleMutation.mutate({purchase_id: sales?.[0].id.toString()})
        }
    }
    const {data: sales, refetch: salesRefetch} = useAuthQuery({
        queryFn: async () => await salesApiService.getAllSales("process").then(res => res.filter((val) => (val.buyer_id === dialog.interlocutor_id))),
        queryKey: ["get sales for this dialog", dialog?.chat_id, saleMutation.status],
        enabled: !!dialog,
        retry: 1
    })

    const {mutation: purchaseMutation} = useSafeMutation<CompletePurchaseDto, unknown>(safeCompletePurchase, {
        onSuccess(data: any) {
            toast.success("Покупка успешно совершена!")
            queryClient.invalidateQueries({queryKey: ["get purchases for this dialog", dialog?.chat_id]})
            queryClient.invalidateQueries({queryKey: ["offer_status", data.offer_id]})
            purchaseRefetch()
        }
    })
    const completePurchase = () => {
        if(purchases?.[0]){
            purchaseMutation.mutate({purchase_id: purchases?.[0].id.toString(), state: true})
        }
    }
    const {data: purchases, refetch: purchaseRefetch, isError: purchaseIsError, isPending: purchasesIsPending} = useAuthQuery({
        queryFn: async () => await purchaseApiService.getAllPurchases("review").then(res => res.filter((val) => val.seller_id === dialog.interlocutor_id)),
        queryKey: ["get purchases for this dialog", dialog?.chat_id],
        enabled: !!dialog,
        retry: 1
    })
    
    useEffect(() => {
        setMessages(messagesData || []);
    }, [messagesData]);

    const [msgFile, setMsgFile] = useState<string>("");

    const user = useCurrentUser();
    const autoScroll = useRef<HTMLDivElement>(null);

    const form = useForm({
        defaultValues: {
            text: "",
            img: null,
        },
    });

    const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        const img = event.target.files![0];
        const base64 = await convertToBase64(img);

        setMsgFile(base64 as string);
    };

    const close = () => {
        // console.log("connection closed");
    };
    const open = () => {
        // console.log("connection opened");
    };
    const sendMessage = (event: MessageEvent<any>) => {
        const receivedMessage = JSON.parse(event.data);
        if (receivedMessage.hasOwnProperty("waiting")) {
            if (user) {
                const id = receivedMessage.message_id;
                AttachmentApiService.uploadFileMessage(
                    { message_id: id, files: form.getValues("img") },
                    user.accessToken
                );
                form.reset();
                setMsgFile("")
            }
        } else {
            if(receivedMessage.user_id === -1){
                salesRefetch()
                purchaseRefetch()
            }
            setMessages((prev) => [...prev, receivedMessage]);
        }
    };

    useEffect(() => {
        if (user) {
            const socket = new WebSocket(
                `wss://test0.yunikeil.ru/ws/chat/my?token=${user.accessToken}`
            );

            socket.addEventListener("open", open);
            socket.addEventListener("close", close);
            socket.addEventListener("message", sendMessage);
            webSocket.current = socket;
        }
        return () => {
            webSocket.current?.close();
        };
    }, [user]);

    useEffect(() => {
        if (autoScroll.current) {
            autoScroll.current.scrollTop = autoScroll.current.scrollHeight;
        }
    }, [messages]);

    const submitHandler = (data: any) => {
        if (dialogError) {
            if (userIdFromOffer) {
                messengerService.createDialog(userIdFromOffer, {
                    content: data.text,
                    message_image: form.getValues("img"),
                }).then(() => {
                    queryClient.invalidateQueries({queryKey: ["get dialog", offerId]})
                }).finally(() => {
                    form.reset()
                    setMsgFile("")
                });
            }
        } else {
            const content = data.text;
            if(content === "" && !form.getValues("img")) return
            const message = {
                chat_id: dialog.chat_id,
                content: content,
                need_wait: form.getValues("img") ? 1 : undefined,
                event: "message",
            };
            webSocket.current?.send(JSON.stringify(message));

            if (!form.getValues("img")) {
                form.reset();
            }
        }
    };

    if (dialogError)
        return (
            <div className={styles.chat}>
                <div
                    className={cn(
                        styles.chat_container,
                        "text-xl justify-center border border-muted-foreground rounded-xl"
                    )}
                >
                    Напишите что-нибудь чтобы начать диалог.
                </div>
                <form
                    onSubmit={form.handleSubmit(submitHandler)}
                    className={styles.form_chat}
                >
                    <FormField
                        control={form.control}
                        name="img"
                        render={({
                            field: { onChange },
                            fieldState,
                            formState,
                            ...field
                        }) => (
                            <Input
                                title=" "
                                {...field}
                                onChange={(event: any) => {
                                    const dataTransfer = new DataTransfer();
                                    Array.from(event.target.files!).forEach(
                                        (image: any) =>
                                            dataTransfer.items.add(image)
                                    );

                                    const files = dataTransfer.files;
                                    onChange(files);
                                    uploadFileHandler(event);
                                }}
                                type="file"
                                placeholder=""
                                className={cn(styles.add_photo)}
                            />
                        )}
                    ></FormField>
                    <div className={styles.add_photo_i}>
                        <AddFileIcon className="mobile:w-[30px]" />
                    </div>
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <>
                                <Input
                                    autoComplete="off"
                                    type="text"
                                    {...field}
                                    contClassName="w-full"
                                    className="text-white w-full mobile:w-full h-16 mobile:h-12 rounded-[24px] pl-14"
                                    placeholder="Сообщение"
                                />
                            </>
                        )}
                    ></FormField>
                    {/* <div className={styles.chat_send_msg}></div> */}
                    <button
                        type="submit"
                        className={cn(
                            styles.chat_send_msg,
                            "bg-bgel flex items-center justify-center h-16 w-16 min-w-16 ml-2 mobile:w-12 mobile:min-w-12 mobile:h-12"
                        )}
                    >
                        <Image
                            src="/chat/send.svg"
                            className="w-[32px] h-[32px] mobile:w-[24px] mobile:h-[24px]"
                            alt="send"
                            width={24}
                            height={24}
                        />
                    </button>
                </form>
            </div>
        );
    return (
        <div className={styles.chat}>
            <div className="w-full flex items-center gap-x-4">
                <div className="hidden mobile:block relative w-[64px] h-[64px]">
                    <Image
                        className="object-cover rounded-full"
                        alt="avatar"
                        fill
                        src={
                            dialog?.interlocutor_files?.[0] ||
                            "/ui-assets/default_avatar.jpg"
                        }
                    />
                </div>
                <div className="space-y-1">
                    <h2 className={styles.chat_name}>
                        {dialog?.interlocutor_username}
                    </h2>
                    <p className="hidden mobile:block text-[16px] leading-[16px] text-gradient">
                        В сети
                    </p>
                </div>
            </div>
            <Separator className="hidden mobile:block w-2/3 mx-auto my-4 bg-muted-foreground" />
            <div
                id="chatScroll"
                className={styles.chat_container}
                ref={autoScroll}
            >
                {isLoading ? (
                    <p>loading...</p>
                ) : (
                    messages?.map((mes: any) => {
                        if (mes.user_id === user?.id)
                            return (
                                <RightMessage
                                    files={mes.files}
                                    date={mes.created_at}
                                    name={user?.username}
                                    key={mes.created_at}
                                    text={mes.content}
                                />
                            );
                        else if (mes.user_id === -1){
                            if(typeof mes.content === "object"){
                                return mes.content.parcels.map((el: any) => <ParcelMessage text={el.value} key={el.created_at} />)
                            }
                            else{
                                return (
                                    <AdminMessage text={mes.content} key={mes.created_at}/> 
                                )
                            }
                        }
                        else
                            return (
                                <LeftMessage
                                    files={mes.files}
                                    date={mes.created_at}
                                    name={dialog?.interlocutor_username}
                                    key={mes.created_at}
                                    text={mes.content}
                                />
                            );
                    })
                )}
                <div id="anchor"></div>
            </div>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={styles.form_chat}
            >
                <FormField
                    control={form.control}
                    name="img"
                    render={({
                        field: { onChange },
                        fieldState,
                        formState,
                        ...field
                    }) => (
                        <Input
                            title=" "
                            {...field}
                            onChange={(event: any) => {
                                const dataTransfer = new DataTransfer();
                                Array.from(event.target.files!).forEach(
                                    (image: any) =>
                                        dataTransfer.items.add(image)
                                );

                                const files = dataTransfer.files;
                                onChange(files);
                                uploadFileHandler(event);
                            }}
                            type="file"
                            placeholder=""
                            className={cn(styles.add_photo)}
                        />
                    )}
                ></FormField>
                <div className={styles.add_photo_i}>
                    {msgFile && <div className="w-4 h-4 text-xs absolute top-[10px] left-[14px] back-gradient flex items-center justify-center rounded-full">1</div>}
                    <AddFileIcon className="mobile:w-[30px]" />
                </div>
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <>
                            <Input
                                autoComplete="off"
                                type="text"
                                {...field}
                                contClassName="w-full"
                                className="text-white w-full mobile:w-full h-16 mobile:h-12 rounded-[24px] pl-14"
                                placeholder="Сообщение"
                            />
                        </>
                    )}
                ></FormField>
                {/* <div className={styles.chat_send_msg}></div> */}
                <button
                    type="submit"
                    className={cn(
                        styles.chat_send_msg,
                        "bg-bgel flex items-center justify-center h-16 w-16 min-w-16 ml-2 mobile:w-12 mobile:min-w-12 mobile:h-12"
                    )}
                >
                    <Image
                        src="/chat/send.svg"
                        className="w-[32px] h-[32px] mobile:w-[24px] mobile:h-[24px]"
                        alt="send"
                        width={24}
                        height={24}
                    />
                </button>
            </form>
            {sales?.length! > 0 && <Button disabled={saleMutation.isPending} onClick={() => createConfRequest()} variant="accent" size="lg" className="mt-4">Запросить подтверждение оплаты</Button>}
            {(purchases?.length! > 0 && !purchaseIsError) && <Button disabled={purchaseMutation.isPending || purchasesIsPending} onClick={() => completePurchase()} variant="accent" size="lg" className="mt-4">Подтвердить покупку</Button>}
        </div>
    );
};

export default Chat;
