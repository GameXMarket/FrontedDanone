import Link from "next/link";
import { RegisterForm } from "./_components/register-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const RegisterPage = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <div className="w-[450px] flex flex-col items-center">
                <RegisterForm />
            </div>
            <Link href="/login">
                <Button variant="link">Уже есть аккаунт?</Button>
            </Link>
            <div className="flex flex-col items-center gap-y-4 mt-8">
                <p>Войти через:</p>
                <div className="flex gap-x-6">
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
