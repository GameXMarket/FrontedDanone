import { Navbar } from "./_components/navbar";
import { UserInfo } from "./_components/user-info";

const MeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full">
            <div className="w-[calc(100%-87px)] ml-auto flex flex-col items-center space-y-8">
                <UserInfo />
                <Navbar />
                {children}
            </div>
        </div>
    );
};

export default MeLayout;
