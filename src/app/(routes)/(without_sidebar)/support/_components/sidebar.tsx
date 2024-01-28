import { FC } from "react";
import styles from '../styles/page.module.css'

const Sidebar:FC = () => {
    return (
        <aside className={styles.sidebar}>
            <p className="text-[22px] opacity-[0.16]">История тикетов</p>
            <div className={styles.sidebar_tickets}>
                <h4 className={styles.sidebar_ticket}>Тикет #00000</h4>
                <h4 className={styles.sidebar_ticket}>Тикет #00000</h4>
                <h4 className={styles.sidebar_ticket}>Тикет #00000</h4>
                <h4 className={styles.sidebar_ticket}>Тикет #00000</h4>
                <h4 className={styles.sidebar_ticket}>Тикет #00000</h4>
                <h4 className={styles.sidebar_ticket}>Тикет #00000</h4>
                <h4 className={styles.sidebar_ticket}>Тикет #00000</h4>
                <h4 className={styles.sidebar_ticket}>Тикет #00000</h4>
                <h4 className={styles.sidebar_ticket}>Тикет #00000</h4>
            </div>
        </aside>
    )
}

export default Sidebar