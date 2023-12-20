import styles from './_components/styles/home.module.css'
import OrderChat from './_components/order-chat/OrderChat'
import { MainContent } from './_components/main-content/MainContent'

const Home = () => {
    return (
        <div className={styles.home_container}>
            <div className='w-full min-h-[500px]'>
                <MainContent />
            </div>
            <div className='min-h-[500px]'>
                <OrderChat/>
            </div>
        </div>
    )
}

export default Home