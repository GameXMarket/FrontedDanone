"use client";

import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import { LeftMessage, RightMessage } from "./messages";
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

interface ChatProps {
    dialog: {
        chat_id: number;
        interlocutor_id: number;
        interlocutor_username?: string;
        interlocutor_files?: Array<string>;
    };
    dialogError?: boolean;
    userIdFromOffer?: number;
    offerId?: string
}

const Chat: FC<ChatProps> = ({ dialog, dialogError, userIdFromOffer, offerId }) => {
    const queryClient = useQueryClient()

    const webSocket = useRef<WebSocket>();
    const [messages, setMessages] = useState<Array<{}>>([]);

    const { data: messagesData, isLoading } = useAuthQuery({
        queryKey: ["get messages for chat", dialog?.chat_id],
        queryFn: () => messengerService.getChatMessages(dialog.chat_id),
    });

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
            setMessages((prev) => [...prev, receivedMessage]);
        }
    };

    useEffect(() => {
        if (user) {
            const socket = new WebSocket(
                `wss://test.yunikeil.ru/ws/chat/my?token=${user.accessToken}`
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
            const message = {
                chat_id: dialog.chat_id,
                content:
                    form.getValues("img") && content === ""
                        ? "илья сделай нормально"
                        : content,
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
        </div>
    );
};

export default Chat;
