import Image from 'next/image'
import styles from './slider-card.module.css'

const SliderCard = () => {
    return (
        <div className=" w-[300px]">
        <Image className='z-10 rounded-[24px]' src='/catalog/game.jpg' width={300} height={378} alt='game'/>
        <div className={styles.card_container}>
            <h3 className='font-[500] pt-8 pl-8 text-[32px]'>Roblox</h3>
            <div className={styles.card_options}>
                <div className='w-full flex items-center justify-between'>
                    <div className={styles.card_option}>
                        <p>Монеты</p>
                    </div>
                    <div className={styles.card_option_right}>
                        <p>Аккаунты</p>
                    </div>
                </div>
                <div className='w-full flex mt-2 items-center justify-between'>
                    <div className={styles.card_option}>
                        <p>Снаряжение</p>
                    </div>
                    <div className={styles.card_option_right}>
                        <p>Буст</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default SliderCard