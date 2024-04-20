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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
    session: SessionContextValue;
}

export const Sidebar = ({ session }: SidebarProps) => {

    const { ref, isShow, setIsShow } = useOutside(false);

    if(!session.data?.user) return null
    return (
        <>
            {isShow && (
                <Modal reference={ref} isShow={isShow} setIsShow={setIsShow} />
            )}
            <aside className={styles.sidebar}>
                <div className={styles.profile_block}>
                    <Avatar
                        src={
                            session.data?.user.img ||
                            "/ui-assets/default_avatar.jpg"
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
            <MobileSidebar session={session} />
        </>
    );
};

export const MobileSidebar = ({ session }: SidebarProps) => {
    const pathname = usePathname()

    return (
        <aside className="hidden mobile:flex fixed bottom-0 left-0 w-full justify-around items-center bg-[#1F2028] p-2 z-40 rounded-t-3xl">
            <Link
                href="/catalog"
                className="flex flex-col items-center gap-y-2"
            >
                <Image
                    src={pathname.includes("/catalog") ? "/sidebar/catalog_active.svg" : "/sidebar/catalog.svg"}
                    alt="catalog"
                    width={32}
                    height={32}
                />
                <span className={cn("text-muted-foreground", pathname.includes("/catalog") && "text-white")}>Каталог</span>
            </Link>
            <Link
                href="/my-offers"
                className="flex flex-col items-center gap-y-2"
            >
                <Image
                    src={pathname.includes("/my-offers") ? "/sidebar/plus_active.svg" : "/sidebar/plus.svg"}
                    alt="catalog"
                    width={32}
                    height={32}
                />
                <span className={cn("text-muted-foreground", pathname.includes("/my-offers") && "text-white")}>Продажи</span>
            </Link>
            <Link href="/chats" className="flex flex-col items-center gap-y-2">
                <Image
                    className="stroke-black"
                    src={pathname.includes("/chats") ? "/sidebar/chat_active.svg" : "/sidebar/chat.svg"}
                    alt="catalog"
                    width={32}
                    height={32}
                />
                <span className={cn("text-muted-foreground", pathname.includes("/chat") && "text-white")}>Чаты</span>
            </Link>
            <Link
                href="/settings/profile"
                className="flex flex-col items-center gap-y-2"
            >
                <Avatar src={session.data?.user.img || "/ui-assets/default_avatar.jpg"} size={32} />
                <span className={cn("text-muted-foreground", pathname.includes("/settings") && "text-white")}>Профиль</span>
            </Link>
        </aside>
    );
};
