import { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import styles from './sidebar.module.css'
import { Button } from "../ui/button";
import MaskedInput from 'react-text-mask'
import { SuccessIcon } from "./icons/SidebarIcons";
import { ChevronLeft } from "lucide-react";

interface IModal {
    reference: any
    isShow: boolean
    setIsShow: Dispatch<SetStateAction<boolean>>
}

const Transaction:FC = () => {
    return (
        <div className={styles.transaction}>
            <div className={styles.transaction_container}>
                <div className={styles.transaction_details}>
                    <h3 className={styles.type}>
                        Вывод 2200₽
                    </h3>
                    <p className={styles.parag}>На карту 0000 0000 0000 0000</p>
                </div>
                <div>
                    <SuccessIcon/>
                </div>
            </div>
            <hr />
        </div>
    )
}

const Modal:FC<PropsWithChildren<IModal>> = ({reference, isShow, setIsShow}) => {


    return (
        <div className={styles.modal_container}>
            <div className={styles.modal} ref={reference}>
                <div className="w-full pl-3">
                    <h4 className={styles.modal_title}>Сумма вывода</h4>
                </div>
                <div className="w-full mt-4 flex justify-between items-center">
                    <div className={styles.qty}>
                        <div className="w-full flex justify-center">
                            <p className={styles.number}>500</p>
                        </div>
                        <div className={styles.qty_bg}>

                        </div>
                        <p className={styles.currency}>₽</p>
                    </div>
                    <div className={styles.number_card}>

                        <MaskedInput mask={[/[1-9]/, /\d/, /\d/, /\d/,  ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]} placeholder='Введите номер карты' className={styles.input}/>
                        <div className={styles.arr}>
                            <ChevronLeft color="#FB2A29" className="text-gradient" />
                        </div>
                    </div>
                    <Button className={styles.withdraw}>Вывести деньги</Button>
                </div>
                <div className={styles.transactions}>
                    <Transaction/>
                    <Transaction/>
                    <Transaction/>
                    <Transaction/>
                    <Transaction/>
                    <Transaction/>
                    <Transaction/>
                    <Transaction/>
                </div>
            </div>
        </div>
    )
}

export default Modal