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
    const {t} = useTranslation();
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
                                <p>{t("main.details.productContentDetails")}</p>
                                <ul>
                                    <li>{t("main.details.productContentLi")}</li>
                                    <li>{t("main.details.productContentLii")}</li>
                                    <li>{t("main.details.productContentLiii")}</li>
                                    <li>{t("main.details.productContentLiiii")}</li>
                                </ul>


                            </div>
                            :
                            null
                        }
                        {activeButtonId === 2 ?
                            <div className={styles.content}>
                                <div className={styles.title}>
                                    {t("main.details.whiteGloveService")}
                                    <p>{t("main.details.ItemsOrderedItems")}</p>
                                </div>
                                <div className={styles.title}>
                                    {t("main.details.flatRateDelivery")}
                                    <p>{t("main.details.detailsAnUnlimited")}</p>
                                </div>
                                <div className={styles.title}>
                                    {t("main.details.detailsReturnPolicy")}
                                    <p>{t("main.details.detailsYourCanReturn")}</p>
                                </div>

                            </div>
                            :
                            null
                        }
                        {activeButtonId === 3 ?
                            <div className={styles.content}>
                                <div className={styles.reviewBlock}>
                                    {t("main.details.detailsCustomersReviews")}
                                    <p>{t("main.details.thereAreNoReviews")}</p>
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                </section>
                <section className={styles.relatedProductsSection}>
                    <div className={styles.relatedContent}>
                        <h1>{t("main.details.relatedProducts")}</h1>
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