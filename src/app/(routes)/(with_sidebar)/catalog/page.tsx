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

function Catalog() {
    const {data, isLoading, error} = useQuery({
        queryKey: ['get all cats'],
        queryFn: () => categoryServices.getCategoryWithAssociated(1)
    })

    return (
        <div className="w-full h-full px-6">
            <div className="w-full flex items-center justify-center">
                <section className={styles.search_container}>
                        <SearchInput placeholder="Поиск" className={styles.search} />
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
                        className="max-w-[1280px]"
                    >
                        <CarouselContent className="space-x-10">
                            {data?.category.values.map((el) => (
                                <CarouselItem key={el.id} className="basis-1/4">
                                    <SliderCard id={el.id} categories={data.associated} name={el.value}/>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>) : 
                (<div>DATA NOT FOUND.</div>)}
                {/*<div className={styles.fade}></div>*/}
            </section>
        </div>
    );
}

export default Catalog;
