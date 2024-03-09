'use client'

import Logo from "@/components/header/Logo";
import styles from './_components/styles/layout.module.css'
import Link from "next/link";


const AuthLayout = ({ children}: { children: React.ReactNode}) => {

    return (
        <div className="h-full flex flex-col items-center">
            <header className={styles.header}>
                <Link href={'/home'}>
                    <div className={styles.logo_container}>
                        <Logo/>
                    </div>
                </Link>
            </header>
            {children}
        </div>
    )
};

export default AuthLayout;