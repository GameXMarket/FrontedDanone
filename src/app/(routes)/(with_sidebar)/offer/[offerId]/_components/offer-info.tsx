"use client";

import { Button } from "@/components/ui/button";
import { categoryServices } from "@/requests/categories/categories-services";
import { CategoryType } from "@/types/CategoryType";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OfferInfoProps {
    categoryId: number;
    description: string;
}

export const OfferInfo = ({ categoryId, description }: OfferInfoProps) => {
    const { data, isLoading } = useQuery<CategoryType>({
        queryKey: ["offerInfo_category"],
        queryFn: () => categoryServices.getCategoryById(categoryId),
        enabled: !!categoryId
    });

    return (
        <div className="space-y-6 mobile:w-full">
            <div className="flex justify-between text-xl mobile:w-full">
                <h3 className="text-2xl">Информация о товаре:</h3>
                <div className="text-muted-foreground flex gap-x-2 mobile:hidden">
                    Статус: <span className="text-white"> Оплачено</span>
                    <Image
                        src="/images/auth/correct.svg"
                        alt="correct"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
                {data?.values?.map?.((el) => (
                    <Button key={el.id} className="bg-bgel rounded-xl">{el.value}</Button>
                ))}
            </div>
            <div className="hidden mobile:flex gap-x-3 items-center">
                <div className="relative w-[48px] h-[48px]">
                    <Image
                        className="absolute object-cover rounded-full"
                        src="/images/temp_main/diablo.png"
                        alt="logo"
                        fill
                    />
                </div>
                <div>
                    <p className="text-xl">Демьян</p>
                    <div className="flex items-center gap-x-1">
                        <span className="text-muted-foreground text-base mr-1">
                            Оценка:
                        </span>
                        {Array.from({ length: 5 }, (_, idx) => (
                            <Image
                                key={idx}
                                src="/images/main/star.svg"
                                alt="star"
                                width={16}
                                height={16}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl">Описание товара:</h3>
                <div className="w-full p-4 bg-bgel rounded-xl mt-3 text-lg">
                    {description}
                </div>
            </div>
        </div>
    );
};
