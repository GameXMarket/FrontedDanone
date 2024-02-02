'use client'

import { FC } from "react";
import styles from './styles/page.module.css'
import { ArrowBackIcon } from "../../(with_sidebar)/categories/[category_id]/icons/game-page-icons";
import { useOutside } from "@/hooks/useOutside";
import { motion } from "framer-motion"
import { DenyIcon, SuccessResponse } from "./icons/icons";

const TicketDetails:FC = () => {
    const {isShow, setIsShow, ref} = useOutside(false)

    const openHandler = () => {
        setIsShow(true)
    }

    const variants = {
        open: { rotate: 450,  },
        closed: { rotate: 270 },        
    }

    return (
        <div className="w-full flex items-center justify-center">
            <div className={styles.TicketDetails}>
                <h1>Тикет #000000</h1>
                <h4>Тема проблемы: <span className={styles.problem}>Сделка</span></h4>
                <h4>Тип проблемы: <span className={styles.problem}>Невыполнение обязательств продавца</span></h4>
                <h4>Ваше описание проблемы:</h4>
                <div className={styles.description} onClick={openHandler}>
                    <div className='flex items-center justify-center'>
                        <p className='opacity-[0.16] font-light text-[20px]'>Описание проблемы</p>
                    </div>
                    <motion.div 
                        className={styles.arr} 
                        onClick={openHandler}
                        variants={variants}
                        transition={{duration: 0.3}}
                        animate={isShow ? 'open' : 'closed'}
                        > <ArrowBackIcon/>
                    </motion.div>
                </div>
                {isShow && (<div className={styles.full_des} ref={ref}>

                    </div>)}
                <div className="flex items-center justify-center">
                <h4>Ваша проблема <span className={styles.success}>решена</span>, всего хорошего!</h4>
                <div className="ml-1">
                    <SuccessResponse/>
                </div>
                </div>  

                {/*<div className="flex items-center justify-center">
                <span className={styles.deny}>Отказано</span>
                <div className="ml-1">
                    <DenyIcon/>
                </div>
                </div>  */}
            </div>
        </div>
    )
}

export default TicketDetails