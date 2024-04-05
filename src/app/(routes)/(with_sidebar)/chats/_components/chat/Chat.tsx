'use client'

import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import { BellIcon } from "lucide-react";
import { LeftMessage, RightMessage } from "./messages";
import { SendMsgIcon } from "../../icons/BellIcon";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import instance from "@/requests";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { messengerService } from "@/requests/messenger/messenger.service";
import { FormInput } from "@/app/(auth)/_components/form-input";

interface ChatProps {
    dialog: {
            chat_id?: any
            interlocutor_username?: string
            interlocutor_files?: Array<string>
    }
}


const Chat: FC<ChatProps> = ({dialog}) => {
    const {data:messagesData} = useAuthQuery({
            queryKey: ['get messages', dialog?.chat_id],
            queryFn: async () => {
                const data = await messengerService.getChatMessages(dialog.chat_id)
                setMessages(data)
            },
    })



    const [messages, setMessages] = useState<Array<{}>>([])
    console.log(messages)

    const user = useCurrentUser()
    const socket = useRef<WebSocket>()

    const form = useForm({
        defaultValues: {
            text: ''
        }
    })

    useEffect(() => {
        if (user) {
            socket.current = new WebSocket(`wss://test.yunikeil.ru/ws/chat/my?token=${user.accessToken}`)

            socket.current.addEventListener('open', () => {
                console.log('Socket connetced')
            })

            socket.current.addEventListener('message', (event) => {
                const receivedMessage = JSON.parse(event.data)
                setMessages((prev) => [...prev, receivedMessage])
            })

            socket.current.addEventListener('close', () => {
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
                })
    
                socket.current.removeEventListener('close', () => {
                    console.log('Socket disconnected.')
                })
            }
        }
    }, [])

    const submitHandler = (data: any) => {
        const content = data.text 
        const message = {
            chat_id: dialog.chat_id,
            content: content,
            event: 'message'
        }
        socket.current?.send(JSON.stringify(message))
        form.reset()
    }  


    return (
        <div className={styles.chat}>
            <div className="w-full flex">
                <h2 className={styles.chat_name}>{dialog?.interlocutor_username}</h2>
                <div className="pt-2 w-[32px] h-[32px] flex items-center justify-center">

                </div>
            </div>
            <div className={styles.chat_container}>
               {messages?.map((mes: any) => {
                    if (mes.user_id === user?.id)
                        return <RightMessage date={mes.created_at}  name={user?.username} key={mes.id} text={mes.content} />;
                    else return <LeftMessage date={mes.created_at} name={dialog?.interlocutor_username} key={mes.id} text={mes.content} />;
                })} 
                <div  id="anchor"></div>
            </div>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className="w-full mt-10 mobile:mt-4 flex gap-x-2"
            >
                <FormField
                    control={form.control}
                    name='text'
                    render={({field}) => (
                        <FormInput
                            type="text"
                            {...field}
                            contClassName="mobile:w-full"
                            className="text-white w-[480px] mobile:w-full h-16 mobile:h-12 rounded-[24px]"
                            placeholder="Сообщение"
                        />
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
