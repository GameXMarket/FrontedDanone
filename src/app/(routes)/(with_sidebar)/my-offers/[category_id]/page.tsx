"use client";

import { FC } from "react";
import styles from "./styles/page.module.css";
import { ArrowBackIcon } from "../../categories/[category_id]/icons/game-page-icons";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "@/components/SearchInput";
import Order from "./_components/order";
import { useMediaQuery } from "react-responsive";
import { useParams } from "next/navigation";
import { OfferApiService } from "@/requests/offer/offer-service";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFilter } from "@/hooks/useFilter";

const MyOffersByCategory: FC = () => {
    const searchParams = useParams();
    const category_id = searchParams.category_id as string;

    const mobileRes = useMediaQuery({
        query: "(max-width: 768px)",
    });

    const { data } = useAuthQuery({
        queryKey: ["my_offers", category_id],
        queryFn: () => OfferApiService.getMyByValueId(category_id),
        enabled: !!category_id,
    });
console.log(data)
    const { data: selects, onCategoryChange, isFetching } = useFilter("my offers", undefined);
    return (
        <div className={styles.mobc}>
            {mobileRes ? (
                <></>
            ) : (
                <section className={styles.category}>
                    <div className="flex items-center justify-center">
                        <Link href="/my-offers">
                            <div className="flex items-center cursor-pointer">
                                <div>
                                    <ArrowBackIcon />
                                </div>
                                <p className={styles.back}>Назад</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.category_info}>
                        <Image
                            src="/game-assets/game.svg"
                            width={63}
                            height={62}
                            alt="game"
                        />
                        <div className="flex flex-col justify-start ml-3">
                            <h3 className={styles.game_title}>
                                {data?.offers[0].carcass_in_offer_name}
                            </h3>
                            <h4 className={styles.qty}>
                                {data?.offers.length} лотов на продаже
                            </h4>
                        </div>
                    </div>
                </section>
            )}
            {mobileRes ? (
                <>
                    <section className={styles.nav_mob}>
                        <div className="max-w-[440px]">
                            <SearchInput
                                className={styles.input_mob}
                                placeholder="Поиск по названию"
                            />
                        </div>
                        {selects?.pages.map((el) => (
                            <Select
                                key={el.id}
                                onValueChange={onCategoryChange}
                            >
                                <SelectTrigger className="h-[48px] mobile:col-span-7 mobile:text-base mobile:px-2 placeholder:text-muted-foreground">
                                    <SelectValue
                                        className="text-muted-foreground text-sm"
                                        placeholder={el?.in_offer_name}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {el?.values.map((val) => (
                                        <SelectItem
                                            key={val.id}
                                            value={`${val.id}:${val.carcass_id}`}
                                        >
                                            {val.value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ))}
                    </section>
                    <section className={styles.position}>
                        <div className={styles.types}>
                            <p>Название</p>
                            <p>Цена</p>
                            <p>Наличие</p>
                            <p>Тип</p>
                        </div>
                        <div className={styles.data}>
                            <p>Brawl Stars</p>
                            <p>4.300 ₽</p>
                            <p>23 шт.</p>
                            <p>Аккаунт</p>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <section className={styles.nav}>
                        <div className="max-w-[440px]">
                            <SearchInput
                                className={styles.input}
                                placeholder="Поиск по названию"
                            />
                        </div>
                        {selects?.pages.map((el) => (
                            <Select
                                key={el.id}
                                onValueChange={onCategoryChange}
                            >
                                <SelectTrigger className="h-[48px] mobile:col-span-7 mobile:text-base mobile:px-2 placeholder:text-muted-foreground">
                                    <SelectValue
                                        className="text-muted-foreground text-sm"
                                        placeholder={el?.in_offer_name}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {el?.values.map((val) => (
                                        <SelectItem
                                            key={val.id}
                                            value={`${val.id}:${val.carcass_id}`}
                                        >
                                            {val.value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ))}
                    </section>
                    <section className={styles.table}>
                        <div className={styles.graphs}>
                            <p className="text-[22px] font-normal text-white">
                                Название
                            </p>
                            <p className="text-[22px] font-normal text-white">
                                Цена
                            </p>
                            <p className="text-[22px] font-normal text-white">
                                Наличие
                            </p>
                            <p className="text-[22px] font-normal text-white">
                                Тип товара
                            </p>
                            <p className="text-[22px] font-normal text-white">
                                Действия
                            </p>
                        </div>
                        <div className={styles.orders}>
                            {data?.offers.map((el) => (
                                <Order item={el} key={el.id} />
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default MyOffersByCategory;
