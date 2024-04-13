'use client'

import { ChangeEvent, FC, LegacyRef, useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import { LeftMessage, RightMessage } from "./messages";
import { AddFileIcon, SendMsgIcon } from "../../icons/BellIcon";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { cn, convertToBase64 } from "@/lib/utils";
import { messengerService } from "@/requests/messenger/messenger.service";
import { useChatScrollDown } from "@/hooks/useChatScrollDown";
import { AttachmentApiService } from "@/requests/attachment/attachment-service";

interface ChatProps {
    dialog: {
            chat_id: number,
            interlocutor_id: number,
            interlocutor_username?: string
            interlocutor_files?: Array<string>
    }
}

const Chat: FC<ChatProps> = ({dialog}) => {
    const {data:messagesData, isLoading} = useAuthQuery({
        queryKey: ['get messages for chat', dialog?.chat_id],
        queryFn: async () => {
            const data = await messengerService.getChatMessages(dialog.chat_id)
            setMessages(data)
        },
    })

    const [messages, setMessages] = useState<Array<{}>>([])
    const [msgFile, setMsgFile] = useState<string>('')
    console.log(msgFile)


    const user = useCurrentUser()
    const socket = useRef<WebSocket>()
    const autoScroll = useRef<HTMLDivElement>(null)
        //useEffect(() => {
       //     const { offsetHeight, scrollHeight, scrollTop } = autoScroll.current as HTMLDivElement
       //     
     //       if (scrollHeight <= scrollTop + offsetHeight + 100) {
   //             autoScroll.current?.scrollTo(0, scrollHeight)
 //           }
//        }, [messages])

    const form = useForm({
        defaultValues: {
            text: '',
            img: null
        }
    })


    const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        const img = event.target.files![0]
        const base64 = await convertToBase64(img)

        setMsgFile(base64 as string)
    }


    useEffect(() => {
        if (user) {
            socket.current = new WebSocket(`wss://test.yunikeil.ru/ws/chat/my?token=${user.accessToken}`)

            socket.current.addEventListener('open', () => {
                console.log('Socket connetced')
            })

            socket.current.addEventListener('message', (event) => {
                const receivedMessage = JSON.parse(event.data)
                if (receivedMessage.hasOwnProperty('waiting')) {
                    const id = receivedMessage.message_id 
                    AttachmentApiService.uploadFileMessage({message_id: id, files: form.getValues('img')}, user.accessToken)
                    form.reset()
                }
                else {
                    setMessages((prev) => [...prev, receivedMessage])
                }
                console.log(receivedMessage) 
                
            })

            socket.current.addEventListener('close', (err) => {
                console.log(err)
                console.log('Socket disconnected.')
            })
        }
        return () => {
            if (socket.current) {
                socket.current.removeEventListener('open', () => {
                    console.log('Socket connetced')
                })
    
                socket.current.removeEventListener('message', (event) => {
                    const receivedMessage = JSON.parse(event.data)
                    setMessages((prev) => [...prev, receivedMessage])
                    console.log(receivedMessage) 
                })
    
                socket.current.removeEventListener('close', () => {
                    console.log('Socket disconnected.')
                })
            }
        }
    }, [])

    useEffect(() => {
        if (autoScroll.current) {
            autoScroll.current.scrollTop = autoScroll.current.scrollHeight;
        }
    }, [messages])

    const submitHandler = (data: any) => {
        const content = data.text
        console.log(data.img)
        const message = {
            chat_id: dialog.chat_id,
            content: (form.getValues('img') && content === '') ? 'илья сделай нормально' : content,
            need_wait: form.getValues('img') ? 1 : undefined,
            event: 'message'
        }
        socket.current?.send(JSON.stringify(message))
        
        if (!form.getValues('img')) {
            form.reset()
        }

    }  


    return (
        <div className={styles.chat}>
            <div className="w-full flex">
                <h2 className={styles.chat_name}>{dialog?.interlocutor_username}</h2>
                <div className="pt-2 w-[32px] h-[32px] flex items-center justify-center">

                </div>
            </div>
            <div id="chatScroll" className={styles.chat_container} ref={autoScroll}>
                {isLoading && <p>loading...</p>}
               {messages?.map((mes: any) => {
                    if (mes.user_id === user?.id)
                        return <RightMessage files={mes.files} date={mes.created_at} name={user?.username} key={mes.id} text={mes.content} />;
                    else return <LeftMessage files={mes.files} date={mes.created_at} name={dialog?.interlocutor_username} key={mes.id} text={mes.content} />;
                })} 
                <div  id="anchor"></div>
            </div>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={styles.form_chat}
            >
                <FormField
                    control={form.control}
                    name='img'
                    render={({ field: {onChange}, ...field }) => (
                        <Input
                            title=" "
                            {...field}
                            onChange={(event: any) => {
                                const dataTransfer = new DataTransfer()
                                Array.from(event.target.files!).forEach((image: any) =>
                                dataTransfer.items.add(image)
                                );

                                const files = dataTransfer.files
                                onChange(files)
                                uploadFileHandler(event)
                            }}
                            type="file"
                            placeholder=""
                            className={cn(styles.add_photo)}
                        />)} >                
                </FormField>            
                <div className={styles.add_photo_i}>
                    <AddFileIcon/>
                </div>
                <FormField
                    control={form.control}
                    name='text'
                    render={({field}) => (
                        <>
                        <Input
                            autoComplete="off"
                            type="text"
                            {...field}
                            contClassName="mobile:w-full"
                            className="text-white w-[440px] mobile:w-full h-16 mobile:h-12 rounded-[24px]"
                            placeholder="Сообщение"
                        />
                        </>
                    )} >                
                </FormField>
                {/* <div className={styles.chat_send_msg}></div> */}
                <button
                    type="submit"
                    className={cn(styles.chat_send_msg, "bg-bgel flex items-center justify-center h-16 w-16 min-w-16 mobile:w-12 mobile:min-w-12")}
                >
                        <SendMsgIcon />
                </button>
            </form>
        </div>
    );
};

export default Chat;
