import OrderChat from './_components/OrderChat'
import { MainContent } from './_components/MainContent'

const Home = () => {
    return (
        <div className="w-full flex">
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