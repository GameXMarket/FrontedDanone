"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { MouseEvent } from "react";
import { MessageCircleMore } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface ItemCardProps {
    item: {
        category_values: Array<{ id: number; value: string }>;
        description: string;
        files_offer: Array<string> | null;
        files_user: Array<string> | null;
        id: number;
        name: string;
        price: number;
        username: string;
    };
    lessInfo?: boolean;
}

export const ItemCard = ({ item, lessInfo }: ItemCardProps) => {
    const { push } = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();

    const changeCategory = (e: MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        const params = new URLSearchParams(searchParams);
        params.delete("val");
        params.append("val", id + ":" + 1);
        push(`${pathname}?${params}`);
    };

    return (
        <Link
            href={`/offer/${item.id}`}
            className="p-4 flex flex-col justify-between bg-bgel h-full rounded-xl w-full cursor-pointer gap-y-2"
        >
            <div className="space-y-2">
                <div className="relative w-full h-[200px]">
                    <Image
                        fill
                        className="object-cover rounded-xl"
                        alt="game"
                        src={item.files_offer?.[0] || "/ui-assets/default_offer_img.jpg"}
                    />
                </div>
                <p className="text-3xl font-bold text-gradient">
                    {item.price}₽
                </p>
                <p className="text-3xl font-medium ">{item.name}</p>
            </div>
            <div className="space-y-2">
                {/* <div className="flex items-center justify-between flex-wrap min-h-5 px-1">
                    {item.category_values?.map((el, idx, arr) => (
                        <div key={el.id} className="flex items-center h-8 gap-x-4 mb-2">
                            <Separator
                                className="bg-muted-foreground"
                                orientation="vertical"
                            />
                            <Button onClick={(e) => changeCategory(e, el.id)} variant="link" className="p-0">{el.value}</Button>
                            <Separator
                                className="bg-muted-foreground"
                                orientation="vertical"
                            />
                        </div>
                    ))}
                </div> */}
                {!lessInfo && (
                    <div className="flex items-center gap-x-3 px-1">
                        <div className="h-[50px] w-[50px] min-w-[50px] relative">
                            <Image
                                src={
                                    item.files_user?.[0] ||
                                    "/ui-assets/default_avatar.jpg"
                                }
                                alt="seller"
                                fill
                                className="rounded-full object-cover absolute"
                            />
                        </div>
                        <div>
                            <p>{item.username}</p>
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
                        {/* <TooltipProvider>
                            <Tooltip disableHoverableContent delayDuration={200}>
                                <Link
                                    className="ml-auto"
                                    href={`/chats/${item.id}`}
                                >
                                    <TooltipTrigger>
                                        <Button
                                            size="sm"
                                            variant="accent"
                                            className="rounded-full"
                                        >
                                            <MessageCircleMore className="w-7 h-7" />
                                        </Button>
                                    </TooltipTrigger>
                                </Link>
                                <TooltipContent className="back-gradient border-none">
                                    <p className="text-white">
                                        Открыть чат с {item.username}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider> */}
                    </div>
                )}
            </div>
        </Link>
    );
};

ItemCard.Skeleton = function ItemCardSkeleton() {
    return (
        <div className="p-4 space-y-2 bg-muted-foreground rounded-xl w-full">
            <div className="w-full h-[200px]">
                <Skeleton className="rounded-xl w-full h-full" />
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
                            <Skeleton
                                className="w-4 h-4 rounded-full"
                                key={idx}
                            />
                        ))}
                        <Skeleton className="w-6 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};
