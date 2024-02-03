import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export const MobileNavbar = () => {
    const pathname = usePathname();

    const { push } = useRouter();

    return (
        <nav className="text-center space-x-4 space-y-4">
            <Button
                variant="outline"
                onClick={() => push("/settings/profile")}
                className={cn(
                    "hover:text-white transition cursor-pointer text-lg",
                    pathname.includes("profile") && "text-white outline outline-2 outline-[#F8322B]"
                )}
            >
                Профиль
            </Button>
            <Button
                variant="outline"
                onClick={() => push("/settings/security")}
                className={cn(
                    "hover:text-white transition cursor-pointer text-lg",
                    pathname.includes("security") && "text-white outline outline-2 outline-[#F8322B]"
                )}
            >
                Безопасность
            </Button>
            <Button
                variant="outline"
                onClick={() => push("/settings/notifications")}
                className={cn(
                    "hover:text-white transition cursor-pointer text-lg",
                    pathname.includes("notifications") && "text-white outline outline-2 outline-[#F8322B]"
                )}
            >Оповещения</Button>
        </nav>
    );
};
