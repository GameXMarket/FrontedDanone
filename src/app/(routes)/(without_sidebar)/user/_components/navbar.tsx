"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export const Navbar = () => {

    const pathname = usePathname()

    const userId = useMemo(() => {
        const arr = pathname.split("/")
        return arr[arr.length - 1]
    }, [pathname])

    const {push} = useRouter()

    return (
        <div className="flex flex-col gap-y-4 text-2xl text-muted-foreground">
            <p onClick={() => push(`/user/offers/${userId}`)} className={cn("hover:text-white transition cursor-pointer", 
                pathname.includes("offers") && "text-gradient")}>
                Товары
            </p>
            <p onClick={() => push(`/user/reviews/${userId}`)} className={cn("hover:text-white transition cursor-pointer",
                pathname.includes("reviews") && "text-gradient")}>
                Отзывы
            </p>
        </div>
    );
};
