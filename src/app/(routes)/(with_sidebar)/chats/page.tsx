'use client'

import { FC, useEffect, useState } from "react";
import styles from './styles/page.module.css'
import Chat from "./_components/chat/Chat";
import Groups from "./_components/groups/groups";

const MessengerPage:FC = () => {
    const [isOpenedChat, setIsOpenedChat] = useState<boolean>(true);

    return (
        <main className={styles.messenger_container}>
            <div className={styles.messenger_groupsandchats}>
                <Groups/>
                {/*\\<Dialogs setIsOpenedChat={setIsOpenedChat}/>*/}
            </div>
            {isOpenedChat ? (
            <div className="w-full">
                <Chat />
            </div>) : (
            <div className={styles.is_opened_chat}>
                <h2 className="text-[32px] font-semibold">Выберете диалог<br/>и начните беседу!</h2>
            </div>
            )}
        </main>
    )
}

export default MessengerPage