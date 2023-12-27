import Header from "@/components/header/Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return(
        <div className="h-full flex flex-col items-center">
            <Header />
            {children}
        </div>
    )
};

export default AuthLayout;