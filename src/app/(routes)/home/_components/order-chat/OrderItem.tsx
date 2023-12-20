import { ExchangeIcon } from './ExchangeIcon'
import styles from './orderchat.module.css'

const OrderItem = () => {
    return (
        <section className={styles.orderitem}>
            <div className={styles.order_avatar}>
            </div>
            <div className={styles.order_info_wrapper}>
                <h4 className={styles.order_item_name}>Item name</h4>
                <div className={styles.order_details_wrapper}>
                    <div>
                        <p className='text-[14px] font-regular text-[#707070]'>NikitaBoy</p>
                        <span className='text-[14px] font-regular pt-1'>170.20 $</span>
                    </div>
                    <div className='mx-[13px]'>
                        <ExchangeIcon/>
                    </div>
                    <div>
                        <p className='text-[14px] font-regular text-[#707070]'>TopSeller001</p>
                        <span className='text-[14px] font-semibold pl-[1px] pt-1 text-[#707070]'>только что</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderItem