import { FC } from "react";
import styles from '../styles/page.module.css'
import Link from "next/link";

const Ticket:FC = () => {
    return (
        <Link href={'/ticket'}>
            <div className={styles.sidebar_tick_container}>
                <h4 className={styles.sidebar_ticket}>Тикет #00000</h4>
            </div>
        </Link>    
    )
}

export default Ticket