import { RegisterForm } from "./_components/register-form";

const RegisterPage = () => {
    return(
            <div className="h-full flex justify-center items-center">
                <div className="w-[450px] flex flex-col items-center">
                    <RegisterForm />
                </div>
            </div>
    )
}

export default RegisterPage;