import { Button } from "@/components/ui/button";
import styles from "./buttons.module.css";
import {
    AddIcon,
    CatalogIcon,
    ChatIcon,
    ShopIcon,
} from "../icons/SidebarIcons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { chatNotifAtom } from "@/atoms/chatAtom";

export const MyOrdersButton = () => {
    "use client";

    const { push } = useRouter();

    return (
        <div className="">
            <Button className={styles.button}>
            <Link href='/my-offers'>
                <div className="w-full flex items-center">
                    <div className="w-[32px]">
                        <ShopIcon />
                    </div>
                        <div className="w-full pl-5 items-center flex mr-4">
                            <span className="text-[24px] text-left font-normal">
                                Мои продажи
                            </span>
                        </div>
                    <div
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.preventDefault()
                            e.stopPropagation()
                            push("/new-offer");
                        }}
                        className="flex w-full justify-end opacity-15 hover:opacity-70 hover:scale-110 transition"
                    >
                        <AddIcon />
                    </div>
                </div>
                </Link>
            </Button>
        </div>
    );
};

export const ChatButton = () => {
    "use client"

    const chatNotif = useAtomValue(chatNotifAtom)
    return (
        <Link href='/chats'> 
            <div className="">
                <Button className={styles.button}>
                    <div className="w-full flex items-center">
                        <div className="w-[32px]">
                            <ChatIcon />
                        </div>
                        <div className="w-full pl-5 flex justify-start">
                            <span className="text-[24px] font-normal">Чаты</span>
                        </div>
                        {chatNotif > 0 && <div className={styles.button_msg_wrapper}>
                            <div className={styles.button_count_msg}>{chatNotif}</div>
                        </div>}
                    </div>
                </Button>
            </div>
        </Link>
    );
};

export const CatalogButton = () => {
    return (
        <div>
            <Link href="/catalog">
                <div className="">
                    <Button className={styles.button}>
                        <div className="w-full flex items-center">
                            <div className="w-[32px]">
                                <CatalogIcon />
                            </div>
                            <div className="w-full pl-5 flex justify-start">
                                <span className="text-[24px] font-normal">
                                    Каталог игр
                                </span>
                            </div>
                        </div>
                    </Button>
                </div>
            </Link>
        </div>
    );
};

export const AuthButton = () => {
    return (
        <Button className={styles.button_auth}>
            <span className="text-[13px]">Вход / Регистрация</span>
        </Button>
    );
};
