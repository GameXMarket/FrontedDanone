import { FC } from "react";
import styles from '../styles/page.module.css'
import { DeleteIcon, EditIcon, HideIcon, ToTopIcon } from "../icons/icons";
import { MyOfferType } from "@/types/OfferType";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { OfferApiService } from "@/requests/offer/offer-service";
import { useParams } from "next/navigation";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import Link from "next/link";

interface OrderProps {
    item: MyOfferType
}

const Order:FC<OrderProps> = ({item}) => {
    const searchParams = useParams()
    const category_id = searchParams.category_id as string

    const queryClient = useQueryClient()
    const {mutation} = useSafeMutation(OfferApiService.deleteOffer, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["my_offers", category_id]})
        }
    })
    
    const deleteOffer = (offer_id: number) => {
        mutation.mutate(offer_id)
    }

    return (
        <div>
            <div className={styles.order}>
                <p className='text-[22px] font-normal text-white '>{item.name}</p>
                <p className='text-[22px] font-normal text-white'>{item.price}₽</p>
                <p className='text-[22px] font-normal text-white'>{item.count > 0 ? "Есть" : "Нет"}</p>
                <p className='text-[22px] font-normal text-white'>{item.carcass_in_offer_value}</p>
                <div className={styles.order_edit}>
                    <div className="flex justify-evenly cursor-pointer">
                        <Link href={`/offer/settings/${item.id}`}><EditIcon/></Link>
                        <button onClick={() => deleteOffer(item.id)}><DeleteIcon/></button>
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