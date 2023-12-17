import Layout from "@/components/layout/Layout";
import { RegisterForm } from "./_components/register-form";

const RegisterPage = () => {
    return(
        <Layout>
            <div className="h-full flex justify-center items-center">
                <div className="w-[450px] flex flex-col items-center">
                    <RegisterForm />
                </div>
            </div>
        </Layout>
    )
}

export default RegisterPage;