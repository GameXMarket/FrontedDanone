import { Navbar } from "./_components/navbar";
import { UserInfo } from "./_components/user-info";

const MeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full">
            <div className="w-[calc(100%-87px)] mobile:w-full ml-auto mobile:ml-0 flex flex-col items-center space-y-8">
                <UserInfo />
                <Navbar />
                {children}
            </div>
        </div>
    );
};

export default MeLayout;
