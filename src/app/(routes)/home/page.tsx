import styles from './_components/home.module.css'
import OrderChat from './_components/order-chat/OrderChat'

const Home = () => {
    return (
        <div className={styles.home_container}>
            <div className='w-full min-h-[500px]'>
                

                CONTENT


            </div>
            <div className='w-full min-h-[500px]'>
                <OrderChat/>
            </div>
        </div>
    )
}

export default Home