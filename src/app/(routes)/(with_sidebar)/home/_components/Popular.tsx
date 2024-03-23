import Image from "next/image";
import { PopularRow } from "./PopularRow";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { ItemCard } from "@/components/ItemCard";

const popular = [
    {
        name: "Brawl Stars",
        img: "/images/temp_main/bslogo.png",
        items: [
            {
                img: "/images/temp_main/brawlstars.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
                id: 1
            },
            {
                img: "/images/temp_main/brawlstars.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
                id: 2
            },
            {
                img: "/images/temp_main/brawlstars.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
                id: 3
            },
        ],
    },
    {
        name: "Fortnite",
        img: "/images/temp_main/fortnite.png",
        items: [
            {
                img: "/images/temp_main/fortnite.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
                id: 4
            },
            {
                img: "/images/temp_main/fortnite.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
                id: 5
            },
            {
                img: "/images/temp_main/fortnite.png",
                name: "ДЕШЁВЫЕ ГЕМЫ!!!",
                price: 100,
                id: 6
            },
        ],
    },
];

export const Popular = () => {
    return (
        <div>
            <div className="flex items-center gap-x-2 mb-9">
                <h3 className="text-2xl">Популярные товары</h3>
                <Image
                    height={30}
                    width={30}
                    alt="flash"
                    src="/images/main/flash.svg"
                />
            </div>
            <div className="space-y-8 mobile:hidden">
                {popular.map((row, idx) => (
                    <PopularRow key={row.name} data={row} idx={idx} />
                ))}
            </div>
            <div className="hidden mobile:block space-y-8 w-full">
                {popular.map((row) => (
                    <div key={row.name} className="space-y-4">
                        <div className="flex items-center gap-x-3">
                            <div className="relative w-[60px] h-[60px]">
                                <Image
                                    className="absolute rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg object-cover"
                                    src={row.img}
                                    alt="category"
                                    fill
                                />
                            </div>
                            <h3 className="text-3xl font-medium">{row.name}</h3>
                        </div>
                        <Carousel
                            opts={{
                                align: "start",
                                loop: false,
                            }}
                            orientation="horizontal"
                            className="w-full max-w-sm mb-4"
                        >
                            <CarouselContent>
                                {row.items.map((el) => (
                                    <CarouselItem
                                        key={el.name}
                                        className="basis-[340px]"
                                    >
                                        <ItemCard key={el.name} item={el} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                ))}
            </div>
        </div>
    );
};
