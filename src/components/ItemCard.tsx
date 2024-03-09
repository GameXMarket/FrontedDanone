'use client'

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

interface ItemCardProps {
    item: { img: string; name: string; price: number; id: number };
    lessInfo?: boolean;
}

export const ItemCard = ({ item, lessInfo }: ItemCardProps) => {

    const {push} = useRouter()

    return (
        <div onClick={() => push(`/offer/${item.id}`)} className="p-4 space-y-2 bg-bgel rounded-xl w-full cursor-pointer">
            <div className="relative w-full h-[200px]">
                <Image
                    fill
                    className="object-cover rounded-xl"
                    alt="game"
                    src={item.img}
                />
            </div>
            <p className="text-3xl font-bold text-gradient">{item.price}₽</p>
            <p className="text-3xl font-medium ">{item.name}</p>
            <div className="flex items-center h-5 space-x-2 px-1">
                <div>Гемы</div>
                <Separator
                    className="bg-muted-foreground"
                    orientation="vertical"
                />
                <p>30 гемов</p>
                <Separator
                    className="bg-muted-foreground"
                    orientation="vertical"
                />
                <p>Supersell ID</p>
            </div>
            {!lessInfo && (
                <div className="flex items-center gap-x-3 px-1">
                    <div className="h-[50px] w-[50px] relative">
                        <Image
                            src="/images/temp_main/seller.png"
                            alt="seller"
                            fill
                            className="rounded-full object-cover absolute"
                        />
                    </div>
                    <div>
                        <p>Демьян</p>
                        <div className="flex items-center gap-x-1">
                            {Array.from({ length: 5 }, (_, idx) => (
                                <Image
                                    key={idx}
                                    src="/images/main/star.svg"
                                    alt="star"
                                    width={16}
                                    height={16}
                                />
                            ))}
                            <span>5.0</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

ItemCard.Skeleton = function ItemCardSkeleton() {
    return(
        <div className="p-4 space-y-2 bg-muted-foreground rounded-xl w-full">
            <div className="w-full h-[200px]">
                <Skeleton className="rounded-xl w-full h-full"/>
            </div>
            <Skeleton className="w-1/2 h-7" />
            <Skeleton className="w-3/4 h-7 mt-4" />
            <div className="flex items-center h-5 space-x-2 px-1">
                <Skeleton className="w-1/3 h-6" />
                <Separator
                    className="bg-muted-foreground"
                    orientation="vertical"
                />
                <Skeleton className="w-1/3 h-6" />
                <Separator
                    className="bg-muted-foreground"
                    orientation="vertical"
                />
                <Skeleton className="w-1/3 h-6" />
            </div>
            <div className="flex items-center gap-x-3 px-1">
                    <div className="h-[50px] w-[50px]">
                        <Skeleton className="rounded-full w-full h-full" />
                    </div>
                    <div className="gap-y-2 flex flex-col justify-between">
                        <Skeleton className="w-1/3 h-4" />
                        <div className="flex items-center gap-x-1">
                            {Array.from({ length: 5 }, (_, idx) => (
                                <Skeleton className="w-4 h-4 rounded-full" key={idx} />
                            ))}
                            <Skeleton className="w-6 h-4" />
                        </div>
                    </div>
                </div>
        </div>
    )
}