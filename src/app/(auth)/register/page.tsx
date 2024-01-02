import { RegisterForm } from "./_components/register-form";
import Image from "next/image";

const RegisterPage = () => {
    return (
        <div className="mt-6 flex flex-col justify-center items-center">
            <div className="w-[464px] flex flex-col items-center">
                <RegisterForm />
            </div>
            <div className="flex flex-col items-center gap-y-4 mt-[40px]">
                <p className="text-[#2E323B] text-[24px]">Войти через:</p>
                <div className="flex gap-x-6 pb-10">
                    <Image
                        className="cursor-pointer"
                        alt="telegram"
                        src="/images/auth/telegram.svg"
                        height={25}
                        width={25}
                    />
                    <Image
                        className="cursor-pointer"
                        alt="vk"
                        src="/images/auth/vk.svg"
                        height={25}
                        width={25}
                    />
                    <Image
                        className="cursor-pointer"
                        alt="google"
                        src="/images/auth/google.svg"
                        height={25}
                        width={25}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
