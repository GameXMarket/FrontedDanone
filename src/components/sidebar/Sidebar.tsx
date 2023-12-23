'use client'

import {FC} from 'react'
import styles from './sidebar.module.css'
import Image from 'next/image'
import { AuthButton, ChatButton, SellButton } from './buttons/Buttons'
import { SupportIcon } from './icons/SidebarIcons'
import { InfoIcon, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const Sidebar:FC = () => {
    const router = useRouter()

    const session = useSession()
    console.log(session)

    return (
        <aside className={styles.sidebar}>
            {session.status === "authenticated" ? (
                <>
                    <h4 className={styles.sidebar_name}>Redmoon</h4>
                    <div className={styles.profile_block}>
                        <div className={styles.profile_avatar_wrapper}>
                            <div className={styles.profile_avatar}>
                                <Image className={styles.profile_avatar_icon} width={60} height={60} alt='avatar' src='/profile-assets/avatar.png'/>
                            </div>
                            <div className={styles.profile_settings}>
                                <Image className={styles.profile_avatar_icon} alt='avatar' width={21} height={20} src='/profile-assets/settings.svg'/>
                            </div>
                        </div>
                        <div className={styles.profile_info_block}>
                            <div className={styles.profile_info_wallet}>
                                <Image alt='wallet' src='/profile-assets/wallet.svg' width={20} height={18}  />
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
                        {/* Временно */}
                        <div className='flex cursor-pointer mt-[28px]' onClick={() => signOut()}>
                            <LogOut/>
                            <p className='text-[16px] ml-[9px] font-regular'>Выйти</p>
                        </div>
                        {/* Временно */}
                    </div>
                </>
            ) : (
                <>
                    <div className='ml-[63px]' onClick={() => router.push("login")}>
                        <AuthButton/>
                    </div>
                    <div className='mt-[517px]'>
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
                    </div>
                </>
            )}
        </aside>
    )
}

export default Sidebar