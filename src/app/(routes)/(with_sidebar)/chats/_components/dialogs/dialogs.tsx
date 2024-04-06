'use client'

import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import styles from './dialogs.module.css'
import { ChevronLeft } from 'lucide-react'
import Dialog from './dialog'
import { messengerService } from '@/requests/messenger/messenger.service'
import { useAuthQuery } from '@/hooks/useAuthQuery'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import Link from 'next/link'


const Dialogs = () => {
    const user = useCurrentUser()
    const username = user?.username


    const {data, error, isLoading} = useAuthQuery({
        queryKey: ['get all chats'],
        queryFn: () => messengerService.getAllChats()
    })

    return (
        <div className={styles.dialogs}>
            <Link href={"/chats"}>
            <div className="w-full ml-5 flex mt-7 items-center">
                <ChevronLeft />
                <p className={styles.back_text}>Назад</p>
            </div>
            </Link>
            <div className={styles.dialog_container}>
                {data && data.filter((dialog: any) => dialog.interlocutor_username !== username).map((dialog: any) => (
                    <Dialog key={dialog.chat_id} dialog={dialog} />
                ))}
            </div>
        </div>
    )
}

export default Dialogs
