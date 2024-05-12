'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export const MobileNavbar = () => {
    const pathname = usePathname();

    const userId = useMemo(() => {
        const arr = pathname.split("/")
        return arr[arr.length - 1]
    }, [pathname])

    const { push } = useRouter();

    return (
        <nav className="hidden mobile:block text-center space-x-4 space-y-4">
            <Button
                variant="outline"
                onClick={() => push(`/user/offers/${userId}`)}
                className={cn(
                    "hover:text-white transition cursor-pointer text-lg",
                    pathname.includes("offers") && "text-white outline outline-2 outline-[#F8322B]"
                )}
            >
                Товары
            </Button>
            <Button
                variant="outline"
                onClick={() => push(`/user/reviews/${userId}`)}
                className={cn(
                    "hover:text-white transition cursor-pointer text-lg",
                    pathname.includes("reviews") && "text-white outline outline-2 outline-[#F8322B]"
                )}
            >
                Отзывы
            </Button>
        </nav>
    );
};
