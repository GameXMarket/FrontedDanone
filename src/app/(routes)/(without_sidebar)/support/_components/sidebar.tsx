import { FC } from "react";
import styles from '../styles/page.module.css'
import Ticket from "./ticket";

const Sidebar:FC = () => {
    return (
        <aside className={styles.sidebar}>
            <p className="text-[22px] opacity-[0.16]">История тикетов</p>
            <div className={styles.sidebar_tickets}>
                <Ticket/>
            </div>
        </aside>
    )
}

export default Sidebar