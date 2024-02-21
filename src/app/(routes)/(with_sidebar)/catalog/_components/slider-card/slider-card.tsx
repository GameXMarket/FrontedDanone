import Image from "next/image";
import styles from "./slider-card.module.css";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { IGetCat } from "@/requests/categories/categories.interfaces";
import { cn } from "@/lib/utils";
import { ValueType } from "@/types/CategoryType";

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
    return (
        <Link href={`/categories/${id}`}>
            <div className=" w-[300px] h-[380px]" key={id}>
                <Image
                    className="z-10 rounded-[24px]"
                    src="/catalog/game.jpg"
                    width={300}
                    height={378}
                    alt="game"
                />
                <div className={styles.card_container}>
                    <h3 className="font-[500] pt-8 pl-8 text-[32px]">{name}</h3>
                    <div className={styles.card_options}>
                        <div className="w-full grid grid-cols-10 gap-x-4 gap-y-2">
                            {categories?.slice(0,5)?.map((el, idx) => (
                                <Link href={`/categories/${id}?c=${el.id}`} className={cn(styles.card_option,
                                    idx === 0 || idx === 3 || idx === 4 ? "col-span-6" : "col-span-4")}>
                                    <p className="flex items-center justify-center">{el.value}</p>
                                </Link>
                            ))}
                            <div className={cn(styles.card_option, "col-span-4")}>
                                <p className="flex items-center justify-center">больше...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SliderCard;
