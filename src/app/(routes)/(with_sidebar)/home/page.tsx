import { Games } from "./_components/Games"
import { Popular } from "./_components/Popular"


const Home = async () => {

    return (
        <div className="w-full px-6 mobile:px-0 pb-6 space-y-8">
            <Games />
            <Popular />
        </div>
    )
}

export default Home