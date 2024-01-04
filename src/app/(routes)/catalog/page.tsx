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

function Catalog() {
    return (
        <div className="w-full h-full px-6">
            <section className={styles.search_container}>
                <SearchInput />
                <div className="flex items-center ml-10">
                    <p className={styles.game_not_found}>Не нашли игру?</p>
                </div>
            </section>
            <section className={styles.slider}>
                <Carousel
                    opts={{
                        align: "start",
                        loop: false,
                    }}
                    orientation="horizontal"
                    className="max-w-[1180px]"
                >
                    <CarouselContent className="space-x-10">
                        {Array.from({ length: 8 }, (_, idx) => (
                            <CarouselItem key={idx} className="basis-1/4">
                                <SliderCard />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className={styles.fade}></div>
            </section>
        </div>
    );
}

export default Catalog;
