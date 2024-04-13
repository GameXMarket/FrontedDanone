import styles from './chat.module.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Image from 'next/image'

interface MessageProps {
    date: number
    name?: string
    text: string
    files: string[]
}

export const RightMessage = ({text, name, date, files}: MessageProps) => {

    return (
    <div className={styles.message_right}>
        <div className={styles.msg_right}>
            <div className='flex flex-col w-[90%]'>
                <div className='w-full pt-3 flex flex-col ml-2'>
                    <h4>{name}</h4>
                    <p className='pb-2'>{text}</p>
                    {files && (
                        <Image className='rounded-[24px]' src={files[0]} alt='msg file' width={340} height={420}/>
                    )}
                </div>
                <div className='w-full flex justify-end'>
                    <p className='text-[14px] opacity-[0.16] ml-2'>{dayjs.unix(date).format('DD.MM, HH:mm').toString()}</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export const LeftMessage = ({text, name, date, files}: MessageProps) => {



    return (
    <div className={styles.message_left}>
        <div className={styles.msg_left}>
            <div className='flex flex-col w-[90%]'>
                <div className='w-full pt-3 flex flex-col ml-2'>
                    <h4>{name}</h4>
                    <p className='pb-2'>{text}</p>
                    {files && (
                        <Image className='rounded-[24px]' src={files[0]} alt='msg file' width={340} height={420}/>
                    )}
                    
                </div>
                <div className='w-full flex justify-end'>
                    <p className='text-[14px] opacity-[0.16] ml-2'>{dayjs.unix(date).format('DD.MM, HH:mm').toString()}</p>
                </div>
            </div>
        </div>
    </div>        
    )
}