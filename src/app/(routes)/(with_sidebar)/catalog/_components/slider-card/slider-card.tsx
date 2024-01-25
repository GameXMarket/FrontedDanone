import Image from "next/image";
import styles from "./slider-card.module.css";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { IGetCat } from "@/requests/categories/categories.interfaces";

interface ISliderCard {
    id: number;
    name: string;
    categories?: IGetCat[];
}

const SliderCard: FC<PropsWithChildren<ISliderCard>> = ({
    id,
    name,
    categories,
}) => {
    return (
        <Link href={`/categories/${id}`}>
            <div className=" w-[300px]" key={id}>
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
                        <div className="w-full flex items-center gap-x-3 gap-y-2 flex-wrap">
                            {Array.from({length: 4}).map((el) => (
                                <div className={styles.card_option}>
                                    <p>Аккаунты</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SliderCard;
