'use client'

import { FC, useEffect, useState } from "react";
import styles from './styles/page.module.css'
import Chat from "./_components/chat/Chat";
import Groups from "./_components/groups/groups";
import Dialogs from "./_components/dialogs/dialogs";

const MessengerPage:FC = () => {
    const [isOpenedChat, setIsOpenedChat] = useState<boolean>(false);
    const [dialog, setDialog] = useState({})

    return (
        <main className={styles.messenger_container}>
            <div className={styles.messenger_groupsandchats}>
                <Groups/>
                <Dialogs setDialog={setDialog} setIsOpenedChat={setIsOpenedChat}/>
            </div>
            {isOpenedChat ? (
            <div className="w-full">
                <Chat dialog={dialog}/>
            </div>) : (
            <div className={styles.is_opened_chat}>
                <h2 className="text-[32px] font-semibold">Выберете диалог<br/>и начните беседу!</h2>
            </div>
            )}
        </main>
    )
}

export default MessengerPage