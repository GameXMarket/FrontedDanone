import Image from 'next/image'
import styles from './groups.module.css'

const Group = () => {
    return (
        <div className={styles.group}>
            <Image src='/messenger/group.svg' alt='group' width={52} height={52}/>
            <p>WOT</p>
        </div>
    )
}

export default Group