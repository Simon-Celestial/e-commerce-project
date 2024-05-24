import styles from "./CompletedOrder.module.scss";
import {CheckCircle} from "@phosphor-icons/react";
import {Link} from "react-router-dom";

export const CompletedOrder = () => {

    return (

        <div className={styles.completedOrderWrapper}>
            <div className={styles.pageContent}>
                <h2>Your order has been received</h2>
                <CheckCircle weight="fill"/>
                <h3>Thank you for your purchase!</h3>
                <p>You will receive an order confirmation email with details of your order.</p>
                <p>If you have any questions, contact this number: <a href="tel:+994559020169">+994 55 902 01 69</a>
                </p>
                <Link to="/home">Return home</Link>
            </div>

        </div>
    )
}
