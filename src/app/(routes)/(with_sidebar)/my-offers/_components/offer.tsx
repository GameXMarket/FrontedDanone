import { FC } from "react";
import styles from '../styles/page.module.css'
import Image from "next/image";
import Link from "next/link";

const Offer:FC = () => {
    return (
        <Link href='/my-offers/category_id'>
        <div className={styles.offer}>
            <div className="flex items-center justify-center ml-3">
                <Image src='/game-assets/game.svg' alt='game' width={102} height={98}/>
            </div>
            <div className={styles.offer_info}>
                <h3>Brawl Stars</h3>
                <p>17 лотов на продаже</p>
            </div>
        </div>
        </Link>
    )
}

export default Offer;