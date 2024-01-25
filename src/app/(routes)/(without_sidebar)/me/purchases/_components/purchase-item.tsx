import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export const PurchaseItem = () => {
    return (
        <div>
            <div className="p-6 bg-bgel space-y-6 rounded-xl">
                <div className="flex justify-between gap-x-8">
                    <div className="flex items-center gap-x-4">
                        <div className="h-[80px] w-[80px] relative">
                            <Image
                                className="rounded-lg absolute object-cover"
                                src="/images/temp_main/minecraft.png"
                                alt="img"
                                fill
                            />
                        </div>
                        <div>
                            <p className="text-2xl">Дешевые гемы</p>
                            <p className="text-muted-foreground text-lg">1 шт</p>
                        </div>
                    </div>
                    <span className="flex self-end text-sm text-muted-foreground">
                        28.11.2023 17:00
                    </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <p className="text-xl">Продавец</p>
                    <div className="flex items-center gap-x-2 cursor-pointer">
                        <div className="h-[50px] w-[50px] relative">
                            <Image
                                src="/images/temp_main/seller.png"
                                alt="seller"
                                fill
                                className="rounded-full object-cover absolute"
                            />
                        </div>
                        <p>Scally Milano</p>
                    </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <p className="text-xl">Цена</p>
                    <p className="text-gradient text-2xl">196,38₽</p>
                </div>
            </div>
            <div></div>
        </div>
    );
};
