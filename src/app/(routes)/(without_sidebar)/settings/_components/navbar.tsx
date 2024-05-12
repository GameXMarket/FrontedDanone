"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { MobileNavbar } from "./mobile-navbar";
import { Button } from "@/components/ui/button";
import { LogoutIcon } from "../icons/icons";
import styles from '../styles/navbar.module.css'
import { logout } from "@/actions/logout";

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
        <div className={styles.navbar}>
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
            <Button onClick={() => logout()} className={styles.button}>
                <p className="text-[20px] font-light">Выйти</p>
                <div>
                    <LogoutIcon/>
                </div>
            </Button>
        </div>
    );
};
