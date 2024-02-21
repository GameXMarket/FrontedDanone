'use client'

import { LoginForm } from "./_components/login-form";
import Image from "next/image";
import styles from './_components/styles/login.module.css'
import { useMediaQuery } from 'react-responsive'
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";

const LoginPage = () => {
    const mobileRes = useMediaQuery({
        query: '(max-width: 440px)'
    })

    return (
        <div className="mt-6 flex flex-col items-center">
            <Button onClick={() => logout()}>Logout</Button>
            <div className={styles.login_page}>
                <LoginForm />
            </div>
            <div className="flex flex-col items-center gap-y-4 mt-[40px]">
            <p className="text-[#2E323B] text-[24px]">Войти через:</p>
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
