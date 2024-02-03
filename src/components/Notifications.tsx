import { BellIcon } from "@/app/(routes)/(with_sidebar)/chats/icons/BellIcon";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";

export const NotificationsModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="ml-2">
                    <BellIcon />
                </div>
            </DialogTrigger>
            <DialogContent className="max-h-[600px] rounded-xl overflow-y-auto">
                <div className="flex flex-col items-center space-y-4">
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export const NotificationItem = () => {
    return (
        <>
            <div className="flex gap-x-4">
                <div className="bg-[#20222A] p-4 rounded-full h-fit">
                    <Image
                        src="/ui-assets/system.svg"
                        alt="system"
                        width={32}
                        height={32}
                    />
                </div>
                <div>
                    <h1 className="text-3xl">Система</h1>
                    <p className="text-lg">
                        Ваше объявление “Название” было удалено по причине 3.11
                    </p>
                </div>
            </div>
            <Separator className="w-2/3" />
        </>
    );
};
