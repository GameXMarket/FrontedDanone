"use client";

import styles from "../styles/page.module.css";
import Chat from "../_components/chat/Chat";
import Groups from "../_components/groups/groups";
import Dialogs from "../_components/dialogs/dialogs";
import { messengerService } from "@/requests/messenger/messenger.service";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useSetAtom } from "jotai";
import { chatNotifAtom } from "@/atoms/chatAtom";
import { useEffect, useState } from "react";

const ChatPage = () => {
    const [sortedDialogs, setSortedDialogs] = useState<Array<{}>>([]);
    const setChatNotif = useSetAtom(chatNotifAtom)

    useEffect(() => {
        setChatNotif(0)
    }, [])

    const params = useParams<{ second_user_id?: string[] }>();

    const { data: dialog } = useAuthQuery({
        queryKey: ["dialog", params.second_user_id?.[0]],
        queryFn: () =>
            messengerService.getDialogById(+params?.second_user_id?.[0]!),
        enabled:
            !!params.second_user_id?.length &&
            params.second_user_id?.length > 0,
    });

    const {data: dialogs } = useAuthQuery({
        queryKey: ['get all chats'],
        queryFn: () => messengerService.getAllChats()
    })

    useEffect(() => {
        if (dialogs) {
            dialogs.sort((a: any, b: any) => {
                const firstLastMessage = new Date(a.last_message.created_at.toString())
                const secondLastMessage = new Date(b.last_message.created_at.toString())
                
                return +secondLastMessage - +firstLastMessage 
            })
        }
    }, [dialogs])

    return (
        <>
            <main className={styles.messenger_container}>
                <div className={styles.messenger_groupsandchats}>
                    <Groups />
                    <Dialogs dialogs={dialogs} sortedDialogs={sortedDialogs} />
                </div>
                {!!params.second_user_id ? (
                    <div className="w-full">
                        <Chat sortedDialogs={sortedDialogs} setSortedDialogs={setSortedDialogs} dialog={dialog as any} />
                    </div>
                ) : (
                    <div className={styles.is_opened_chat}>
                        <h2 className="text-[32px] font-semibold">
                            Выберете диалог
                            <br />и начните беседу!
                        </h2>
                    </div>
                )}
            </main>
            <main className="hidden mobile:block">
                {!!params.second_user_id ? (
                    <div>
                        <Link
                            href="/chats"
                            className="flex items-center absolute top-[23px] left-2"
                        >
                            <ChevronLeft />
                            <span>Назад</span>
                        </Link>
                        <Chat sortedDialogs={sortedDialogs} setSortedDialogs={setSortedDialogs} dialog={dialog as any} />
                    </div>
                ) : (
                    <div className="px-2">
                        <Groups />
                        <Dialogs dialogs={dialogs} sortedDialogs={sortedDialogs} />
                    </div>
                )}
            </main>
        </>
    );
};

export default ChatPage;
