import {useCallback, useContext, useMemo, useState} from 'react';
import styles from './CheckoutPage.module.scss';
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import {BasketContext} from "../../../Context/BasketContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {ShippingPrice} from "../../Common/ShippingPrice/ShippingPrice.jsx";
import {DataContext} from "../../../Context/DataContext.jsx";
import SHIPPING_TYPES from "/public/data/ShippingData/shippingData.json";
import {Bounce, toast} from "react-toastify";
import axios from "axios";
import PAYMENT_DATA from "/public/data/PaymentData/PaymentData.json";
import {useTranslation} from "react-i18next";


const defaults = {
    id: null,
    firstName: '',
    lastName: '',
    districtArea: '',
    streetAddress: '',
    phoneNumber: '',
    status: 'pending',
    description: '',
    companyName: '',
    postCode: '',
    shippingMethod:"",
    paymentType: 0,
    products:[],
    addedAt: null
}

export const CheckoutPage = () => {
    const {
        cartItems,
        calculateSubtotal,
        shippingTypeId,
        emptyCart
    } = useContext(BasketContext);

    const {
        currencyConverter,
        currencyState
    } = useContext(DataContext);

    const [shouldUpdate, setShouldUpdate] = useState(Date.now());
    const [orderLoading, setOrderLoading] = useState(false);
    const [formFields, setFormFields] = useState(defaults);
    const [payment,setPayment] = useState(1);

    const {i18n} = useTranslation();


    const translatedData = useMemo(() => {
        if (i18n.language === "en") {
            return PAYMENT_DATA.en;
        } else if (i18n.language === "ru") {
            return PAYMENT_DATA.ru;
        } else {
            return PAYMENT_DATA.az;
        }
    }, [i18n.language]);

    const handlePaymentMethod = useCallback((e) => {
        setPayment(e.target.value);
    }, [setPayment]);
    const update = useCallback(() => {
        setShouldUpdate(Date.now())
    }, [])
    const navigate = useNavigate();
    const handleInputChange = useCallback((field, value) => {
        setFormFields((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, [setFormFields]);
    const handlePostOrder = useCallback(async () => {
        const requestData = {
            firstName: formFields?.firstName.trim(),
            lastName: formFields?.lastName.trim(),
            districtArea: formFields?.districtArea,
            streetAddress: formFields?.streetAddress.trim(),
            phoneNumber: formFields?.phoneNumber.trim(),
            status: formFields?.status,
            description: formFields?.description.trim(),
            companyName: formFields?.companyName.trim(),
            postCode: formFields?.postCode.trim(),
            products: [...cartItems],
            shippingMethod: shippingTypeId === 1 ? "delivery" : "pickup",
            paymentType: payment === 1 ? "cash" : "card",
            addedAt: new Date().toLocaleString()
        };

        if (
            !requestData.firstName ||
            !requestData.lastName ||
            !requestData.districtArea ||
            !requestData.streetAddress
        ) {
            toast.error('Bütün tələb olunan sahələri duzgun doldurun', {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
        }
        else if (!/^\+994\d{9}$/.test(requestData.phoneNumber)) {
            toast.error('Nömrəni "+994XXXXXXXXX" formatında daxil edin', {
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
                setOrderLoading(true);
                await axios.post("http://localhost:8000/orders/", requestData);
                setFormFields(defaults);
                emptyCart();
                update();
                navigate("/order-completed");
            } catch (error) {
                toast.error('Məhsul əlavə edərkən xəta baş verdi', {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    transition: Bounce,
                });
                console.log(error);
            } finally {
                setOrderLoading(false);
            }
        }
    }, [formFields, setOrderLoading, update, navigate, emptyCart, defaults]);
    return (
        <>
            <Header/>
            {
                cartItems.length < 1 ?
                    <div className={styles.checkoutEmpty}>
                        <img src="/images/emptyCart.png" alt="Cart Empty"/>
                        <p>Your basket is empty</p>
                        <p>Choose products you want to buy</p>
                        <Link to="/shop">
                            Return to Shop
                        </Link>
                    </div>
                    :
                    <div className={styles.checkoutPageWrapper}>
                        <section className={styles.checkoutSection}>
                            <div className={styles.checkoutContent}>
                                <div className={styles.checkoutMain}>
                                    <div className={styles.checkoutForm}>
                                        {/* LEFT */}
                                        <div className={styles.checkoutLeft}>
                                            <h3>Billing Details</h3>
                                            <div className={styles.formRow}>
                                                <div className={styles.formShortBlock}>
                                                    <p>
                                                        First Name<span>*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        value={formFields.firstName}
                                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                    />
                                                </div>
                                                <div className={styles.formShortBlock}>
                                                    <p>
                                                        Last Name<span>*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        value={formFields.lastName}
                                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.formRow}>
                                                <div className={styles.formLongBlock}>
                                                    <p>Company name (Optional)</p>
                                                    <input
                                                        type="text"
                                                        value={formFields.companyName}
                                                        onChange={(e) => handleInputChange('companyName', e.target.value)}

                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.formRow}>
                                                <div className={styles.formLongBlock}>
                                                    <p>Phone number <b style={{
                                                        color: "red"
                                                    }}>*</b></p>
                                                    <input
                                                        type="tel"
                                                        placeholder="+994XXXXXXXX"
                                                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                                        value={formFields.phoneNumber}
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.formRow}>
                                                <div className={styles.formLongBlock}>
                                                    <p>
                                                        District / Area<span>*</span>
                                                    </p>
                                                    <select
                                                        name="area"
                                                        value={formFields.districtArea}
                                                        onChange={(e) => handleInputChange('districtArea', e.target.value)}
                                                    >
                                                        <option value="">Select a district/area</option>
                                                        <option value="Binagadi">Binagadi</option>
                                                        <option value="Yasamal">Yasamal</option>
                                                        <option value="Khatai">Khatai</option>
                                                        <option value="Nasimi">Nasimi</option>
                                                        <option value="Narimanov">Narimanov</option>
                                                        <option value="Nizami">Nizami</option>
                                                        <option value="Khazar">Khazar</option>
                                                        <option value="Sabayel">Sabayel</option>
                                                        <option value="Sabunchu">Sabunchu</option>
                                                        <option value="Surakhny">Surakhny</option>
                                                        <option value="Garadagh">Garadagh</option>
                                                        <option value="Pirallahi">Pirallahi</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={styles.formRow}>
                                                <div className={styles.formLongBlock}>
                                                    <p>
                                                        Street Address<span>*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        placeholder="Example (Dilara Aliyeva str.237 app.26)"
                                                        value={formFields.streetAddress}
                                                        onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.formRow}>
                                                <div className={styles.formLongBlock}>
                                                    <p>Post Code (Optional)</p>
                                                    <input
                                                        type="text"
                                                        placeholder="AZXXXX"
                                                        value={formFields.postCode}
                                                        onChange={(e) => handleInputChange('postCode', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.additionalInfo}>
                                                <h3>Additional information</h3>
                                                <label htmlFor="info">
                                                    Order Notes (Optional)<textarea
                                                    name="info"
                                                    id="info"
                                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                                    value={formFields.description}
                                                    onChange={(e) => handleInputChange('description', e.target.value)}

                                                ></textarea>
                                                </label>
                                            </div>
                                        </div>
                                        {/* RIGHT */}
                                        <div className={styles.checkoutRight}>
                                            <div className={styles.orderContainer}>
                                                <h3>Your Order</h3>
                                                {/* TOTAL AND SUBTOTAL PRICE HERE */}
                                                {cartItems?.map((cartProduct) => {
                                                    return (
                                                        <div key={cartProduct.id} className={styles.orderRow}>
                                                            <p>{cartProduct.title} <span> × {cartProduct?.count}</span>
                                                            </p>
                                                            <p>{currencyState === "azn" ? "AZN" : "$"} {currencyConverter(cartProduct?.salePrice * cartProduct?.count)?.toFixed(2)}</p>
                                                        </div>

                                                    )
                                                })}
                                                <div className={styles.orderRow}>
                                                    <p>Subtotal</p>
                                                    <p>{currencyState === "azn" ? "AZN" : "$"} {currencyConverter(calculateSubtotal)?.toFixed(2)}</p>
                                                </div>
                                                <div
                                                    className={styles.orderRow}
                                                    style={{borderColor: 'transparent', color: '#EC3D08'}}
                                                >
                                                    <p style={{
                                                        color: "red"
                                                    }}>Total</p>
                                                    <p>{currencyState === "azn" ? "AZN" : "$"} {
                                                        currencyState === "azn"
                                                            ?
                                                            (currencyConverter(calculateSubtotal) + SHIPPING_TYPES.en?.find(({id}) => id === shippingTypeId)?.price * 1.7)?.toFixed(2)
                                                            :
                                                            (currencyConverter(calculateSubtotal) + SHIPPING_TYPES.en?.find(({id}) => id === shippingTypeId)?.price)?.toFixed(2)
                                                    }</p>
                                                </div>
                                            </div>
                                            <div className={styles.paymentContainer}>
                                                <h3 className={styles.payment}>Shipping & Payment</h3>
                                                <div className={styles.paymentTypeRow}>
                                                    <b>Select payment method</b>
                                                    {translatedData?.map((paymentMethod) => {
                                                        return (
                                                            <div key={paymentMethod.id} className={styles.paymentTypeItem}>
                                                                <input
                                                                    type="radio"
                                                                    id={paymentMethod.id}
                                                                    name="payment"
                                                                    value={paymentMethod.id}
                                                                    checked={payment == paymentMethod.id}
                                                                    onChange={handlePaymentMethod}
                                                                />
                                                                <p>{paymentMethod?.type}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className={styles.paymentTypeRow}>
                                                    <b>Select shipping method</b>
                                                    <ShippingPrice/>

                                                </div>

                                                <div className={styles.paymentPrivacyPolicy}>
                                                    <p>
                                                        Your personal data will be used to process your order, support
                                                        your
                                                        experience throughout this website, and for other purposes
                                                        described in
                                                        our{' '}
                                                        <a style={{
                                                            color: "gray",
                                                            textDecoration: "underline"
                                                        }}
                                                           href="#"
                                                           className="woocommerce-privacy-policy-link"
                                                           target="_blank"
                                                           rel="noopener noreferrer"
                                                        >
                                                            privacy policy
                                                        </a>
                                                        .
                                                    </p>
                                                    {/* PLACE ORDER BUTTON */}
                                                    <button onClick={handlePostOrder}>Place Order</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

            }
            <Footer/>
        </>
    );
};
