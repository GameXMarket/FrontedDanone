import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const UserInfo = () => {
    return (
        <div className="flex flex-col items-center gap-y-6">
            <div className="flex gap-x-6 items-center">
                <Avatar size={80} />
                <div>
                    <p className="text-3xl">Демьян</p>
                    <div className="flex items-center gap-x-1">
                        <span className="text-muted-foreground text-lg mr-1">Оценка:</span>
                        {Array.from({length: 5}, (_, idx) => <Image key={idx} src='/images/main/star.svg' alt="star" width={16} height={16} />)}
                        <span>5.0</span>
                    </div>
                </div>
            </div>
            <div className="rounded-full bg-[#FB2A29] bg-opacity-5 px-6 py-4 flex items-center gap-x-3 cursor-pointer hover:bg-opacity-10 transition">
                <Image src="/profile-assets/empty-wallet.svg" alt="wallet" width={25} height={25} />
                <span className="text-lg leading-4">19,221.01₽</span>
            </div>
        </div>
    );
};
