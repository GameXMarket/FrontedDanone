'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

interface ImagesSliderProps {
    setIsOpen: (arg: boolean) => void;
    imgs: string[];
    isOpen: boolean;
    selected: number
}

export const ImagesSlider = ({
    isOpen,
    imgs,
    setIsOpen,
    selected
}: ImagesSliderProps) => {
    const [scale, setScale] = useState(false)

    const imagesHashes = useMemo(() => {
        return imgs?.map((img) => {
            const arr = img.split("/")
            return arr[arr.length - 1]
        })
    }, [imgs])

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <DialogContent hasClose={false} className="bg-transparent justify-center max-w-max px-[32px] select-none focus:outline-none">
                <Carousel opts={{startIndex: selected}} className={cn("cursor-zoom-in", scale && "scale-150 cursor-zoom-out")}>
                    <CarouselContent className="w-[900px] mobile:w-[370px]">
                        {imgs?.map((img, idx) => (
                            <CarouselItem className="flex justify-center items-center w-[1000px] h-[600px] basis-[900px] mobile:basis-[370px]" key={idx}>
                                <Image alt="img" width={1000} height={600} onClick={() => setScale(prev => !prev)} src={img} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious arrowClassName="w-12 h-12 mobile:w-8 mobile:h-8" className="absolute top-1/2 -translate-y-1/2 -left-14 mobile:-left-10 border-none" />
                    <CarouselNext arrowClassName="w-12 h-12 mobile:w-8 mobile:h-8" className="absolute top-1/2 -translate-y-1/2 -right-14 mobile:-right-10 border-none" />
                </Carousel>
            </DialogContent>
        </Dialog>
    );
};
