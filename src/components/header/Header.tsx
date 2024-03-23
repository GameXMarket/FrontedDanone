'use client'

import styles from './header.module.css'
import Logo from './Logo';
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from '../ui/button';
import { SessionContextValue } from 'next-auth/react';

interface HeaderProps {
    className?: string,
    session: SessionContextValue
}

const Header = ({className, session}: HeaderProps) => {

    const {push} = useRouter()

    return (
        <header className={cn(className ? className : styles.header)}>
            <div className={session.data?.user === undefined ? styles.header_container : styles.header_none}>
                <div className={styles.logo_container} onClick={() => push("/home")}>
                    <Logo/>
                </div>
                {session.status === "unauthenticated" && (
                    <div className={styles.btns}>
                        <Button className={styles.btn} onClick={() => push("/login")}>Войти</Button>
                        <Button className={styles.btn} onClick={() => push("/register")}>Регистрация</Button>
                    </div>
                )}

            </div>
        </header>
    )
}

export default Header