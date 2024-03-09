import Image from "next/image"
import styles from './chat.module.css'

interface MessageProps {
    text: string
}

export const RightMessage = ({text}: MessageProps) => {
    return (
    <div className={styles.message_right}>
        <div className={styles.msg_right}>
            <div className={styles.msg_avatar}>
                <Image src='/messenger/group.svg' alt='avatar' width={48} height={48}/>
            </div>
            <div className='w-full pt-3 flex flex-col ml-2'>
                <h4>Heronwater</h4>
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
                <div className={styles.msg_avatar}>
                    <Image src='/messenger/group.svg' alt='avatar' width={48} height={48}/>
                </div>
                <div className='w-full pt-3 flex flex-col ml-2'>
                    <h4>Heronwater</h4>
                    <p>{text}</p>
                </div>
            </div>
    </div>        
    )
}