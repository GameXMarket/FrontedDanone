import { FC } from "react";
import styles from './chat.module.css'
import { BellIcon } from "lucide-react";
import { LeftMessage, RightMessage } from "./messages";
import MessengerInput from "../input/Input";
import { SendMsgIcon } from "../../icons/BellIcon";

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
            <div className="w-full mt-10 flex">
                <MessengerInput/>
                <div className={styles.chat_send_msg}>
                </div>
                <div className="flex cursor-pointer items-center justify-center">
                    <div className="absolute translate-x-[-32px]">
                     <SendMsgIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat