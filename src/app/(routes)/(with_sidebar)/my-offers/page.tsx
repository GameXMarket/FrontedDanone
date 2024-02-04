'use client'

import { FC } from "react";
import styles from './styles/page.module.css'
import { Button } from "@/components/ui/button";
import { AddOfferIcon } from "./icons/icons";
import { SearchInput } from "@/components/SearchInput";
import Offer from "./_components/offer";
import { useMediaQuery } from "react-responsive";

const MyOffers:FC = () => {
    const mobileRes = useMediaQuery({
        query: '(max-width: 768px)'
    })

    return (
        <div className={styles.offers_container}>
            {mobileRes ? (
                <div className={styles.offers_header}>  
                    <div className="ml-12">
                        <SearchInput placeholder="Поиск по названию" className={styles.inp}/>
                    </div>
                    <div className={styles.offers_mine}>
                        <div className={styles.heading}>
                            <h3>Мои продажи</h3>
                            <Button className="bg-[#2E2F39] rounded-[8px] h-[32px] ml-3 ">
                                <AddOfferIcon/>
                            </Button>
                        </div>
                        <div className="w-full flex justify-between">
                        <p className={styles.off_history}>История</p>
                        <></>
                        </div>
                </div>
            </div>
            ) : (
            <div className={styles.offers_header}>
                <div className={styles.offers_mine}>
                    <div className={styles.heading}>
                        <h3>Мои продажи</h3>
                        <Button className="bg-[#2E2F39] rounded-[8px] h-[32px] ml-3 ">
                            <AddOfferIcon/>
                        </Button>
                    </div>
                    <div className="w-full flex justify-between">
                    <p className={styles.off_history}>История</p>
                    <></>
                    </div>
                </div>
                <div className="ml-12">
                    <SearchInput placeholder="Поиск по названию" className="w-[427px] h-[42px]"/>
                </div>
            </div>
            )}
            
            <section className={styles.section_offers}>
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>                
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
                <Offer/>
            </section>
        </div>
    )
}

export default MyOffers