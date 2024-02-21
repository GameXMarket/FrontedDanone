'use client'

import { FC, useState } from "react";
import styles from './styles/page.module.css'
import { ArrowBackIcon } from "../../categories/[category_id]/icons/game-page-icons";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "@/components/SearchInput";
import Order from "./_components/order";
import { useOutside } from "@/hooks/useOutside";
import { motion } from "framer-motion"
import { useMediaQuery } from "react-responsive";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { OfferApiService } from "@/requests/offer/offer-service";
import { useAuthQuery } from "@/hooks/useAuthQuery";


const MyOffersByCategory:FC = () => {
    const searchParams = useParams()
    const category_id = searchParams.category_id as string

    const {isShow, setIsShow, ref} = useOutside(false)

    const mobileRes = useMediaQuery({
        query: "(max-width: 768px)"
    })

    const [isOpened, setIsOpened] = useState<boolean>(false)

    const openHandler = () => {
        setIsShow(!isShow)
    }

    const variants = {
        open: { rotate: 450,  },
        closed: { rotate: 270 },        
    }

    const {data} = useAuthQuery({
        queryKey: ["my_offers", category_id],
        queryFn: () => OfferApiService.getMyAll()
    })

    return (
        <div className={styles.mobc}> 
            {mobileRes ? (<></>) : (
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
            )}
            {mobileRes ? (<>
                <section className={styles.nav_mob}>
                    <div className="max-w-[440px]">
                        <SearchInput className={styles.input_mob} placeholder="Поиск по названию"/>
                    </div>
                    
                    <DropdownMenu >
                    <DropdownMenuTrigger onClick={() => {
                        setIsOpened(true)
                        console.log(isOpened)
                    }} >
                    <div className={styles.accaunts_mob}  >
                        <h4 className="text-[18px] font-normal">Аккаунты</h4>
                        <motion.div 
                            className={styles.arrDown} 
                            variants={variants}
                            transition={{duration: 0.3}}
                            animate={isOpened ? 'open' : 'closed'}
                            >
                            <ArrowBackIcon/>
                        </motion.div>  
                    </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-3 rounded-[24px] bg-[#24252F] max-w-[315px] min-w-[160px] border-none">
                        <DropdownMenuItem className="cursor-pointer h-[42px] flex items-center justify-center text-[20px] text-white">Аккаунты</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer h-[42px] flex items-center justify-center text-[20px] text-white">Донат</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer h-[42px] flex items-center justify-center text-[20px] text-white">Буст</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer h-[42px] flex items-center justify-center text-[20px] text-white">Прочее</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
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
            
            </>) : (
                <>                
                <section className={styles.nav}>
                <div className="max-w-[440px]">
                    <SearchInput className={styles.input} placeholder="Поиск по названию"/>
                </div>
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
                    {data?.map(el => (
                        <Order item={el} />
                    ))}
                </div>
                </section>
                </>

            )}
            
        </div>
    )
}

export default MyOffersByCategory