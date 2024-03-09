import { FC } from "react";
import styles from '../styles/page.module.css'
import Image from "next/image";
import Link from "next/link";
import { OffersGroup } from "@/types/OfferType";

interface OfferProps {
    item: OffersGroup
}

const Offer:FC<OfferProps> = ({item}) => {
    return (
        <Link href={`/my-offers/${item.value_id}`}>
        <div className={styles.offer}>
            <div className="flex items-center justify-center ml-3">
                <Image src='/game-assets/game.svg' alt='game' width={102} height={98}/>
            </div>
            <div className={styles.offer_info}>
                <h3>{item.value_name}</h3>
                <p>{item.offer_count} лотов на продаже</p>
            </div>
        </div>
        </Link>
    )
}

export default Offer;