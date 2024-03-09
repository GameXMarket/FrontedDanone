import { Avatar } from "@/components/Avatar";
import Image from "next/image";
import Link from "next/link";

export const MobileSidebar = () => {
    return (
        <aside className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-[#1F2028] p-2 z-50 rounded-t-3xl">
            <Link href="/catalog" className="flex flex-col items-center gap-y-2">
                <Image
                    src="/sidebar/catalog.svg"
                    alt="catalog"
                    width={32}
                    height={32}
                />
                <span>Каталог</span>
            </Link>
            <Link href="/my-offers" className="flex flex-col items-center gap-y-2">
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
            <Link href="/settings/profile" className="flex flex-col items-center gap-y-2">
                <Avatar src="/profile-assets/avatar.svg" size={32} />
                <span>Профиль</span>
            </Link>
        </aside>
    );
};
