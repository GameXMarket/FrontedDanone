'use client'

import { FC } from "react";
import styles from './header.module.css'
import Logo from "./Logo";
import { useRouter } from "next/navigation";

const Header:FC = () => {

    const {push} = useRouter()

    return (
        <header className={styles.header}>
            <div className={styles.logo_container} onClick={() => push("/home")}>
                <Logo/>
            </div>
        </header>
    )
}

export default Header