import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { SearchInput } from './_components/search-input/search-input'
import SliderCard from './_components/slider-card/slider-card'
import styles from './styles/page.module.css'
import { Button } from '@/components/ui/button'

function Catalog () {
    return (
        <div className="w-full">
            <section className={styles.search_container}>
                    <SearchInput/>
                    <div className="flex items-center ml-10">
                        <p className={styles.game_not_found}>Не нашли игру?</p>
                    </div>
            </section>
            <section className={styles.slider}>
                <Carousel
                         opts={{
                            align: "start",
                            loop: true,
                        }} orientation="horizontal">
                    <CarouselContent>
                        <CarouselItem className=" md:basis-1/2 lg:basis-1/5">
                            <SliderCard/>
                        </CarouselItem>
                        <CarouselItem className=" md:basis-1/2 lg:basis-1/5">
                            <SliderCard/>
                        </CarouselItem>
                        <CarouselItem className=" md:basis-1/2 lg:basis-1/5">
                            <SliderCard/>
                        </CarouselItem>
                        <CarouselItem className=" md:basis-1/2 lg:basis-1/5">
                            <SliderCard/>
                        </CarouselItem>
                        <CarouselItem className=" md:basis-1/2 lg:basis-1/5">
                            <SliderCard/>
                        </CarouselItem>
                        <CarouselItem className=" md:basis-1/2 lg:basis-1/5">
                            <SliderCard/>
                        </CarouselItem>
                        <CarouselItem className=" md:basis-1/2 lg:basis-1/5">
                            <SliderCard/>
                        </CarouselItem>
                        <CarouselItem className=" md:basis-1/2 lg:basis-1/5">
                            <SliderCard/>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
                <div className={styles.fade}>
                </div>
            </section>
        </div>
    )
}

export default Catalog