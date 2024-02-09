'use client'

import { FC } from "react";
import styles from './styles/page.module.css'
import Sidebar from "./_components/sidebar";
import { SafetyIcon, UnnamedIcon } from "./icons/icons";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import { ArrowBackIcon } from "../../(with_sidebar)/categories/[category_id]/icons/game-page-icons";
import { useOutside } from "@/hooks/useOutside";
import { motion } from "framer-motion"
import Ticket from "./_components/ticket";

const Support:FC = () => {
    const mobileRes = useMediaQuery({
        query: '(max-width: 768px)'
    })

    const {isShow, ref,  setIsShow} = useOutside(false)

    const openHandler = () => {
        setIsShow(!isShow)
    }

    const variants = {
        open: { rotate: 450,  },
        closed: { rotate: 270 },        
    }


    return (
        <div className={styles.support}>
            {mobileRes ? (
            <>
                <div className='w-full flex items-center justify-center' onClick={openHandler}>
                    <div className={styles.tickets_mob}>
                        <div>
                            <p className="font-light opacity-[0.16] text-[20px]">история тикетов</p>    
                        </div> 
                        <motion.div 
                        className={styles.arr_turn} 
                        onClick={openHandler}
                        variants={variants}
                        transition={{duration: 0.3}}
                        animate={isShow ? 'open' : 'closed'}
                        >
                            <ArrowBackIcon/>
                        </motion.div>  
                    </div>
                </div>
                {isShow && (
                <div className={styles.shared} ref={ref}>
                    <Ticket/>
                    <Ticket/>
                    <Ticket/>
                    <Ticket/>
                </div>
                )}
            </>

            ) : (<Sidebar/>)}
            <section className={styles.content}>
                <h3 className="text-[24px]">Выберите с чем вам нужна помощь:</h3>
                <div className={styles.problems}>
                    <div className={styles.problem}>
                        <UnnamedIcon/>
                        <p>Сделка</p>
                    </div>
                    <div className={styles.problem}>
                        <SafetyIcon/>
                        <p>Вывод средств</p>
                    </div>
                    <div className={styles.problem}>
                        <UnnamedIcon/>
                        <p>Баги</p>
                    </div>
                    <div className={styles.problem}>
                        <p>Другое</p>
                    </div>

                </div>

                <h3 className="text-[24px] mt-8">Выберите тип возникшей проблемы:</h3>
                <div className={styles.problems}>
                    <div className={styles.problem}>

                    </div>
                    <div className={styles.problem}>

                    </div>
                    <div className={styles.problem}>

                    </div>
                    <div className={styles.problem}>
                        
                    </div>

                </div>

                <h3 className="text-[24px] mt-8">Опишите возникшую проблему:</h3>

                <p className="text-[18px] opacity-[0.16] font-light">Выдажайте мысли четко и ясно. Не отвлекайтесь на лишние подробности. <br/> 
                Все это поможет нам быстрее решить вашу проблему.</p>

                <textarea className={styles.area} placeholder="Опишите возникшую проблему"></textarea>
                <div className="my-4 w-full flex items-center justify-center">
                    <Button className={styles.button}>Создать тикет</Button>
                </div>
            </section>
        </div>
    )
}

export default Support