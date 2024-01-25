import { Navbar } from "./_components/navbar";
import { UserInfo } from "./_components/user-info";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full">
            <div className="flex">
                <Navbar />
                <div className="w-full">
                    <UserInfo />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UserLayout
