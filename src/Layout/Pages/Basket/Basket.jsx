import {useCallback, useContext, useState} from 'react';
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

const SHIPPING_TYPES = [
    {
        id: 1,
        type: "Flat rate",
        price: 15,
    },
    {
        id: 2,
        type: "Local pickup",
        price: 5,
    }
];

export const Basket = () => {
    const {
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartItems,
        calculateSubtotal,
        emptyCart
    } = useContext(BasketContext);


    const {
        productsData
    } = useContext(DataContext);


    const [shippingTypeId, setShippingTypeId] = useState(1);

    const handleShippingPrice = useCallback((id) => {
        setShippingTypeId(id);
    }, [])


    return (
        <div className={styles.basketWrapper}>
            <Header/>
            <main className={styles.basketContainer}>
                <PageHeading title={"Shopping Cart"}></PageHeading>
                {
                    cartItems?.length < 1 ?
                        <div className={styles.cartEmpty}>
                            <img src="/images/emptyCart.png" alt="Cart Empty"/>
                            <p>Your cart is currently empty.</p>
                            <Link to="/shop">
                                Return to Shop
                            </Link>
                        </div>
                        :
                        <>
                            <div className={styles.basketContact}>
                                <div className={styles.basketCardsWrapper}>
                                    <div className={`${styles.tableRow} ${styles.topRow}`}>
                                        <div className={`${styles.product} ${styles.cell}`}>
                                            Product
                                        </div>
                                        <div className={`${styles.price} ${styles.cell}`}>
                                            Price
                                        </div>
                                        <div className={`${styles.quantity} ${styles.cell}`}>
                                            Quantity
                                        </div>
                                        <div className={`${styles.subtotal} ${styles.cell}`}>
                                            Subtotal
                                        </div>
                                        <div className={`${styles.delete} ${styles.cell}`}>
                                            Delete
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
                                                    <b>AZN {product.salePrice?.toFixed(2)}</b>
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
                                                    <b>AZN {(product.salePrice * product.count).toFixed(2)}</b>
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

                                    <div className={styles.emptyShop} onClick={emptyCart}>Empty cart</div>

                                </div>
                                <div className={styles.productContactRight}>
                                    <div className={styles.cartTotals}>
                                        <h1>CART TOTALS</h1>
                                        <div className={styles.subtotalPirce}>
                                            <h2>Subtotal</h2>
                                            <p>AZN {calculateSubtotal()?.toFixed(2)}</p>
                                        </div>
                                        <div className={styles.shippingBox}>
                                            <h2>Shipping</h2>
                                            <div className={styles.shippingCalulate}>
                                                {
                                                    SHIPPING_TYPES.map((type) => {
                                                        return (
                                                            <div key={type.id} className={styles.flatRate}>
                                                                <input
                                                                    type='checkbox'
                                                                    name="priceSelect"
                                                                    onChange={() => handleShippingPrice(type.id)}
                                                                    checked={type.id === shippingTypeId}
                                                                />
                                                                <label>{type.type}: {type.price.toFixed(2)} AZN</label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className={styles.flatText}>
                                                    <p>Shipping options will be updated during checkout.</p>
                                                </div>
                                                <div className={styles.flatTurck}>
                                                    <Truck size={20}/>
                                                    <p>Calculate shipping</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={styles.totalCart}>
                                            <h2>Total</h2>
                                            <p>AZN {(calculateSubtotal() + SHIPPING_TYPES?.find((
                                                {id}
                                            ) => id === shippingTypeId).price).toFixed(2)}</p>
                                        </div>
                                        <div className={styles.totalButton}>
                                            PROCEED TO CHECKOUT
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.basketPageSlider}>
                                <div className={styles.sliderContent}>
                                    <h2>YOU MAY BE INTERESTED IN…</h2>
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
        </div>
    );
};

