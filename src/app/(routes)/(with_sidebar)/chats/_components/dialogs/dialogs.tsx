'use client'

import { Dispatch, FC, PropsWithChildren, SetStateAction, useEffect } from 'react'
import styles from './dialogs.module.css'
import { ChevronLeft } from 'lucide-react'
import Dialog from './dialog'
import { messengerService } from '@/requests/messenger/messenger.service'
import { useAuthQuery } from '@/hooks/useAuthQuery'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import Link from 'next/link'

interface IDialogsPage {
    dialogs: Array<{}>
    sortedDialogs: Array<{}>
}


const Dialogs:FC<PropsWithChildren<IDialogsPage>> = ({sortedDialogs, dialogs}) => {
    const user = useCurrentUser()
    const username = user?.username
    console.log(sortedDialogs)

    return (
        <div className={styles.dialogs}>
            <div  className="mt-6">
            <div className={styles.dialog_container}>
                {dialogs && dialogs.filter((dialog: any) => dialog.interlocutor_username !== username).map((dialog: any) => (
                    <Dialog key={dialog.chat_id} dialog={dialog} />
                ))}
            </div>
            </div>
        </div>
    )
}

export default Dialogs
