'use client'

import { FC, PropsWithChildren, useState } from "react";
import styles from "./dialogs.module.css";
import Image from "next/image";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { messengerService } from "@/requests/messenger/messenger.service";
import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

interface IDialog {
    dialog: {
        chat_id: any;
        interlocutor_id: number,
        interlocutor_username: string;
        interlocutor_files: Array<string>;
        last_message: {
            content: string
        }
    };
}

const Dialog: FC<PropsWithChildren<IDialog>> = ({
    dialog,
}) => {
    const params = useParams()
    // const { data, error, isLoading } = useAuthQuery({
    //     queryKey: ["get messages for dialog", dialog?.chat_id],
    //     queryFn: () => messengerService.getChatMessages(dialog.chat_id),
    // });

    const validateLastMessage = (message: string) => {
        if (message.length >= 20) {
            let arrMsg = Array.from(message)
            arrMsg.splice(20)
            const res = arrMsg.join('') + '...'

            return res
        }

        return message
    }

    return (
        <Link href={`/chats/${dialog.interlocutor_id}`}>
            <div className={styles.dialog}>
                <div className={styles.dialog_avatar}>
                    <Image
                        src={
                            dialog.interlocutor_files
                                ? dialog.interlocutor_files?.[0]
                                : "/ui-assets/default_avatar.jpg"
                        }
                        alt="avatar"
                        width={70}
                        height={70}
                        className="rounded-full w-[60px] h-[60px] max-w-[60px]"
                    />
                </div>
                <div className="ml-4">
                    <h3
                        className={
                            +params.second_user_id?.[0] === dialog.interlocutor_id
                                ? styles.dialog_name_s
                                : styles.dialog_name
                        }
                    >
                        {dialog.interlocutor_username}
                    </h3>
                    <p className={styles.dialog_preview}>
                        {validateLastMessage(dialog.last_message.content)}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Dialog;
