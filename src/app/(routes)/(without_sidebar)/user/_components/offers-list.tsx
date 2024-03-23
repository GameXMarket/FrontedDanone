"use client";

import { PopularRow } from "@/app/(routes)/(with_sidebar)/home/_components/PopularRow";
import { ItemCard } from "@/components/ItemCard";
import { SearchInput } from "@/components/SearchInput";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const items = [
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

export const OffersList = () => {
    return (
        <div className="flex flex-col items-center gap-y-8 mt-8">
            <div className="flex mobile:flex-wrap gap-x-5 items-center w-[60%] mobile:w-full mobile:justify-between">
                <SearchInput
                    className="w-full mobile:mb-3"
                    placeholder="Поиск по названию"
                />
                <Select>
                    <SelectTrigger className="h-[48px] w-1/5 min-w-[80px] mobile:w-7/12 mobile:gap-x-0 mobile:text-xl">
                        <SelectValue placeholder="Цена" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Ключ</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="h-[48px] w-1/5 min-w-[80px] mobile:w-4/12 mobile:gap-x-0 mobile:text-xl">
                        <SelectValue placeholder="Рейтинг" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Ключ</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-8 w-[80%] mobile:hidden">
                {items.map((row, idx) => (
                    <PopularRow key={row.name} data={row} idx={idx} />
                ))}
            </div>
            <div className="hidden mobile:block space-y-8 w-full">
                {items.map((row) => (
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
