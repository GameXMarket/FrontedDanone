import Link from "next/link";
import { LoginForm } from "./_components/login-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

const LoginPage = () => {
    return (
        <div className="mt-6 flex flex-col items-center">
            <div className="w-[450px] flex flex-col items-center">
                <LoginForm />
            </div>
            <Link href="/register">
                <Button variant="link">Впервые на сайте?</Button>
            </Link>
            <div className="flex flex-col items-center gap-y-4 mt-8">
                <p className="text-muted-foreground">Войти через:</p>
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

export default LoginPage;
