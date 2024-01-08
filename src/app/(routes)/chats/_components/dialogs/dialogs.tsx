import { FC } from 'react'
import styles from './dialogs.module.css'
import { ArrowBackIcon } from '@/app/(routes)/categories/[category_id]/icons/game-page-icons'
import Dialog from './dialog'

const Dialogs:FC = () => {
    return (
        <div className={styles.dialogs}>
            <div className="w-full ml-5 flex mt-7 items-center">
                <ArrowBackIcon />
                <p className={styles.back_text}>Назад</p>
            </div>
            <div className={styles.dialog_container}>
                <Dialog/>
                <Dialog/>
                <Dialog/>
                <Dialog/>
                <Dialog/>
                <Dialog/>
                <Dialog/>
            </div>
        </div>
    )
}

export default Dialogs