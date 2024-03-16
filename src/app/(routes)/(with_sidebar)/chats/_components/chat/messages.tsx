import Image from "next/image"
import styles from './chat.module.css'
import { useAuthQuery } from "@/hooks/useAuthQuery"
import { userService } from "@/requests/user/user.service"

interface MessageProps {
    text: string
}

export const RightMessage = ({text}: MessageProps) => {
    const data = useAuthQuery({
        queryKey: ['Receiving username'],
        queryFn: () => userService.getUser()
    })
    

    return (
    <div className={styles.message_right}>
        <div className={styles.msg_right}>
            <div className='w-full pt-3 flex flex-col ml-2'>
                <h4>{data.data?.username}</h4>
                <p>{text}</p>
            </div>
        </div>
    </div>
    )
}

export const LeftMessage = ({text}: MessageProps) => {

    return (
    <div className={styles.message_left}>
        <div className={styles.msg_left}>
                <div className='w-full pt-3 flex flex-col ml-2'>
                    <h4>User_2</h4>
                    <p>{text}</p>
                </div>
            </div>
    </div>        
    )
}