import { FC } from "react";
import styles from './header.module.css'
import Logo from "./Logo";

const Header:FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo_container}>
                <Logo/>
            </div>
        </header>
    )
}

export default Header