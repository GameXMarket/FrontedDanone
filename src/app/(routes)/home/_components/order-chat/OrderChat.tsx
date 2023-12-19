import OrderItem from './OrderItem'
import styles from './orderchat.module.css'

const OrderChat = () => {
    return (
        <aside className={styles.orderchat}>
            <OrderItem/>
            <OrderItem/>
            <OrderItem/>
            <OrderItem/>
            <OrderItem/>
            <OrderItem/>
            <OrderItem/>
        </aside>
    )
}

export default OrderChat