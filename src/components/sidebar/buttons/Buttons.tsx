import { Button } from "@/components/ui/button"
import styles from './buttons.module.css'
import { AddIcon, CatalogIcon, ChatIcon, ShopIcon } from "../icons/SidebarIcons"

export const MyOrdersButton = () => {
    return (
        <div className="">
            <Button className={styles.button}>
                <div className="w-full flex items-center">
                    <div className="w-[32px]">
                        <ShopIcon/>
                    </div>
                    <div className="w-full pl-5 items-center flex">
                        <span className="text-[24px] text-left font-normal">Мои продажи</span>
                    </div>
                    <div className="flex w-full justify-end">
                        <AddIcon/>
                    </div>
                </div>
            </Button>
        </div>
    )
} 

export const ChatButton = () => {
    return (
        <div className="">
            <Button className={styles.button}>
                <div className="w-full flex items-center">
                    <div className="w-[32px]">
                        <ChatIcon/>
                    </div>
                    <div className="w-full pl-5 flex justify-start">
                        <span className="text-[24px] font-normal">Чаты</span>
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

export const CatalogButton = () => {
    return (
        <div className="">
            <Button className={styles.button}>
                <div className="w-full flex items-center">
                    <div className="w-[32px]">
                        <CatalogIcon/>
                    </div>
                    <div className="w-full pl-5 flex justify-start">
                        <span className="text-[24px] font-normal">Каталог игр</span>
                    </div>
                </div>
            </Button>
        </div>
    )
}

export const AuthButton = () => {
    return (
        <Button className={styles.button_auth}>
            <span className="text-[13px]">Вход / Регистрация</span>
        </Button>
    )
} 