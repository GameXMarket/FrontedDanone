import { Avatar } from "@/components/Avatar";
import Image from "next/image";

export const MobileSidebar = () => {
    return (
        <aside className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-[#1F2028] p-2 z-50 rounded-t-3xl">
            <div className="flex flex-col items-center gap-y-2">
                <Image
                    src="/sidebar/catalog.svg"
                    alt="catalog"
                    width={32}
                    height={32}
                />
                <span>Каталог</span>
            </div>
            <div className="flex flex-col items-center gap-y-2">
                <Image
                    src="/sidebar/plus.svg"
                    alt="catalog"
                    width={32}
                    height={32}
                />
                <span>Продажи</span>
            </div>
            <div className="flex flex-col items-center gap-y-2">
                <Image
                    src="/sidebar/chat.svg"
                    alt="catalog"
                    width={32}
                    height={32}
                />
                <span>Чаты</span>
            </div>
            <div className="flex flex-col items-center gap-y-2">
                <Avatar src="/profile-assets/avatar.svg" size={32} />
                <span>Профиль</span>
            </div>
        </aside>
    );
};
