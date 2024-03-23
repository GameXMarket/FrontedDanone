'use client'

import { FC, useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import { BellIcon } from "lucide-react";
import { LeftMessage, RightMessage } from "./messages";
import { SendMsgIcon } from "../../icons/BellIcon";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import instance from "@/requests";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { messengerService } from "@/requests/messenger/messenger.service";

type MessageType = {
    sender_id: number;
    attachment_id: number | null;
    reply_to: number | null;
    created_at: number;
    id: number;
    receiver_id: number;
    content: string;
    sender: any;
    receiver: any;
};

type SendMessageForm = {
    message: string;
};

interface ChatProps {
    chat?: number
}

const Chat: FC<ChatProps> = ({chat}) => {



    return (
        <div className={styles.chat}>
            <div className="w-full flex">
                <h2 className={styles.chat_name}>Heronwater</h2>
                <div className="pt-2 w-[32px] h-[32px] flex items-center justify-center">
                    <BellIcon />
                </div>
            </div>
            <div className={styles.chat_container}>
               {/* {messages.map((mes) => {
                    if (mes.sender_id === user?.id)
                        return <RightMessage key={mes.id} text={mes.content} />;
                    else return <LeftMessage key={mes.id} text={mes.content} />;
                })} */ } 
                <div  id="anchor"></div>
            </div>
            <form
                className="w-full mt-10 mobile:mt-4 flex gap-x-2"
            >
                        <Input
                            contClassName="mobile:w-full"
                            className="text-white w-[480px] mobile:w-full h-16 mobile:h-12 rounded-[24px]"
                            placeholder="Сообщение"
                        />
                {/* <div className={styles.chat_send_msg}></div> */}
                <button
                    type="submit"
                    className={cn(styles.chat_send_msg, "bg-bgel flex items-center justify-center w-16 min-w-16 mobile:w-12 mobile:min-w-12")}
                >
                        <SendMsgIcon />
                </button>
            </form>
        </div>
    );
};

export default Chat;
