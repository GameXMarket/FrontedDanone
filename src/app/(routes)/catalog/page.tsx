'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { SearchInput } from "./_components/search-input/search-input";
import SliderCard from "./_components/slider-card/slider-card";
import styles from "./styles/page.module.css";
import { useQuery } from "@tanstack/react-query";
import { categoryServices } from "@/requests/categories/categories-services";

function Catalog() {
    const {data, isLoading, error} = useQuery({
        queryKey: ['get all cats'],
        queryFn: async () => {
            return categoryServices.getAllCategories()
        }
    })

    console.log(JSON.stringify(data))


    return (
        <div className="w-full h-full px-6">
            <section className={styles.search_container}>
                <SearchInput />
                <div className="flex items-center ml-10">
                    <p className={styles.game_not_found}>Не нашли игру?</p>
                </div>
            </section>
            <section className={styles.slider}>
                {isLoading ? 
                 <h4 className="text-[64px] font-bold">Loading...</h4> :
                 data ? 
                 data.data ? 
                 (<Carousel
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        orientation="horizontal"
                        className="max-w-[1180px]"
                    >
                        <CarouselContent className="space-x-10">
                            {data.data.map((el:any) => (
                                <CarouselItem key={el.id} className="basis-1/4">
                                    <SliderCard id={el.id} name={el.name}/>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>) : 
                (<div>DATA NOT FOUND.</div>) :
                null}
                {/*<div className={styles.fade}></div>*/}
            </section>
        </div>
    );
}

export default Catalog;
