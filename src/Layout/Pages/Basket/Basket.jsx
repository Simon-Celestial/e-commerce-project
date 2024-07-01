import {useContext} from 'react';
import styles from "./Basket.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PageHeading from '../../Common/PageHeading/PageHeading';
import {Trash} from "@phosphor-icons/react";
import {Link} from 'react-router-dom';
import {BasketContext} from '../../../Context/BasketContext';
import {DataContext} from '../../../Context/DataContext.jsx';
import {Truck} from "@phosphor-icons/react";
import ProductCard from "../../Common/ProductCard/ProductCard.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {useTranslation} from "react-i18next";
import SHIPPING_TYPES from "/public/data/ShippingData/shippingData.json";
import {ShippingPrice} from '../../Common/ShippingPrice/ShippingPrice.jsx';


export const Basket = () => {
    const {t} = useTranslation();
    const {
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartItems,
        calculateSubtotal,
        emptyCart,
        shippingTypeId
    } = useContext(BasketContext);


    const {
        productsData,
        currencyConverter,
        currencyState

    } = useContext(DataContext);


    return (
        <>
            <Header/>
            <main className={styles.basketContainer}>
                <PageHeading title={t("main.basket.basketShoppingCart")}></PageHeading>
                {
                    cartItems?.length < 1 ?
                        <div className={styles.cartEmpty}>
                            <img src="/images/emptyCart.png" alt="Cart Empty"/>
                            <p>{t("main.basket.basketYourCart")}</p>
                            <Link to="/shop">
                                {t("main.basket.basketReturnToShop")}
                            </Link>
                        </div>
                        :
                        <>
                            <div className={styles.basketProducts}>
                                <div className={styles.basketCardsWrapper}>
                                    <div className={`${styles.tableRow} ${styles.topRow}`}>
                                        <div className={`${styles.product} ${styles.cell}`}>
                                            {t("main.basket.basketProduct")}
                                        </div>
                                        <div className={`${styles.price} ${styles.cell}`}>
                                            {t("main.basket.basketPrice")}
                                        </div>
                                        <div className={`${styles.quantity} ${styles.cell}`}>
                                            {t("main.basket.basketQuantity")}
                                        </div>
                                        <div className={`${styles.subtotal} ${styles.cell}`}>
                                            {t("main.basket.basketSubtotal")}
                                        </div>
                                        <div className={`${styles.delete} ${styles.cell}`}>
                                            {t("main.basket.basketDelete")}
                                        </div>
                                    </div>
                                    {cartItems?.map((product) => {
                                        return (
                                            <div key={product.id} className={`${styles.tableRow} ${styles.bottomRow}`}>
                                                <div className={`${styles.product} ${styles.cell}`}>
                                                    <img src={product.frontImage} alt="Fashion Clothes"/>
                                                    <Link to={`/details/${product?.id}`}>
                                                        {product.title}
                                                    </Link>
                                                </div>
                                                <div className={`${styles.price} ${styles.cell}`}>
                                                    <b>{currencyState === "azn" ? "AZN" : "$"} {currencyConverter(product.salePrice)?.toFixed(2)}</b>
                                                </div>
                                                <div className={`${styles.quantity} ${styles.cell}`}>
                                                    <div className={styles.basketButton}>
                                                        <div className={styles.controlBtn}
                                                             onClick={() => decreaseQuantity(product.id)}>
                                                            -
                                                        </div>
                                                        <div className={styles.controlBtn}>
                                                            {product.count}
                                                        </div>
                                                        <div className={styles.controlBtn}
                                                             onClick={() => increaseQuantity(product.id)}>
                                                            +
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className={`${styles.subtotal} ${styles.cell}`}>
                                                    <b>{currencyState === "azn" ? "AZN" : "$"} {(currencyConverter(product.salePrice) * product.count).toFixed(2)}</b>
                                                </div>
                                                <div className={`${styles.delete} ${styles.cell}`}>
                                                    <div className={styles.deleteBtn}
                                                         onClick={() => removeFromCart(product.id)}>
                                                        <Trash/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <div className={styles.emptyShop}
                                         onClick={emptyCart}>{t("main.basket.basketEmptyCart")}</div>

                                </div>
                                <div className={styles.productContactRight}>
                                    <div className={styles.cartTotals}>
                                        <h1>{t("main.basket.basketCartTotals")}</h1>
                                        <div className={styles.subtotalPirce}>
                                            <h2>{t("main.basket.basketSubtotal")}</h2>
                                            <p>{currencyState === "azn" ? "AZN" : "$"} {currencyConverter(calculateSubtotal)?.toFixed(2)}</p>
                                        </div>
                                        <div className={styles.shippingBox}>
                                            <h2>Shipping</h2>
                                            <div className={styles.shippingCalulate}>
                                                <ShippingPrice/>
                                                <div className={styles.flatText}>
                                                    <p>{t("main.basket.ShippingOptions")}</p>
                                                </div>
                                                <div className={styles.flatTurck}>
                                                    <Truck size={20}/>
                                                    <p>{t("main.basket.basketCalculate")}</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={styles.totalCart}>
                                            <h2>{t("main.basket.basketTotal")}</h2>
                                            <p>{currencyState === "azn" ? "AZN" : "$"} {
                                                currencyState === "azn"
                                                    ?
                                                    (currencyConverter(calculateSubtotal) + SHIPPING_TYPES.en?.find(({id}) => id === shippingTypeId)?.price * 1.7)?.toFixed(2)
                                                    :
                                                    (currencyConverter(calculateSubtotal) + SHIPPING_TYPES.en?.find(({id}) => id === shippingTypeId)?.price)?.toFixed(2)
                                            }
                                            </p>
                                        </div>
                                        <Link to={"/checkout"} className={styles.totalButton}>
                                            {t("main.basket.basketProceed")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.basketPageSlider}>
                                <div className={styles.sliderContent}>
                                    <h2>{t("main.basket.YourMay")}</h2>
                                    <div className={styles.sliderProducts}>
                                        <Swiper
                                            slidesPerView={4}
                                            breakpoints={{
                                                1100: {
                                                    slidesPerView: 4,
                                                },
                                                840: {
                                                    slidesPerView: 3,
                                                },
                                                550: {
                                                    slidesPerView: 2,
                                                },
                                                0: {
                                                    slidesPerView: 1,
                                                },
                                            }}
                                            spaceBetween={0}
                                            freeMode={true}
                                            loop={true}
                                        >
                                            {productsData?.slice(5, 12).map((product) => {
                                                return (
                                                    <SwiperSlide key={product.id}>
                                                        <div className={styles.cardOfProduct}>
                                                            <ProductCard product={product}/>
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            })}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </main>
            <Footer/>
        </>
    );
};

