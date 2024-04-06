"use client";

import { ItemCard } from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { OfferApiService } from "@/requests/offer/offer-service";
import { OfferType, getAllOffers } from "@/types/OfferType";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface OffersListProps {
    category_id: string;
}

export const OffersList = ({ category_id }: OffersListProps) => {
    const searchParams = useSearchParams();

    const filter_categories = searchParams
        .getAll("val")
        .map((el) => el.split(":")[0]);

    const searchTerm = searchParams.get("search_offers");

    const getPriceFilter = useCallback(() => {
        const priceFilter = searchParams.get("price");
        switch (priceFilter) {
            case "none":
                return null;
            case "descending":
                return true;
            case "ascending":
                return false;
            default:
                return null;
        }
    }, [searchParams.get("price")]);

    const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: [
            "catalog_offers",
            category_id,
            filter_categories,
            getPriceFilter(),
            searchTerm,
        ],
        queryFn: ({ pageParam }) =>
            OfferApiService.getAll(
                [category_id, ...filter_categories],
                getPriceFilter(),
                searchTerm,
                pageParam
            ),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length !== 10) {
                return undefined;
            }
            return lastPageParam + 10;
        },
    });

    if (isLoading) {
        return <OffersList.Skeleton />;
    }
    return (
        <>
            <div className="mt-6 grid grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-10 mobile:hidden">
                {data?.pages?.map((arr) =>
                    arr.map((el) => <ItemCard key={el.id} item={el} />)
                )}
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
                                            item={
                                                {
                                                    id: 1,
                                                    files_offer: [
                                                        "/images/temp_main/brawlstars.png",
                                                    ],
                                                    name: "Brawl Stars",
                                                    price: 1000,
                                                    category_values: [
                                                        {
                                                            id: 1,
                                                            value: "Brawl Stars",
                                                        },
                                                    ],
                                                    description: "description",
                                                    files_user: [""],
                                                    username: "danone",
                                                } as getAllOffers
                                            }
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
            <div className="w-full flex justify-center">
                <Button
                    disabled={!hasNextPage}
                    onClick={() => fetchNextPage()}
                    className="mt-6"
                    size="lg"
                    variant="accent"
                >
                    Загрузить ещё...
                </Button>
            </div>
        </>
    );
};

OffersList.Skeleton = function OffersListSkeleton() {
    return (
        <div className="mt-6 grid grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-10 mobile:hidden">
            {Array.from({ length: 6 }).map((el, idx) => (
                <ItemCard.Skeleton key={idx} />
            ))}
        </div>
    );
};
