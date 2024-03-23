'use client'

import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import styles from './dialogs.module.css'
import { ChevronLeft } from 'lucide-react'
import Dialog from './dialog'
import { messengerService } from '@/requests/messenger/messenger.service'
import { useAuthQuery } from '@/hooks/useAuthQuery'

export interface IDialogsComponent {
    setIsOpenedChat: Dispatch<SetStateAction<boolean>>
}

type Dialogs = {
    chat_ids: [number]
}


const Dialogs:FC<PropsWithChildren<IDialogsComponent>> = ({setIsOpenedChat}) => {
    const {data, error, isLoading} = useAuthQuery({
        queryKey: ['get all chats'],
        queryFn: () => messengerService.getAllChats()
    })


    return (
        <div className={styles.dialogs}>
            <div className="w-full ml-5 flex mt-7 items-center" onClick={() => setIsOpenedChat(false)}>
                <ChevronLeft />
                <p className={styles.back_text}>Назад</p>
            </div>
            <div className={styles.dialog_container}>
                {/* {data && data.data.chat_ids.map(dialog => (
                    <Dialog key={dialog} dialog_id={dialog} setIsOpenedChat={setIsOpenedChat}/>
                ))}
                */}
            </div>
        </div>
    )
}

export default Dialogs

//s