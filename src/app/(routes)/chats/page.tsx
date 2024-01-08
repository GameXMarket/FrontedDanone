import { FC } from "react";
import styles from './styles/page.module.css'
import Groups from "./_components/groups/groups";
import Dialogs from "./_components/dialogs/dialogs";
import Chat from "./_components/chat/Chat";

const MessengerPage:FC = () => {
    return (
        <div className={styles.messenger_container}>
            <div className={styles.messenger_groupsandchats}>
                <Groups/>
                <Dialogs/>
            </div>
            <div className="w-full">
                <Chat/>
            </div>
        </div>
    )
}

export default MessengerPage