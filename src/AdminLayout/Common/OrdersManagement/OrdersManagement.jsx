import styles from "./OrdersManagement.module.scss";
import {Trash, Eye,Money, CreditCard,Truck,Package} from "@phosphor-icons/react";
import {useCallback, useEffect, useState,useMemo} from "react";
import axios from "axios";
import {Bounce, toast} from "react-toastify";

export const OrdersManagement = () => {

    const [orders,setOrders] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(Date.now());

    const update = useCallback(() => {
        setShouldUpdate(Date.now())
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:8000/orders");
                setOrders(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            }
        })();
    }, [shouldUpdate]);

    const handleStatusChange = async (orderId, newStatus,oldStatus) => {
        if (oldStatus === "completed") {
            toast.error('You cannot change "completed" status.', {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
        }
        else {
            try {
                await axios.patch(`http://localhost:8000/orders/${orderId}`, { status: newStatus });
                update();
                toast.success(`Status successfully changed to "${newStatus}".`, {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    transition: Bounce,
                });
            } catch (error) {
                console.error('Error updating order status:', error);
            }
        }
    };

    const calculateOrderPrice = useMemo(() => (order) => {
        const productTotal = order?.products.reduce((total, product) => total + product.salePrice * product.count, 0);
        const shippingCost = order?.shippingMethod === "pickup" ? 2.50 : 7.50;
        return (productTotal + shippingCost).toFixed(2);
    }, []);

    return (
        <div className={styles.ordersWrapper}>
            <div className={styles.overFlow}>
            <div className={styles.ordersTable}>
                <div className={styles.table}>
                    <div className={`${styles.tableRow} ${styles.tableHeading}`}>
                        <div className={`${styles.id} ${styles.tableCell}`}>
                            ID
                        </div>
                        <div className={`${styles.date} ${styles.tableCell}`}>
                            Date
                        </div>
                        <div className={`${styles.customer} ${styles.tableCell}`}>
                            Customer
                        </div>
                        <div className={`${styles.payment} ${styles.tableCell}`}>
                            Payment
                        </div>
                        <div className={`${styles.status} ${styles.tableCell}`}>
                            Status
                        </div>
                        <div className={`${styles.price} ${styles.tableCell}`}>
                            Price
                        </div>
                        <div className={`${styles.delivery} ${styles.tableCell}`}>
                            Delivery
                        </div>
                        <div className={`${styles.actions} ${styles.tableCell}`}>
                            Actions
                        </div>
                    </div>
                    {orders?.length !== 0 ?
                        orders?.map((order) => {
                            return (
                                <div key={order.id}
                                     className={`${styles.tableRow} ${styles.orderTable}`}>
                                    <div className={`${styles.id} ${styles.tableCell}`}>
                                        {order?.id}
                                    </div>
                                    <div className={`${styles.date} ${styles.tableCell}`}>
                                       {order?.addedAt}
                                    </div>
                                    <div className={`${styles.customer} ${styles.tableCell}`}>
                                        {order?.firstName} {order?.lastName}
                                    </div>
                                    <div className={`${styles.payment} ${styles.tableCell}`}>
                                        {order?.paymentType === "cash"? <Money  weight="duotone" color="green" /> : <CreditCard  weight="duotone" color="orange" />}
                                    </div>
                                    <div className={`${styles.status} ${styles.tableCell}`}>
                                        <select
                                            value={order?.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value,order.status)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="сonfirmed">Confirmed</option>
                                            <option value="processing">Processing</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="returned">Returned</option>
                                        </select>
                                    </div>
                                    <div className={`${styles.price} ${styles.tableCell}`}>
                                        $ {calculateOrderPrice(order)}
                                    </div>
                                    <div className={`${styles.delivery} ${styles.tableCell}`}>
                                        {order?.shippingMethod === "delivery" ?
                                            <Truck weight="duotone" color="white"/> :
                                            <Package weight="duotone" color="white"/>}
                                    </div>
                                    <div className={`${styles.actions} ${styles.tableCell}`}>
                                        <div className={styles.action}>
                                            <Eye />
                                        </div>
                                        <div className={styles.action}>
                                            <Trash/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className={styles.noProducts}>
                            No orders placed...
                        </div>
                    }
                </div>
            </div>
            </div>

        </div>
    )
}
