import { FC, PropsWithChildren, useEffect, useState } from "react";
import styles from './dialogs.module.css'
import Image from "next/image";
import { IDialogsComponent } from "./dialogs";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { messengerService } from "@/requests/messenger/messenger.service";

interface IDialog extends IDialogsComponent {
    dialog_id: {
        chat_id: any
        interlocutor_username: string
        interlocutor_files: Array<string>
    }
}

const Dialog:FC<PropsWithChildren<IDialog>> = ({setDialog, setIsOpenedChat, dialog_id}) => {  

    const {data, error, isLoading} = useAuthQuery({
            queryKey: ['get messages', dialog_id?.chat_id],
            queryFn: () => messengerService.getChatMessages(dialog_id.chat_id),
    })

    const [isSelected, setIsSelected] = useState<boolean>(false)  
    const openChat = () => {
        setDialog(dialog_id)
        setIsOpenedChat(true)
    }

    return (
    <div  className={styles.dialog} onClick={() => openChat()}>
        <div className={styles.dialog_avatar}>
            <Image src={dialog_id.interlocutor_files ? dialog_id.interlocutor_files?.[0] : '/messenger/cringeman.svg'} alt='avatar' width={70} height={70} className="rounded-full w-[60px] h-[60px]"/>
        </div>
        <div className='ml-3'>
            <h3 className={isSelected ? styles.dialog_name_s : styles.dialog_name}>{dialog_id.interlocutor_username}</h3>
            <p className={styles.dialog_preview}>{data && data.at(-1).content}</p>
        </div>
    </div>
    )
}

export default Dialog;