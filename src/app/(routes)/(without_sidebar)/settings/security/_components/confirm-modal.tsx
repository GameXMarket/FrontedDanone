import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";

export const ConfirmModal = () => {
    return (
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent className="bg-[#1E2028]">
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-xl font-normal">
                        На вашу старую почту отправлен код подтверждения,
                        введите его в поле ниже:
                    </DialogTitle>
                    <DialogDescription>
                        <Input maxLength={4} className="text-white" placeholder="1234" />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="accent">Далее</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
