'use client'

import { RegisterForm } from "./_components/register-form";
import Image from "next/image";
import styles from './_components/styles/register.module.css'
import { useMediaQuery } from "react-responsive";

const RegisterPage = () => {
    const mobileRes = useMediaQuery({
        query: '(max-width:440px)'
    })

    return (
        <div className="mt-6 flex flex-col justify-center items-center">
            <div className={styles.register_page}>
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
            {mobileRes && (
                <div className={styles.footer}>
                    <div className="w-full flex justify-center">
                        <hr className="w-[256px] opacity-[0.16]"/>
                    </div>
                    <p className="opacity-[0.16] font-light mt-4 text-center">2024 © Game X Все права защищены.</p>
                </div>
            )}

        </div>
    );
};

export default RegisterPage;
