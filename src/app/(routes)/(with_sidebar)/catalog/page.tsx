'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { SearchInput } from "@/components/SearchInput";
import SliderCard from "./_components/slider-card/slider-card";
import styles from "./styles/page.module.css";
import { useQuery } from "@tanstack/react-query";
import { categoryServices } from "@/requests/categories/categories-services";
import { cn } from "@/lib/utils";

function Catalog() {
    const {data, isLoading, error} = useQuery({
        queryKey: ['get all cats'],
        queryFn: () => categoryServices.getCategoryWithAssociated(1)
    })

    return (
        <div className="w-full h-full px-6 mobile:px-0">
            <div className="w-[calc(100%-550px)] mobile:w-full flex items-center justify-center">
                <section className={styles.search_container}>
                        <SearchInput placeholder="Поиск" className="w-[300px] 1340px:w-[400px] mobile:w-full" />
                    <div className={styles.not_found}>
                        <p className={styles.game_not_found}>Не нашли игру?</p>
                    </div>
                </section>
            </div>
            <section className={styles.slider}>
                {isLoading ? 
                 <h4 className="text-[64px] font-bold">Loading...</h4> :
                 data ?
                 (<Carousel
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        orientation="horizontal"
                        className="w-full max-w-[calc(100%-381px)] mobile:max-w-sm"
                    >
                        <CarouselContent className="gap-x-4 -ml-0">
                            {data?.category.values.map((el) => (
                                <CarouselItem key={el.id} className="basis-[340px] lg:basis-1/2 1340px:basis-1/3 3xl:basis-[340px]">
                                    <SliderCard id={el.id} categories={data.associated} name={el.value}/>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="space-x-4 text-end w-full mobile:hidden">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>) : 
                (<div>DATA NOT FOUND.</div>)}
                {/*<div className={styles.fade}></div>*/}
            </section>
        </div>
    );
}

export default Catalog;
