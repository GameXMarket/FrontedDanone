import Layout from '@/components/layout/Layout'
import styles from './home.module.css'
import Sidebar from './sidebar/Sidebar'

const HomePage = () => {
    return (
        <Layout>
            <div className={styles.home_container}>
                <Sidebar/>
                <div className='w-[1141px] min-h-[500px]'>
Content
                </div>
                <div className='w-[267px] min-h-[500px]'>
Chat
                </div>
            </div>
        </Layout>
    )
}

export default HomePage