import styles from './chat.module.css'

interface MessageProps {
    date: any
    name?: string
    text: string
}



export const RightMessage = ({text, name, date}: MessageProps) => {
    return (
    <div className={styles.message_right}>
        <div className={styles.msg_right}>
            <div className='flex flex-col w-[90%]'>
                <div className='w-full pt-3 flex flex-col ml-2'>
                    <h4>{name}</h4>
                    <p>{text}</p>
                </div>
                <div className='w-full flex justify-end'>
                    <p className='text-[14px] opacity-[0.16] ml-2'></p>
                </div>
            </div>
        </div>
    </div>
    )
}

export const LeftMessage = ({text, name, date}: MessageProps) => {

    return (
    <div className={styles.message_left}>
        <div className={styles.msg_left}>
                <div className='w-full pt-3 flex flex-col ml-2'>
                    <h4>{name}</h4>
                    <p>{text}</p>
                </div>
                <div className='w-full flex'>
                    <p className='text-[14px] opacity-[0.16] ml-2'></p>
                </div>
            </div>
    </div>        
    )
}