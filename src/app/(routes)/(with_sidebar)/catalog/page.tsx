"use client";

import { SearchInput } from "@/components/SearchInput";
import SliderCard from "./_components/slider-card/slider-card";
import styles from "./styles/page.module.css";
import { useQuery } from "@tanstack/react-query";
import { categoryServices } from "@/requests/categories/categories-services";

function Catalog() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["get all cats"],
        queryFn: () => categoryServices.getCategoryWithAssociated(1),
    });

console.log(data)
    return (
        <div className="w-full h-full px-6 mobile:px-0">
            <div className="w-[calc(100%-550px)] mobile:w-full flex items-center justify-center">
                <section className={styles.search_container}>
                    <SearchInput
                        placeholder="Поиск"
                        className="w-[300px] 1340px:w-[400px] mobile:w-full"
                    />
                    <div className={styles.not_found}>
                        <p className={styles.game_not_found}>Не нашли игру?</p>
                    </div>
                </section>
            </div>
            <section className={styles.slider}>
                {isLoading ? (
                    Array.from({length: 3}).map((_, idx) => <SliderCard.Skeleton key={idx} />)
                ) : data ? (
                    data.category.values.map((el) => (
                        <SliderCard
                            img={el.files?.[0]}
                            key={el.id}
                            id={el.id}
                            categories={el.subvalues}
                            name={el.value}
                        />
                    ))
                ) : (
                    <div>DATA NOT FOUND.</div>
                )}
            </section>
        </div>
    );
}

export default Catalog;
