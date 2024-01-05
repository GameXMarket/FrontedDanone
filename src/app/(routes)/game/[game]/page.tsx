import { FC } from "react";
import styles from './styles/page.module.css'
import { ArrowBackIcon } from "./icons/game-page-icons";
import Link from "next/link";
import Image from "next/image";

const GamePage:FC = () => {
    return (
        <div className="ml-10">
            <section className={styles.back}>
                <Link href="/catalog">
                    <div className="w-full flex items-center">
                        <ArrowBackIcon/>
                        <p className={styles.back_text}>назад</p>
                    </div>
                </Link>
            </section>
            <section className={styles.game_details}>
                <div>
                    <Image src='/game-assets/game.svg' alt='game' width={120} height={115}/>
                </div>
                <div className="ml-8">   
                    <h1 className={styles.game_title}>Brawl Stars</h1>
                    <h3 className={styles.game_orders_qty}>30 000 лотов</h3>
                </div>
                <div className="ml-10">
                    <div className="w-full flex">
                        <div className={styles.option}><p className={styles.option_text}>Аккаунты</p></div>
                        <div className={styles.option}><p className={styles.option_text}>Буст</p></div>
                        <div className={styles.option}><p className={styles.option_text}>Персонажи</p></div>
                    </div>
                    <div className="w-full flex">
                    <div className={styles.option}><p className={styles.option_text}>Гемы</p></div>
                        <div className={styles.option}><p className={styles.option_text}>Обучение</p></div>
                        <div className={styles.option}><p className={styles.option_text}>Гемы</p></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GamePage 