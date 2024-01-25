"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export const Navbar = () => {

    const pathname = usePathname()
    
    const {push} = useRouter()

    return (
        <div className="flex flex-col gap-y-4 text-2xl text-muted-foreground">
            <p
                onClick={() => push("/settings/profile")}
                className={cn(
                    "hover:text-white transition cursor-pointer",
                    pathname.includes("profile") && "text-gradient"
                )}
            >
                Профиль
            </p>
            <p
                onClick={() => push("/settings/security")}
                className={cn(
                    "hover:text-white transition cursor-pointer",
                    pathname.includes("security") && "text-gradient"
                )}
            >
                Безопасность
            </p>
            <p
                onClick={() => push("/settings/notifications")}
                className={cn(
                    "hover:text-white transition cursor-pointer",
                    pathname.includes("notifications") && "text-gradient"
                )}
            >
                Оповещения
            </p>
        </div>
    );
};
