'use client'

import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import styles from './dialogs.module.css'
import { ChevronLeft } from 'lucide-react'
import Dialog from './dialog'
import { messengerService } from '@/requests/messenger/messenger.service'
import { useAuthQuery } from '@/hooks/useAuthQuery'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export interface IDialogsComponent {
    setDialog: Dispatch<SetStateAction<{}>>
    setIsOpenedChat: Dispatch<SetStateAction<boolean>>
}



const Dialogs:FC<PropsWithChildren<IDialogsComponent>> = ({setDialog, setIsOpenedChat}) => {
    const user = useCurrentUser()
    const username = user?.username

    

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
                {data && data.filter((dialog: any) => dialog.interlocutor_username !== username).map((dialog: any) => (
                    <Dialog setDialog={setDialog} key={dialog.chat_id} dialog_id={dialog} setIsOpenedChat={setIsOpenedChat}/>
                ))}
            </div>
        </div>
    )
}

export default Dialogs

//s