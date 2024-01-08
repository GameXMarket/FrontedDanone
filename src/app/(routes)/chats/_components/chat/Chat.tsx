import { FC } from "react";
import styles from './chat.module.css'
import { BellIcon } from "lucide-react";
import Image from "next/image";
import { LeftMessage, RightMessage } from "./messages";

const Chat:FC = () => {
    return (
        <div className={styles.chat}>
            <div className="w-full flex">
                <h2 className={styles.chat_name}>Heronwater</h2>
                <div className="pt-2 w-[32px] h-[32px] flex items-center justify-center">
                    <BellIcon/>
                </div>
            </div>
            <div className={styles.chat_container}>
                <RightMessage/>
                <LeftMessage/>
                <RightMessage/>
                <RightMessage/>
                <LeftMessage/>
                <RightMessage/>
                <LeftMessage/>
            </div>
        </div>
    )
}

export default Chat