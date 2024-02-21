'use client'

import { ItemCard } from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { OfferApiService } from "@/requests/offer/offer-service";
import { useQuery } from "@tanstack/react-query";
import { memo, useEffect } from "react";

interface OffersListProps {
    category_id: number | string;
}

export const OffersList = ({category_id}: OffersListProps) => {

    const {data, isLoading} = useQuery({
        queryKey: ["catalog_offers", {category_id}],
        queryFn: () => OfferApiService.getAll(category_id),
    })
    console.log(isLoading)
    if(isLoading) {
        return <OffersList.Skeleton />
    } 
    return (
        <>
            <div className="mt-6 grid grid-cols-3 gap-10 mobile:hidden">
                {data?.map(el => (
                    <div key={el.id} className="w-full flex flex-col items-center gap-y-6">
                        <ItemCard
                            item={{
                                id: el.id,
                                img: "/images/temp_main/brawlstars.png",
                                name: el.name,
                                price: 1000,
                            }}
                        />
                        <Button
                            size="lg"
                            className="rounded-xl w-3/4 text-xl"
                            variant="accent"
                        >
                            Чат с продавцом
                        </Button>
                    </div>
                ))}
            </div>
            <div className="hidden mobile:block">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <Carousel
                        key={idx}
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        orientation="horizontal"
                        className="w-full max-w-sm mb-4 mt-6 mobile:block"
                    >
                        <CarouselContent>
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <CarouselItem
                                    key={idx}
                                    className="basis-[340px]"
                                >
                                    <div className="w-full flex flex-col items-center gap-y-6">
                                        <ItemCard
                                            item={{
                                                id: 1,
                                                img: "/images/temp_main/brawlstars.png",
                                                name: "Brawl Stars",
                                                price: 1000,
                                            }}
                                        />
                                        <Button
                                            size="lg"
                                            className="rounded-xl w-3/4 text-xl"
                                            variant="accent"
                                        >
                                            Чат с продавцом
                                        </Button>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                ))}
            </div>
        </>
    );
};

OffersList.Skeleton = function OffersListSkeleton() {
    return(
        <div className="mt-6 grid grid-cols-3 gap-10 mobile:hidden">
            {Array.from({length: 6}).map((el) => (
                <ItemCard.Skeleton />
            ))}
        </div>
    )
}
