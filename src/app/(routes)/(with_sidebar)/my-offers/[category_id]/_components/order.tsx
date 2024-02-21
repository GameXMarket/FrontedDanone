import { FC } from "react";
import styles from '../styles/page.module.css'
import { DeleteIcon, EditIcon, HideIcon, ToTopIcon } from "../icons/icons";

interface OrderProps {
    item: {name: string}
}

const Order:FC<OrderProps> = ({item}) => {
    return (
        <div>
            <div className={styles.order}>
                <p className='text-[22px] font-normal text-white '>{item.name}</p>
                <p className='text-[22px] font-normal text-white'>530₽</p>
                <p className='text-[22px] font-normal text-white'>Есть</p>
                <p className='text-[22px] font-normal text-white'>Аккаунт</p>
                <div className={styles.order_edit}>
                    <div className="flex justify-evenly cursor-pointer">
                        <EditIcon/>
                        <DeleteIcon/>
                        <HideIcon/>
                        <ToTopIcon/>
                    </div>
                    <p className="mt-3 opacity-[0.16]">Последнее поднятие 7 дек., 17:10 </p>
                </div>
            </div>
            <div className="w-[1205px] h-[2px] bg-[#3e3f45]"></div>
        </div>        
    )
}

export default Order