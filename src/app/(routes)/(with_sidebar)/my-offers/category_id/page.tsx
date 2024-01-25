'use client'

import { FC } from "react";
import styles from './styles/page.module.css'
import { ArrowBackIcon } from "../../categories/[category_id]/icons/game-page-icons";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "@/components/SearchInput";
import Order from "./_components/order";
import { useOutside } from "@/hooks/useOutside";
import { motion } from "framer-motion"

const MyOffersByCategory:FC = () => {
    const {isShow, ref,  setIsShow} = useOutside(false)

    const openHandler = () => {
        setIsShow(true)
    }

    const variants = {
        open: { rotate: 450,  },
        closed: { rotate: 270 },        
    }

    return (
        <div className={styles.mobc}> 
            <section className={styles.category}>
                <div className="flex items-center justify-center">
                    <Link href='/home'>
                        <div className="flex items-center cursor-pointer">
                                <div>
                                <ArrowBackIcon/>
                                </div>
                                <p className={styles.back}>Назад</p>
                        </div>
                    </Link>
                </div>
                <div className={styles.category_info}>
                    <Image src='/game-assets/game.svg' width={63} height={62} alt='game'/>
                    <div className="flex flex-col justify-start ml-3">
                        <h3 className={styles.game_title}>Brawl Stars</h3>
                        <h4 className={styles.qty}>17 лотов на продаже</h4>
                    </div>
                </div>
            </section>
            <section className={styles.nav}>
                <SearchInput className='h-[62px] rounded-[24px] w-[427px]' placeholder="Поиск по названию"/>
                <div className={styles.accaunts}>
                    <h4 className="text-[24px] font-normal">Аккаунты</h4>
                    <motion.div 
                        className={styles.arrDown} 
                        onClick={openHandler}
                        variants={variants}
                        transition={{duration: 0.3}}
                        animate={isShow ? 'open' : 'closed'}
                        >
                        <ArrowBackIcon/>
                    </motion.div>  
                </div>
                {isShow && (
                <div ref={ref} className={styles.dropdown}>
                    <div className={styles.option}>
                        <p>Аккаунты</p>
                    </div>
                    <div className={styles.option}>
                        <p>Донат</p>
                    </div>
                    <div className={styles.option}>
                        <p>Буст</p>
                    </div>
                    <div className={styles.option}>
                        <p>Прочее</p>
                    </div>
                </div>                    
                )}

            </section>
            <section className={styles.table}>
                <div className={styles.graphs}>
                    <p className='text-[22px] font-normal text-white'>Название</p>
                    <p className='text-[22px] font-normal text-white'>Цена</p>
                    <p className='text-[22px] font-normal text-white'>Наличие</p>
                    <p className='text-[22px] font-normal text-white'>Тип товара</p>
                    <p className='text-[22px] font-normal text-white'>Действия</p>
                </div>
                <div className={styles.orders}>
                    <Order/>
                    <Order/>
                    <Order/>
                    <Order/>
                    <Order/>
                    <Order/>
                    <Order/>
                    <Order/>
                    <Order/>
                </div>
            </section>
        </div>
    )
}

export default MyOffersByCategory