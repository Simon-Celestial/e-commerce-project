import styles from "./ProductDetails.module.scss";
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState, useContext } from "react";
import ProductCard from "../../Common/ProductCard/ProductCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import btnsDataEN from "/public/data/InfoBtnsData/infoBtnsDataEN.json";
import btnsDataRU from "/public/data/InfoBtnsData/infoBtnsDataRU.json";
import btnsDataAZ from "/public/data/InfoBtnsData/infoBtnsDataAZ.json";
import { DataContext } from "../../../Context/DataContext.jsx";
import { Loader } from "../../Common/Loader/Loader.jsx";
import { useParams } from "react-router-dom";
import {SingleProductCard} from "../../Common/SingleProductCard/SingleProductCard.jsx";
import { useTranslation } from "react-i18next";

export const ProductDetails = () => {

    const {
        productsData,
        productsLoading,
    } = useContext(DataContext);


   
    const {id} = useParams();


    const [slidesPerView, setSlidesPerView] = useState(4);
    const [activeButtonId, setActiveButtonId] = useState(1);
    const [btnsData,setBtnsData] = useState(null);
    const {i18n } = useTranslation();

    const handleFindLanguage = useCallback((current) => {
        if (current === "en") {
            setBtnsData(btnsDataEN);
        } else if (current === "ru") {
            setBtnsData(btnsDataRU);
        } else {
            setBtnsData(btnsDataAZ);
        }
    }, []);

    useEffect(() => {
        handleFindLanguage(i18n.language);
    }, [handleFindLanguage,i18n.language]);

    const handleResize = useCallback(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1368 && windowWidth > 1100) {
            setSlidesPerView(4);
        } else if (windowWidth <= 1100 && windowWidth > 840) {
            setSlidesPerView(3);

        } else if (windowWidth <= 840 && windowWidth > 550) {
            setSlidesPerView(2);


        } else if (windowWidth <= 550 && windowWidth > 0) {
            setSlidesPerView(1);

        } else {
            setSlidesPerView(4);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(()=> {
        window.scrollTo(0, 0);
    },[])

    const handleButtonClick = useCallback((id) => {
        setActiveButtonId(id);
    }, [setActiveButtonId]);


    return (
        <>
            {
                productsLoading ?
                    <Loader />
                    :
                    null
            }
            <Header />
            <main className={styles.pageWrapper}>
                <section className={styles.navSection}>
                    <div className={styles.heading}>
                        <Link to="/home">Home</Link>
                        <span>/</span>
                        <Link to="/shop">Shop</Link>
                        <span>/</span>
                        {productsData?.map((product) => {
                            if (product?.id === id) {
                                return (
                                    <p key={product.id}>{product.title}</p>
                                )
                            }
                        })}

                    </div>
                </section>
                <section className={styles.detailsSection}>
                    {productsData?.map((product) => {
                        if (product?.id === id) {
                            return (
                                <SingleProductCard key={product.id} product={product}/>
                            )
                        }
                    })}
                </section>
                <section className={styles.infoSection}>
                    <div className={styles.infoContent}>
                        <div className={styles.infoButtonsBlock}>
                            {btnsData?.map((button) => {
                                return (
                                    <div key={button.id}
                                        className={`${styles.infoButton} ${activeButtonId === button.id ? styles.buttonActive : ""}`}
                                        onClick={() => handleButtonClick(button.id)}>{button.title}</div>
                                )
                            })}
                        </div>
                        {activeButtonId === 1 ?
                            <div className={styles.content}>
                                <p>Crafted of our durable 100% polyester shell, this Kruser Ridge II Softshell Jacket is
                                    the
                                    perfect layering piece and first line of defense to combat the cold. It contains a
                                    modern classic fit with adjustable features that allow for comfortable movement and
                                    zippered side pockets to keep your small items (including your hands) secure. An
                                    added
                                    bonus is the warm collar that’s flexible so you can choose whether you want to wear
                                    it
                                    up or down, depending on your desired level of toastiness. Our plush softshell
                                    jacket is
                                    available in many accommodating sizes and colors as well. To ensure the size you
                                    choose
                                    is right, utilize our sizing chart and the following measurement instructions: For
                                    the
                                    sleeves, start at the center back of your neck and measure across the shoulder and
                                    down
                                    to the sleeve. If you come up with a partial number, round up to the next even
                                    number.
                                    For the chest, measure at the fullest part of the chest, under the armpits and over
                                    the
                                    shoulder blades, keeping the tape measure firm and level.</p>
                                <ul>
                                    <li>Stand out, stay warm</li>
                                    <li>Shawl collar</li>
                                    <li>Long sleeves</li>
                                    <li>Oversized fit</li>
                                </ul>


                            </div>
                            :
                            null
                        }
                        {activeButtonId === 2 ?
                            <div className={styles.content}>
                                <div className={styles.title}>
                                    WHITE GLOVE SERVICE
                                    <p>Items are delivered to your room of choice by appointment, then unpacked and
                                        fully
                                        assembled by a skilled two-person team. Includes packaging removal and recycling
                                        Fee
                                        varies by location and order total. (Doorstep delivery does not include
                                        assembly)</p>
                                </div>
                                <div className={styles.title}>
                                    FLAT RATE DELIVERY
                                    <p>An unlimited number of eligible furniture and select non-furniture items can be
                                        delivered for one flat rate per shipping address. Your order will ship when all
                                        items are ready for delivery. Fee varies by location and order total.</p>
                                </div>
                                <div className={styles.title}>
                                    RETURN POLICY
                                    <p>You can return eligible items within 30 days of receiving an order or 7 days for
                                        Quick Ship upholstery items for a refund of the merchandise value. Made-to-Order
                                        furniture is not eligible for returns.</p>
                                </div>

                            </div>
                            :
                            null
                        }
                        {activeButtonId === 3 ?
                            <div className={styles.content}>
                                <div className={styles.reviewBlock}>
                                    Customers Reviews
                                    <p>There are no reviews yet.</p>
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                </section>
                <section className={styles.relatedProductsSection}>
                    <div className={styles.relatedContent}>
                        <h1>Related Products</h1>
                        <div className={styles.productsContainer}>
                            <Swiper
                                slidesPerView={slidesPerView}
                                spaceBetween={0}
                                freeMode={true}
                                loop={true}
                            >
                                {productsData?.slice(4, 10).map((product) => {
                                    return (
                                        <SwiperSlide key={product.id}>
                                            <div className={styles.productCard}>
                                                <ProductCard product={product} />
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}