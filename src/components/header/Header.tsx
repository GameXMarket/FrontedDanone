'use client'

import styles from './header.module.css'
const Logo = dynamic(() => import("./Logo"), {ssr: false});
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

const Header = ({className}: {className?: string}) => {

    const {push} = useRouter()

    return (
        <header className={cn(className ? className : styles.header)}>
            <div className={styles.logo_container} onClick={() => push("/home")}>
                <Logo/>
            </div>
        </header>
    )
}

export default Header