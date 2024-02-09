import { ItemCard } from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface OffersListPeops {
    items: any;
}

export const OffersList = () => {
    return (
        <>
            <div className="mt-6 grid grid-cols-3 gap-10 mobile:hidden">
                {Array.from({ length: 9 }, (_, idx) => (
                    <div className="w-full flex flex-col items-center gap-y-6">
                        <ItemCard
                            item={{
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
                ))}
            </div>
            <div>
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
