'use client'

import { FC, useState } from "react";
import styles from './styles/page.module.css'
import Groups from "./_components/groups/groups";
import Dialogs from "./_components/dialogs/dialogs";
import Chat from "./_components/chat/Chat";

const MessengerPage:FC = () => {
    const [isOpenedChat, setIsOpenedChat] = useState<boolean>(false);

    return (
        <div className={styles.messenger_container}>
            <div className={styles.messenger_groupsandchats}>
                <Groups/>
                {/*<Dialogs setIsOpenedChat={setIsOpenedChat}/>*/}
            </div>
            {/* {isOpenedChat ? (
            <div className="w-full">
                <Chat/>
            </div>) : (
            <div className={styles.is_opened_chat}>
                <h2 className="text-[32px] font-semibold">Выберете диалог<br/>и начните беседу!</h2>
            </div>
            )} */}
        </div>
    )
}

export default MessengerPage