"use client";

import { Button } from "@/components/ui/button";
import { categoryServices } from "@/requests/categories/categories-services";
import { CategoryType } from "@/types/CategoryType";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OfferInfoProps {
    categoryId: number;
    description: string
}

export const OfferInfo = ({ categoryId, description }: OfferInfoProps) => {
    const { data, isLoading } = useQuery<CategoryType>({
        queryKey: ["offerInfo_category"],
        queryFn: () => categoryServices.getCategoryById(categoryId),
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between text-xl">
                <h3 className="text-2xl">Информация о товаре:</h3>
                <p className="text-muted-foreground flex gap-x-2">
                    Статус: <span className="text-white"> Оплачено</span>
                    <Image
                        src="/images/auth/correct.svg"
                        alt="correct"
                        width={20}
                        height={20}
                    />
                </p>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
                {data?.childrens?.map?.((el) => (
                    <Button className="bg-bgel rounded-xl">
                        {el.name}
                    </Button>
                ))}
            </div>
            <div>
                <h3 className="text-xl">Описание товара:</h3>
                <div className="w-full p-4 bg-bgel rounded-xl mt-3 text-lg">{description}</div>
            </div>
        </div>
    );
};