import { Button } from "@/components/ui/button"
import styles from './buttons.module.css'
import { ChatIcon } from "./icons/ButtonIcons"

export const SellButton = () => {
    return (
        <div className="w-[218px] mt-2 h-[42px]">
            <Button className={styles.button}>
                <div className="w-full flex">
                    <ChatIcon/>
                    <span className="text-[13px] pl-[7px] font-semibold">Продать</span>
                </div>
            </Button>
        </div>
    )
} 

export const ChatButton = () => {
    return (
        <div className="w-[218px] mt-2 h-[42px]">
            <Button className={styles.button}>
                <div className="w-full flex">
                    <div className="flex">
                        <ChatIcon/>
                        <span className="text-[13px] pl-[7px] font-semibold">Чаты</span>
                    </div>
                    <div className={styles.button_msg_wrapper}>
                        <div className={styles.button_count_msg}>
                            3
                        </div>
                    </div>
                </div>
            </Button>
        </div>
    )
} 