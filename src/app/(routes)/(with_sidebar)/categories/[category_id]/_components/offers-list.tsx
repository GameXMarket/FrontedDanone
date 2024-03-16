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
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface OffersListProps {
    category_id: string;
}

export const OffersList = ({category_id}: OffersListProps) => {
    const searchParams = useSearchParams()

    const filter_categories = searchParams.getAll("val").map(el => el.split(":")[0])

    const {data, isLoading} = useQuery({
        queryKey: ["catalog_offers", category_id, filter_categories],
        queryFn: () => OfferApiService.getAll([category_id, ...filter_categories]),
    })
    console.log(data?.[0].files[0])
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
                                img: el.files?.[0],
                                name: el.name,
                                price: el.price,
                            }}
                        />
                        <Button
                            size="lg"
                            className="rounded-xl w-3/4 text-xl"
                            variant="accent"
                        >
                            <Link href={`chats/${el.user_id}`}>
                                Чат с продавцом
                            </Link>
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
            {Array.from({length: 6}).map((el, idx) => (
                <ItemCard.Skeleton key={idx} />
            ))}
        </div>
    )
}
