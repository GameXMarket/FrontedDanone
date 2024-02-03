import { Navbar } from "./_components/navbar"

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    return(
        <div className="w-full">
            <div className="flex w-full mobile:flex-col mobile:items-center">
                <Navbar />
                <div className="w-[calc(100%-200px)] mobile:w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SettingsLayout