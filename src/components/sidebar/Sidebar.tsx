"use client"

import {FC, useState} from 'react'
import styles from './sidebar.module.css'
import Image from 'next/image'
import { AuthButton, CatalogButton, ChatButton, MyOrdersButton } from './buttons/Buttons'
import { InfoIcon, SupportIcon } from './icons/SidebarIcons'
import Modal from './modal'
import { useOutside } from '@/hooks/useOutside'
import { BellIcon } from '@/app/(routes)/chats/icons/BellIcon'
import { useMediaQuery } from 'react-responsive'



const Sidebar:FC = () => {
    const {ref, isShow, setIsShow} = useOutside(false)
    const [isAuth, setIsAuth] = useState<boolean>(true) // УСЛОВНО

    const mobileRes = useMediaQuery({
        query: '(max-width: 440px)'
    })

    return (
        <>
            {isShow && <Modal reference={ref} isShow={isShow} setIsShow={setIsShow}/>} 
            {mobileRes ? null : (
             <aside className={styles.sidebar}>
                
             {isAuth ? (
                 <>

                     <div className={styles.profile_block}>
                         <div className={styles.profile_avatar_wrapper}>
                             <div className={styles.profile_avatar}>
                                 <Image className={styles.profile_avatar_icon} width={60} height={60} alt='avatar' src='/profile-assets/avatar.svg'/>
                             </div>
                             <div className={styles.profile_settings}>
                                 <Image className={styles.profile_avatar_icon} alt='avatar' width={21} height={20} src='/profile-assets/settings.svg'/>
                             </div>
                         </div>
                         <div className={styles.profile_info_block}>
                             <div className='w-full flex'>
                                 <h4 className={styles.sidebar_name}>Redmoon</h4> 
                                 <div className='ml-2'>
                                     <BellIcon/>
                                 </div>
                             </div>    
                             <div className={styles.profile_info_wallet} onClick={() => setIsShow(!isShow)}>
                                 <div className='pl-4'>
                                     <Image alt='wallet' src='/profile-assets/empty-wallet.svg' width={32} height={32}  />
                                 </div>
                                 <h5 className={styles.profile_count}>19 221.01₽</h5>
                             </div>
                         </div>
                     </div>
                     <div className={styles.order_details}>
                         <p className={styles.profile_p}>Сделок:<span className='font-light text-[24px]'> 2991</span></p>
                         <p className={styles.profile_p}>На сайте:<span className='font-light text-[24px]'> 3 года</span></p>
                     </div>
                     <div className={styles.variants}>
                         <MyOrdersButton/>
                         <ChatButton/>
                         <CatalogButton/>
                     </div>
                     <div className={styles.info_block}>
                         <div className='flex cursor-pointer'>
                             <SupportIcon/>
                             <p className='text-[24px] opacity-[0.16] ml-4 font-regular'>Тех. поддержка</p>
                         </div>
                         <div className='flex cursor-pointer mt-[28px]'>
                             <InfoIcon/>
                             <p className='text-[24px] opacity-[0.16] ml-4 font-regular'>О нас</p>
                         </div>  
                     </div>
                 </>
             ) : (
                 <>
                     <div className='ml-[63px]'>
                         <AuthButton/>
                     </div>
                     <div className='mt-[517px]'>
                         <div className={styles.info_block}>
                             <div className='flex cursor-pointer'>
                                 <SupportIcon/>
                                 <p className='text-[16px] ml-[9px] font-regular'>Поддержка</p>
                             </div>
                             <div className='flex cursor-pointer mt-[32px]'>
                                 <InfoIcon/>
                                 <p className='text-[16px] ml-[9px] font-regular'>О нас</p>
                             </div>  
                         </div>
                     </div>
                 </>
             )}
         </aside>
        )}
        </>
    )
}

export default Sidebar