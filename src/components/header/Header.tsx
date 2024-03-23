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
                <div />
                <div className={styles.logo_container} onClick={() => push("/home")}>
                    <Logo/>
                </div>
                {session.status === "unauthenticated" && (
                    <>
                    <div className={styles.btns}>
                        <Button className={cn(styles.btn, "hover:back-gradient")} onClick={() => push("/login")}>Войти</Button>
                        <Button className={cn(styles.btn, "hover:back-gradient")} onClick={() => push("/register")}>Регистрация</Button>
                    </div>
                    <aside className="hidden 830px:flex fixed bottom-0 left-0 w-full justify-around items-center bg-[#1F2028] p-2 z-50 rounded-t-3xl">
                        <Button className={cn(styles.btn, "hover:back-gradient")} onClick={() => push("/login")}>Войти</Button>
                        <Button className={cn(styles.btn, "hover:back-gradient")} onClick={() => push("/register")}>Регистрация</Button>
                    </aside>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header