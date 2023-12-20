import {FC} from 'react'
import styles from '../../app/(routes)/home/_components/home.module.css'
import Image from 'next/image'
import { ChatButton, SellButton } from '../../app/(routes)/home/_components/buttons/Buttons'
import { InfoIcon, SupportIcon } from './SidebarIcons'

const Sidebar:FC = () => {
    return (
        <aside className={styles.sidebar}>
            <h4 className={styles.sidebar_name}>Redmoon</h4>
            <div className={styles.profile_block}>
                <div className={styles.profile_avatar_wrapper}>
                    <div className={styles.profile_avatar}>
                        <Image className={styles.profile_avatar_icon} width={60} height={60} alt='avatar' src='/profile-assets/avatar.png'/>
                    </div>
                    <div className={styles.profile_settings}>
                        <Image className={styles.profile_avatar_icon} alt='avatar' width={21} height={20} src='/profile-assets/settings.png'/>
                    </div>
                </div>
                <div className={styles.profile_info_block}>
                    <div className={styles.profile_info_wallet}>
                        <Image alt='wallet' src='/profile-assets/wallet.png' width={20} height={18}  />
                        <h5 className={styles.profile_count}>19 221.01₽</h5>
                    </div>
                    <p className={styles.profile_p}>Сделок:<span className='font-normal'> 2991</span></p>
                    <p className={styles.profile_p}>На сайте:<span className='font-normal'> 3 года</span></p>
                </div>
            </div>
            <div className={styles.variants}>
                <SellButton/>
                <ChatButton/>
            </div>
            <div className={styles.info_block}>
                <div className='flex cursor-pointer'>
                    <SupportIcon/>
                    <p className='text-[16px] ml-[9px] font-regular'>Поддержка</p>
                </div>
                <div className='flex cursor-pointer mt-[28px]'>
                    <InfoIcon/>
                    <p className='text-[16px] ml-[9px] font-regular'>О нас</p>
                </div>  
            </div>
        </aside>
    )
}

export default Sidebar