import { FC, PropsWithChildren } from "react";
import styles from './dialogs.module.css'
import Image from "next/image";
import { IDialog } from "./dialogs";

const Dialog:FC<PropsWithChildren<IDialog>> = ({setIsOpenedChat}) => {
    return (
    <div className={styles.dialog} onClick={() => setIsOpenedChat(true)}>
        <div className={styles.dialog_avatar}>
            <Image src='/messenger/cringeman.svg' alt='avatar' width={60} height={60}/>
        </div>
        <div className='ml-3'>
            <h3 className={styles.dialog_name}>Heronwater</h3>
            <p className={styles.dialog_preview}>Привет, как дела?</p>
        </div>
    </div>
    )
}

export default Dialog;