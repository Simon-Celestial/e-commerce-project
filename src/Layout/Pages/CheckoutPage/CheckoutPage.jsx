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
    const {t} = useTranslation();

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
    }, []);

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
                await axios.post("https://json-server-eta-ten.vercel.app/products/", requestData);
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
                        <p>{t("main.checkout.checkoutYourBasket")}</p>
                        <p>{t("main.checkout.checkoutChooseProducts")}</p>
                        <Link to="/shop">
                            {t("main.checkout.checkoutReturnShop")}
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
                                            <h3>{t("main.checkout.billingDetails")}</h3>
                                            <div className={styles.formRow}>
                                                <div className={styles.formShortBlock}>
                                                    <p>
                                                        {t("main.checkout.checkoutFristName")}<span>*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        value={formFields.firstName}
                                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                    />
                                                </div>
                                                <div className={styles.formShortBlock}>
                                                    <p>
                                                        {t("main.checkout.checkoutLastName")}<span>*</span>
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
                                                    <p>{t("main.checkout.checkoutCompanyName")}</p>
                                                    <input
                                                        type="text"
                                                        value={formFields.companyName}
                                                        onChange={(e) => handleInputChange('companyName', e.target.value)}

                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.formRow}>
                                                <div className={styles.formLongBlock}>
                                                    <p>{t("main.checkout.checkoutPhoneNumber")} <b style={{
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
                                                        {t("main.checkout.checkoutDistrictArea")}<span>*</span>
                                                    </p>
                                                    <select
                                                        name="area"
                                                        value={formFields.districtArea}
                                                        onChange={(e) => handleInputChange('districtArea', e.target.value)}
                                                    >
                                                        <option value="">{t("main.checkout.checkoutSelectDistrictArea")}</option>
                                                        <option value="Binagadi">{t("main.checkout.checkoutBinagadi")}</option>
                                                        <option value="Yasamal">{t("main.checkout.checkoutYasamal")}</option>
                                                        <option value="Khatai">{t("main.checkout.checkoutKhatai")}</option>
                                                        <option value="Nasimi">{t("main.checkout.checkoutNasimi")}</option>
                                                        <option value="Narimanov">{t("main.checkout.checkoutNarimanov")}</option>
                                                        <option value="Nizami">{t("main.checkout.checkoutNizami")}</option>
                                                        <option value="Khazar">{t("main.checkout.checkoutKhazar")}</option>
                                                        <option value="Sabayel">{t("main.checkout.checkoutSabayel")}</option>
                                                        <option value="Sabunchu">{t("main.checkout.checkoutSabunchu")}</option>
                                                        <option value="Surakhny">{t("main.checkout.checkoutSurakhny")}</option>
                                                        <option value="Garadagh">{t("main.checkout.checkoutGaradagh")}</option>
                                                        <option value="Pirallahi">{t("main.checkout.checkoutPirallahi")}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={styles.formRow}>
                                                <div className={styles.formLongBlock}>
                                                    <p>
                                                        {t("main.checkout.checkoutStreetAddress")}<span>*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        placeholder= {t("main.checkout.checkoutExample")}
                                                        value={formFields.streetAddress}
                                                        onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.formRow}>
                                                <div className={styles.formLongBlock}>
                                                    <p>{t("main.checkout.checkoutPostCode")}</p>
                                                    <input
                                                        type="text"
                                                        placeholder="AZXXXX"
                                                        value={formFields.postCode}
                                                        onChange={(e) => handleInputChange('postCode', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.additionalInfo}>
                                                <h3>{t("main.checkout.checkoutAdditionalInformation")}</h3>
                                                <label htmlFor="info">
                                                   {t("main.checkout.checkoutOrderNotes")}<textarea
                                                    name="info"
                                                    id="info"
                                                    placeholder= {t("main.checkout.checkoutNotesAbout")}
                                                    value={formFields.description}
                                                    onChange={(e) => handleInputChange('description', e.target.value)}

                                                ></textarea>
                                                </label>
                                            </div>
                                        </div>
                                        {/* RIGHT */}
                                        <div className={styles.checkoutRight}>
                                            <div className={styles.orderContainer}>
                                                <h3>{t("main.checkout.checkoutYourOrder")}</h3>
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
                                                    <p>{t("main.checkout.checkoutSubtotal")}</p>
                                                    <p>{currencyState === "azn" ? "AZN" : "$"} {currencyConverter(calculateSubtotal)?.toFixed(2)}</p>
                                                </div>
                                                <div
                                                    className={styles.orderRow}
                                                    style={{borderColor: 'transparent', color: '#EC3D08'}}
                                                >
                                                    <p style={{
                                                        color: "red"
                                                    }}>{t("main.checkout.checkoutTotal")}</p>
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
                                                <h3 className={styles.payment}>{t("main.checkout.checkoutShippingPayment")}</h3>
                                                <div className={styles.paymentTypeRow}>
                                                    <b>{t("main.checkout.checkoutSelectPaymentMethod")}</b>
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
                                                    <b>{t("main.checkout.checkoutSelectShippingMethod")}</b>
                                                    <ShippingPrice/>

                                                </div>

                                                <div className={styles.paymentPrivacyPolicy}>
                                                    <p>
                                                       {t("main.checkout.checkoutYourPersonal")}{' '}
                                                        <a style={{
                                                            color: "gray",
                                                            textDecoration: "underline"
                                                        }}
                                                           href="#"
                                                           className="woocommerce-privacy-policy-link"
                                                           target="_blank"
                                                           rel="noopener noreferrer"
                                                        >
                                                           {t("main.checkout.checkoutPrivacyPolicy")}
                                                        </a>
                                                        .
                                                    </p>
                                                    {/* PLACE ORDER BUTTON */}
                                                    <button onClick={handlePostOrder}>{t("main.checkout.checkoutPlaceOrder")}</button>
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
