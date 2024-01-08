import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import styles from './dialogs.module.css'
import { ArrowBackIcon } from '@/app/(routes)/categories/[category_id]/icons/game-page-icons'
import Dialog from './dialog'

export interface IDialog {
    setIsOpenedChat: Dispatch<SetStateAction<boolean>>
}

const Dialogs:FC<PropsWithChildren<IDialog>> = ({setIsOpenedChat}) => {
    return (
        <div className={styles.dialogs}>
            <div className="w-full ml-5 flex mt-7 items-center" onClick={() => setIsOpenedChat(false)}>
                <ArrowBackIcon />
                <p className={styles.back_text}>Назад</p>
            </div>
            <div className={styles.dialog_container}>
                <Dialog setIsOpenedChat={setIsOpenedChat}/>
                <Dialog setIsOpenedChat={setIsOpenedChat}/>
                <Dialog setIsOpenedChat={setIsOpenedChat}/>
                <Dialog setIsOpenedChat={setIsOpenedChat}/>
                <Dialog setIsOpenedChat={setIsOpenedChat}/>
                <Dialog setIsOpenedChat={setIsOpenedChat}/>
                <Dialog setIsOpenedChat={setIsOpenedChat}/>
            </div>
        </div>
    )
}

export default Dialogs

//s