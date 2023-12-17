import {FC} from 'react'
import styles from '../home.module.css'
import Image from 'next/image'
import AvatarIcon from '../../../../assets/profile assets/avatar.png' 
import SettingsIcon from '../../../../assets/profile assets/settings.png' 
import WalletIcon from '../../../../assets/profile assets/wallet.png' 

const Sidebar:FC = () => {
    return (
        <aside className={styles.sidebar}>
            <h4 className={styles.sidebar_name}>Redmoon</h4>
            <div className={styles.profile_block}>
                <div className={styles.profile_avatar_wrapper}>
                    <div className={styles.profile_avatar}>
                        <Image className={styles.profile_avatar_icon} alt='avatar' src={AvatarIcon}/>
                    </div>
                    <div className={styles.profile_settings}>
                        <Image className={styles.profile_avatar_icon} alt='avatar' src={SettingsIcon}/>
                    </div>
                </div>
                <div className={styles.profile_info_block}>
                    <div className={styles.profile_info_wallet}>
                        <Image alt='wallet' src={WalletIcon}/>
                        <h5 className={styles.profile_count}>19 221.01₽</h5>
                    </div>
                    <p className={styles.profile_p}>Сделок:<span className='font-normal'> 2991</span></p>
                    <p className={styles.profile_p}>На сайте:<span className='font-normal'> 3 года</span></p>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar