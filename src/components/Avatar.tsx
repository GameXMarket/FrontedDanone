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
            onClick={() => push("/me/reviews")}
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
        </div>
    );
};
