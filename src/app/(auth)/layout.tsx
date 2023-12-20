import Header from "@/components/header/Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return(
        <>
        <Header />
        {children}
        </>
    )
};

export default AuthLayout;