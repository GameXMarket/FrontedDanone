import { Button } from "@/components/ui/button";
import Image from "next/image";

export const UserInfo = () => {
    return (
        <div className="w-full flex flex-col items-center gap-y-6">
            <div className="flex gap-x-6 items-center">
                <div className="relative w-[80px] h-[80px]">
                    <Image
                        className="absolute object-cover rounded-full"
                        src="/images/temp_main/diablo.png"
                        alt="logo"
                        fill
                    />
                </div>
                <div>
                    <p className="text-3xl">Демьян</p>
                    <div className="flex items-center gap-x-1">
                        <span className="text-muted-foreground text-lg mr-1 mobile:hidden">Оценка:</span>
                        {Array.from({length: 5}, (_, idx) => <Image key={idx} src='/images/main/star.svg' alt="star" width={16} height={16} />)}
                        <span>5.0</span>
                    </div>
                </div>
                <div className="ml-6 mobile:hidden"><p className="text-muted-foreground">Был в сети 3 часа назад</p></div>
            </div>
            <Button size="lg" className="rounded-xl mobile:hidden" variant="accent">Перейти в чат</Button>
        </div>
    );
};
