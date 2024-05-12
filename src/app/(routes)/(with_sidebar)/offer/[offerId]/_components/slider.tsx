'use client'

import { ImagesSlider } from "@/components/ImagesSlider";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export const Slider = ({images}: {images: Array<string>}) => {
    const [api, setApi] = useState<CarouselApi>();
    const [selected, setSelected] = useState<number>(0)

    const [open, setIsOpen] = useState(false)

    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", () => {
        });
    }, [api]);
    
    return (
      <div>
        <ImagesSlider selected={selected} isOpen={open} setIsOpen={setIsOpen} imgs={images || ["/ui-assets/default_offer_img.jpg"]} />
        <div className="relative w-full h-[300px] mb-8 mobile:hidden">
          <Image onClick={() => setIsOpen(true)} src={images?.[selected] || "/ui-assets/default_offer_img.jpg"} alt="img" fill className="absolute object-cover rounded-2xl cursor-pointer" />
        </div>
        <Carousel opts={{align: "start"}} className="w-full mobile:max-w-sm" setApi={setApi}>
            <CarouselContent className="gap-x-4 -ml-0">
                {images?.map((el, idx) => (
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
