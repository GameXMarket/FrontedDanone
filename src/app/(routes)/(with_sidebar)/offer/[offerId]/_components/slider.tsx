'use client'

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { start } from "repl";

const images = [
    "/images/temp_main/offer1.png",
    "/images/temp_main/offer2.png",
    "/images/temp_main/offer1.png",
];

export const Slider = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [selected, setSelected] = useState<number>(0)

    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", () => {
            console.log("select")
        });
    }, [api]);
    
    return (
      <div>
        <div className="relative w-full h-[300px] mb-8 mobile:hidden">
          <Image src={images[selected]} alt="img" fill className="absolute object-cover rounded-2xl" />
        </div>
        <Carousel opts={{align: "start"}} className="w-full max-w-sm" setApi={setApi}>
            <CarouselContent className="gap-x-4 -ml-0">
                {images.map((el, idx) => (
                    <CarouselItem onClick={() => {setSelected(idx); api?.scrollTo(idx)}} key={idx} className="relative h-32 mobile:h-48 basis-[270px] mobile:basis-[340px] cursor-pointer pl-0">
                        <Image
                            src={el}
                            alt="img"
                            fill
                            className={cn("absolute object-cover rounded-lg",
                            idx !== selected && "opacity-40 mobile:opacity-100")}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
        </div>
    );
};
