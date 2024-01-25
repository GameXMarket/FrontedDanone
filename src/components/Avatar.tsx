'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AvatarProps {
    size?: number;
    src?: string
}

export const Avatar = ({ size, src }: AvatarProps) => {

    const {push} = useRouter()

    return (
        <div
            onClick={() => push("/settings/profile")}
            className={cn(
                `relative w-[${size || 50}px] h-[${
                    size || 50
                }px] group rounded-full cursor-pointer`
            )}
        >
            <Image
                className="absolute object-cover rounded-full group-hover:opacity-50"
                src={src || "/images/temp_main/diablo.png"}
                alt="logo"
                fill
            />
            <Image
                className={cn(
                    `absolute translate-y-[${
                        size ? size : 50
                    }px] top-1/2 group-hover:-translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all`
                )}
                alt="avatar"
                width={size ? Math.floor(size/2.6) : 20}
                height={size ? Math.floor(size/2.6) : 20}
                src="/profile-assets/settings.svg"
            />
        </div>
    );
};
