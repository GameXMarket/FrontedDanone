'use client'

import { FC } from "react";
import styles from './styles/page.module.css'
import { ArrowBackIcon } from "./icons/game-page-icons";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { categoryServices } from "@/requests/categories/categories-services";

const GamePage:FC = () => {
    const params = useParams()
    console.log(params)
    const category_id: string | string[] = params.category_id

    const {data, isLoading, error} = useQuery({
        queryKey: ['get category by id'],
        queryFn: async () => {
            return categoryServices.getCategoryById(category_id)
        }
    })

    console.log(data?.data.childrens)


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
                <div className="ml-8 text-left">   
                    {isLoading ? 
                     (<p>Loading...</p>) : 
                     data ? (
                      <div className="w-full">  
                        <h1 className={styles.game_title}>{data.data.name}</h1>
                      </div>
                     ) : 
                     (<div>DATA NOT FOUND</div>)
                    }
                    <h3 className={styles.game_orders_qty}>30 000 лотов</h3>
                </div>
                <div className="ml-10">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : data ? data.data ? (
                        <div className="w-[350px] flex flex-wrap" >
                            {data.data.childrens.map((el: any) =>(
                                <div className={styles.option} key={el.id}><p className={styles.option_text}>{el.name}</p></div>
                            ))}
                        </div>
                    ) : (<>No data found</>) : null}
                </div>
            </section>
        </div>
    )
}

export default GamePage 