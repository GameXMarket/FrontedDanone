import { FC, PropsWithChildren, useState } from "react";
import styles from './dialogs.module.css'
import Image from "next/image";
import { IDialogsComponent } from "./dialogs";

interface IDialog extends IDialogsComponent {
    dialog_id: number
}

const Dialog:FC<PropsWithChildren<IDialog>> = ({setIsOpenedChat}) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)

    return (
    <div className={styles.dialog} onClick={() => {setIsOpenedChat(true)}}>
        <div className={styles.dialog_avatar}>
            <Image src='/messenger/cringeman.svg' alt='avatar' width={60} height={60}/>
        </div>
        <div className='ml-3'>
            <h3 className={isSelected ? styles.dialog_name_s : styles.dialog_name}>Heronwater</h3>
            <p className={styles.dialog_preview}>Привет, как дела?</p>
        </div>
    </div>
    )
}

export default Dialog;