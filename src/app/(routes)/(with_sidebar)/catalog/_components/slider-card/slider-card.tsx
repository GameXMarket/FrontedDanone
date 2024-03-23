import Image from "next/image";
import styles from "./slider-card.module.css";
import Link from "next/link";
import { Dispatch, FC, MouseEvent, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ValueType } from "@/types/CategoryType";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface ISliderCard {
    id: number;
    name: string;
    categories?: ValueType[];
}

const SliderCard: FC<PropsWithChildren<ISliderCard>> = ({
    id,
    name,
    categories,
}) => {

    const [next, setNext] = useState(true)
    const [prev, setPrev] = useState(false)

    const [api, setApi] = useState<CarouselApi>()

    const scrollNext = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        api?.scrollNext()
        if(!api?.canScrollNext()){
            setNext(false)
        }
        if(api?.canScrollPrev()){
            setPrev(true)
        }
        return false
    }
    const scrollPrev = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        api?.scrollPrev()
        if(!api?.canScrollPrev()){
            setPrev(false)
        }
        if(api?.canScrollNext()){
            setNext(true)
        }
        return false
    }

    return (
        <Link href={`/categories/${id}`} className="mobile:flex mobile:justify-center">
            <div className=" w-[300px] h-[380px]" key={id}>
                <Image
                    className="z-10 rounded-[24px]"
                    src="/catalog/game.jpg"
                    width={300}
                    height={378}
                    alt="game"
                />
                <div className={cn(styles.card_container, "group")}>
                    <h3 className="font-[500] pt-8 pl-8 text-[32px]">{name}</h3>
                    <div className={cn(styles.card_options, "opacity-0 group-hover:opacity-100 transition-opacity")}>
                        <Carousel
                            setApi={setApi}
                            opts={{
                                align: "start",
                                loop: false,
                            }}
                            orientation="horizontal"
                            className="w-full flex items-center"
                        >
                            <CarouselPrevious disabled={false} onClick={scrollPrev} className={cn("text-white hover:opacity-100 border-none", prev ? "opacity-100" : "opacity-0 hover:opacity-0")} />
                            <CarouselContent>
                                {Array.from({
                                    length: Math.ceil(categories?.length! / 3),
                                }).map((_, idx) => (
                                    <CarouselItem
                                        key={idx}
                                    >
                                        <div className="w-full grid grid-cols-10 grid-rows-3 gap-x-4 gap-y-2">
                                            {categories
                                                ?.slice(idx*3, (idx*3) + 3)
                                                ?.map((el, idx) => (
                                                    <Link
                                                        key={el.id}
                                                        href={`/categories/${id}?c=${el.id}`}
                                                        className={cn(
                                                            styles.card_option,
                                                                "col-span-10"
                                                        )}
                                                    >
                                                        <p className="flex items-center justify-center">
                                                            {el.value}
                                                        </p>
                                                    </Link>
                                                ))}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext disabled={false} onClick={scrollNext} className={cn("text-white hover:opacity-100 border-none", next ? "opacity-100" : "opacity-0 hover:opacity-0")} />
                        </Carousel>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SliderCard;
