import styles from './home.module.css'
import Sidebar from './sidebar/Sidebar'

const HomePage = () => {
    return (
            <div className={styles.home_container}>
                <Sidebar/>
                <div className='w-[1141px] min-h-[500px]'>
                    Content
                </div>
                <div className='w-[267px] min-h-[500px]'>
                    Chat
                </div>
            </div>
    )
}

export default HomePage