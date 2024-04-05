"use client";

import styles from "./sidebar.module.css";
import Image from "next/image";
import {
    CatalogButton,
    ChatButton,
    MyOrdersButton,
} from "./buttons/Buttons";
import { InfoIcon, SettingsIcon, SupportIcon } from "./icons/SidebarIcons";
import { SessionContextValue, useSession } from "next-auth/react";
import { Avatar } from "@/components/Avatar";
import Modal from "./modal";
import { useOutside } from "@/hooks/useOutside";
import { NotificationsModal } from "../Notifications";
import Link from "next/link";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { userService } from "@/requests/user/user.service";

interface SidebarProps {
    session: SessionContextValue;
}

export const Sidebar = ({ session }: SidebarProps) => {
    const {data, error, isLoading} = useAuthQuery({
        queryKey: ['get user data'],
        queryFn: () => userService.getUser()
    })

    if (data === null) {
        data.files = ['']
    }

    const { ref, isShow, setIsShow } = useOutside(false);

    return (
        <>
            {isShow && (
                <Modal reference={ref} isShow={isShow} setIsShow={setIsShow} />
            )}
            <aside className={styles.sidebar}>
                <div className={styles.profile_block}>
                    <Avatar
                        src={
                            data?.files?.[0] ||
                            "/profile-assets/avatar.svg"
                        }
                        size={60}
                    />
                    <div className={styles.profile_info_block}>

                        <div className="w-full flex">
                            <Link href={'/me/reviews'}>
                                <h4 className={styles.sidebar_name}>
                                    {session?.data?.user.username}
                                </h4>
                            </Link>
                            <NotificationsModal />
                        </div>
                        <div
                            className={styles.profile_info_wallet}
                            onClick={() => setIsShow(!isShow)}
                        >
                            <div className="pl-4">
                                <Image
                                    alt="wallet"
                                    src="/profile-assets/empty-wallet.svg"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <h5 className={styles.profile_count}>19 221.01₽</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.order_details}>
                    <p className={styles.profile_p}>
                        Сделок:
                        <span className="font-light text-[24px]"> 2991</span>
                    </p>
                    <p className={styles.profile_p}>
                        На сайте:
                        <span className="font-light text-[24px]"> 3 года</span>
                    </p>
                </div>
                <div className={styles.variants}>
                    <MyOrdersButton />
                    <ChatButton />
                    <CatalogButton />
                </div>
                <div className={styles.info_block}>
                    <div className="flex cursor-pointer ">
                        <SettingsIcon />
                        <Link href={"/settings/profile"}>
                            <p className="text-[24px] opacity-[0.16] ml-4 font-regular">
                                Настройки
                            </p>
                        </Link>
                    </div>
                    <div className="flex cursor-pointer mt-[28px]">
                        <SupportIcon />
                        <Link href={"/support"}>
                            <p className="text-[24px] opacity-[0.16] ml-4 font-regular">
                                Тех. поддержка
                            </p>
                        </Link>
                    </div>
                    <div className="flex cursor-pointer mt-[28px]">
                        <InfoIcon />
                        <p className="text-[24px] opacity-[0.16] ml-4 font-regular">
                            О нас
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export const MobileSidebar = ({ session }: SidebarProps) => {
    return (
        <aside className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-[#1F2028] p-2 z-50 rounded-t-3xl">
            <Link
                href="/catalog"
                className="flex flex-col items-center gap-y-2"
            >
                <Image
                    src="/sidebar/catalog.svg"
                    alt="catalog"
                    width={32}
                    height={32}
                />
                <span>Каталог</span>
            </Link>
            <Link
                href="/my-offers"
                className="flex flex-col items-center gap-y-2"
            >
                <Image
                    src="/sidebar/plus.svg"
                    alt="catalog"
                    width={32}
                    height={32}
                />
                <span>Продажи</span>
            </Link>
            <Link href="/chats" className="flex flex-col items-center gap-y-2">
                <Image
                    src="/sidebar/chat.svg"
                    alt="catalog"
                    width={32}
                    height={32}
                />
                <span>Чаты</span>
            </Link>
            <Link
                href="/settings/profile"
                className="flex flex-col items-center gap-y-2"
            >
                <Avatar src="/profile-assets/avatar.svg" size={32} />
                <span>Профиль</span>
            </Link>
        </aside>
    );
};
