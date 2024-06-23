import styles from "./AdminOrderSingle.module.scss";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext.jsx";
import { CreditCard, Money, Package, Truck } from "@phosphor-icons/react";

export const AdminOrderSingle = () => {

    const {
        orders,
        calculateOrderPrice
    } = useContext(AuthContext);

    const { orderId } = useParams();


    return (

        <>
            {orders?.map((order) => {
                if (order?.id === orderId) {
                    return (
                        <div key={order?.id} className={styles.orderSinglePageWrapper}>
                            <div className={styles.orderSingleContent}>
                                <div className={styles.returnBlock}>
                                    <Link to={"/admin/dashboard"} className={styles.returnLink}>Return to Orders</Link>
                                </div>
                                <div className={styles.invoiceBlock}>
                                    <div className={styles.invoiceTop}>
                                        <div className={styles.invoiceTopItem}>
                                            <p>STATUS</p>
                                            <div className={styles.status}>
                                                {order?.status}
                                            </div>
                                        </div>
                                        <div className={styles.invoiceTopItem}>
                                            <p>DATE</p>
                                            <h2>
                                                {order?.addedAt}
                                            </h2>
                                        </div>
                                        <div className={styles.invoiceTopItem}>
                                            <p>INVOICE NO</p>
                                            <h2 style={{
                                                textTransform: 'uppercase'
                                            }}>
                                                AZ000{order?.id}
                                            </h2>
                                        </div>
                                        <div className={styles.invoiceTopItem}>
                                            <p>INVOICE TO</p>
                                            <h2>
                                                {order?.firstName} {order?.lastName}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className={styles.invoiceTop}>
                                        <div className={styles.invoiceTopItem}>
                                            <p>DELIVERY</p>
                                            <h2>
                                                {order?.shippingMethod === "delivery" ?
                                                    <span>
                                                        <Truck weight="duotone" color="white" />
                                                        Delivery</span>
                                                    :

                                                    <span>
                                                        <Package weight="duotone" color="white" />
                                                        Pickup
                                                    </span>
                                                }
                                            </h2>
                                        </div>
                                        <div className={styles.invoiceTopItem}>
                                            <p>SHIPPING COST</p>
                                            <h2>$ {order?.shippingMethod === "pickup" ? (2.5).toFixed(2) : (7.50).toFixed(2)}</h2>
                                        </div>
                                        <div className={styles.invoiceTopItem}>
                                            <p>PAYMENT</p>
                                            <h2>{order?.paymentType === "cash" ?
                                                <span><Money weight="duotone" color="green" />
                                                    CASH
                                                </span>

                                                :
                                                <span><CreditCard weight="duotone" color="orange" />
                                                    CARD
                                                </span>
                                            }
                                            </h2>
                                        </div>
                                        <div className={styles.invoiceTopItem}>
                                            <p>SUBTOTAL</p>
                                            <h2>$ {order?.products.reduce((total, product) => total + product.salePrice * product.count, 0)?.toFixed(2)}</h2>
                                        </div>
                                    </div>
                                    <div className={styles.invoiceTop}>
                                        <div className={styles.invoiceTopItem}>
                                            <p>PHONE NUMBER</p>
                                            <h2>
                                                {order?.phoneNumber}
                                            </h2>
                                        </div>
                                        <div className={styles.invoiceTopItem}>
                                            <p>AREA</p>
                                            <h2>{order?.districtArea}</h2>
                                        </div>
                                        <div className={styles.invoiceTopItem}>
                                            <p>STREET</p>
                                            <h2>
                                                {order?.streetAddress}
                                            </h2>
                                        </div>
                                        <div className={styles.invoiceTopItem}>
                                            <p>POST CODE</p>
                                            <h2>{order?.postCode !== "" ? order?.postCode : "Not Available"}</h2>
                                        </div>
                                    </div>
                                    <div className={styles.invoiceTop}>
                                        <div className={`${styles.invoiceTopItem} ${styles.descriptionItem}`}>
                                            <p>CUSTOMER MESSAGE</p>
                                            <h2>
                                                {order?.description !== "" ? order?.description : "Not message added"}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className={styles.overFlowX}>
                                        <div className={styles.invoiceMiddle}>
                                            <div className={styles.invoiceMiddleRow}>
                                                <div className={`${styles.id} ${styles.box}`}>
                                                    <p>ID</p>
                                                </div>
                                                <div className={`${styles.image} ${styles.box}`}>
                                                    <p>Image</p>
                                                </div>
                                                <div className={`${styles.name} ${styles.box}`}>
                                                    <p>Product Name</p>
                                                </div>
                                                <div className={`${styles.size} ${styles.box}`}>
                                                    <p>Size</p>
                                                </div>
                                                <div className={`${styles.count} ${styles.box}`}>
                                                    <p>Count</p>
                                                </div>
                                                <div className={`${styles.price} ${styles.box}`}>
                                                    <p>Price</p>
                                                </div>
                                                <div className={`${styles.subtotal} ${styles.box}`}>
                                                    <p>Subtotal</p>
                                                </div>
                                            </div>
                                            {order?.products.map((product) => {
                                                return (
                                                    <div key={product.id} className={styles.invoiceMiddleRow}>
                                                        <div className={`${styles.id} ${styles.box}`}>
                                                            <p>{product?.id}</p>
                                                        </div>
                                                        <div className={`${styles.image} ${styles.box}`}>
                                                            <img src={product?.frontImage} alt="image" />
                                                        </div>
                                                        <div className={`${styles.name} ${styles.box}`}>
                                                            <Link to={`/details/${product?.id}`}>
                                                                <p>
                                                                    {product?.title}
                                                                </p>
                                                            </Link>
                                                        </div>
                                                        <div className={`${styles.size} ${styles.box}`}>
                                                            <p>{product?.size.join(",")}</p>
                                                        </div>
                                                        <div className={`${styles.count} ${styles.box}`}>
                                                            <p>{product?.count}</p>
                                                        </div>
                                                        <div className={`${styles.price} ${styles.box}`}>
                                                            <p>$ {product?.salePrice?.toFixed(2)}</p>
                                                        </div>
                                                        <div className={`${styles.subtotal} ${styles.box}`}>
                                                            <p>$ {(product?.salePrice * product?.count)?.toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className={styles.totalBox}>
                                        <p>TOTAL : $ {calculateOrderPrice(order)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </>
    )
}
