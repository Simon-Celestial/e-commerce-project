import styles from "./OrdersManagement.module.scss";
import {Eye, Money, CreditCard, Truck, Package} from "@phosphor-icons/react";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Bounce, toast} from "react-toastify";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../Context/AuthContext.jsx";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
};
const itemsPerPage = 9;

export const OrdersManagement = () => {

    const {
        setShouldUpdate,
        orders,
        calculateOrderPrice
    } = useContext(AuthContext);

    const update = useCallback(() => {
        setShouldUpdate(Date.now())
    }, [setShouldUpdate])

    const [orderSearchTerm,setOrderSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);


    const handleSearchOrder = useCallback((e) => {
        setOrderSearchTerm(e.target.value);
    },[setOrderSearchTerm])

    const handleStatusChange = async (orderId, newStatus, oldStatus) => {
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
        } else {
            try {
                await axios.patch(`http://localhost:8000/orders/${orderId}`, {status: newStatus});
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
    const sortedOrders = useMemo(() => {
        return orders?.slice().sort((a, b) => parseDate(b.addedAt) - parseDate(a.addedAt));
    }, [orders]);

    const filteredOrders = useMemo(() => {
        if (!sortedOrders) return [];
        return sortedOrders?.filter(order => {
            const fullName = `${order.firstName} ${order.lastName}`.toLowerCase();
            return fullName.includes(orderSearchTerm.toLowerCase());
        });
    }, [sortedOrders, orderSearchTerm]);

    // PAGINATION

    const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage,
        [currentPage]);

    const endIndex = useMemo(() => startIndex + itemsPerPage, [startIndex]);

    const handlePageChange = useCallback((event, page) => {
        setCurrentPage(page);
    }, [setCurrentPage]);

    const currentOrders = useMemo(() => {
        return filteredOrders?.slice(startIndex, endIndex);
    }, [filteredOrders, startIndex, endIndex]);


    useEffect(() => {
        if (filteredOrders && filteredOrders.length > 0 && endIndex > filteredOrders.length - 1) {
            setCurrentPage(Math.ceil(filteredOrders?.length / itemsPerPage));
        }
    }, [endIndex, filteredOrders, setCurrentPage, itemsPerPage]);


    return (
        <div className={styles.ordersWrapper}>
            <div className={styles.ordersFilter}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        placeholder="Search customer mame"
                        onChange={handleSearchOrder}
                        value={orderSearchTerm}
                    />
                </div>

            </div>
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
                        {currentOrders?.length !== 0 ?
                            currentOrders?.map((order) => {
                                return (
                                    <div key={order?.id}
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
                                            {order?.paymentType === "cash" ? <Money weight="duotone" color="green"/> :
                                                <CreditCard weight="duotone" color="orange"/>}
                                        </div>
                                        <div className={`${styles.status} ${styles.tableCell}`}>
                                            <select
                                                value={order?.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value, order.status)}
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
                                            <Link to={`/admin/customer-order/${order?.id}`} className={styles.action}>
                                                <Eye/>
                                            </Link>
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
            <div className={styles.paginationWrapper}>
                <Stack spacing={1}>
                    <Pagination
                        count={Math.ceil(filteredOrders?.length / itemsPerPage)}
                        variant="outlined"
                        shape="rounded"
                        size="large"
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </div>
        </div>
    )
}
