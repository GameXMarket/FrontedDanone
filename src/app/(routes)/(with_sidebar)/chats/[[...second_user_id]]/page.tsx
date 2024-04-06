'use client'

import styles from '../styles/page.module.css'
import Chat from "../_components/chat/Chat";
import Groups from "../_components/groups/groups";
import Dialogs from "../_components/dialogs/dialogs";
import { messengerService } from '@/requests/messenger/messenger.service';
import { useAuthQuery } from '@/hooks/useAuthQuery';

const ChatPage = ({params}: {params: {second_user_id?: string[]}}) => {

    const {data: dialog} = useAuthQuery({
        queryKey: ["dialog", params.second_user_id?.[0]],
        queryFn: () => messengerService.getDialogById(+params?.second_user_id?.[0]!),
        enabled: !!params.second_user_id,
    })
    return (
        <main className={styles.messenger_container}>
            <div className={styles.messenger_groupsandchats}>
                <Groups/>
                <Dialogs />
            </div>
            {!!params.second_user_id ? (
            <div className="w-full">
                <Chat dialog={dialog as any}/>
            </div>) : (
            <div className={styles.is_opened_chat}>
                <h2 className="text-[32px] font-semibold">Выберете диалог<br/>и начните беседу!</h2>
            </div>
            )}
        </main>
    )
}

export default ChatPage