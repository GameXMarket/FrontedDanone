import { FC } from "react";
import styles from './groups.module.css'
import Image from "next/image";
import Group from "./group";
import { ArrowBackIcon } from "@/app/(routes)/categories/[category_id]/icons/game-page-icons";

const Groups:FC = () => {
    return (
        <div className={styles.groups}>
            <div className={styles.common_group}>
                <div className={styles.cg_img}>
                    <Image src='/messenger/group.svg' alt='group' width={52} height={52}/>
                </div>
                <p className={styles.cg_text}>Общее</p>
            </div>
            <div>
                <Group/>
                <Group/>
                <Group/>
                <Group/>
                
            </div>
            <div className={styles.more}>
                <div className={styles.rotate}>
                    <ArrowBackIcon/>
                </div>
            </div>
        </div>
    )
}

export default Groups