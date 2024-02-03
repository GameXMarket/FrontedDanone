"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { MobileNavbar } from "./mobile-navbar";

export const Navbar = () => {

    const pathname = usePathname()
    
    const {push} = useRouter()

    const mobileRes = useMediaQuery({
        query: "(max-width: 440px)",
    });

    if(mobileRes){
        return <MobileNavbar />
    }

    return (
        <nav className="flex flex-col gap-y-4 text-2xl text-muted-foreground">
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
        </nav>
    );
};
