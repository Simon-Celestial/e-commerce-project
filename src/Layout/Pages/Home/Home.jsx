import styles from "./Home.module.scss";
import Header from '../../Components/Header/Header';
import Footer from "../../Components/Footer/Footer";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, EffectFade, Pagination} from 'swiper/modules';
import {CaretCircleDoubleRight} from "@phosphor-icons/react";
import {useState, useCallback, useEffect, useContext} from "react";
import ProductCard from "../../Common/ProductCard/ProductCard";
import Review from "../../Common/Review/Review";
import {Loader} from "../../Common/Loader/Loader.jsx";
import {DataContext} from "../../../Context/DataContext.jsx";
import {Timer} from "../../Common/Timer/Timer.jsx";
import {useTranslation} from "react-i18next";
import homeSliderDataRU from "/public/data/HomeSliderData/homeSliderDataRU.json";
import homeSliderDataAZ from "/public/data/HomeSliderData/homeSliderDataAZ.json";
import homeSliderDataEN from "/public/data/HomeSliderData/homeSliderDataEN.json";
import {Link} from "react-router-dom";


const Home = () => {
    const {
        productsLoading,
        productsData,
    } = useContext(DataContext);


    const [sliderData, setSliderData] = useState(null);

    const {t} = useTranslation();
    const {i18n} = useTranslation();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleFindLanguage = useCallback((current) => {
        if (current === "en") {
            setSliderData(homeSliderDataEN);
        } else if (current === "ru") {
            setSliderData(homeSliderDataRU);
        } else {
            setSliderData(homeSliderDataAZ);
        }
    }, []);

    useEffect(() => {
        handleFindLanguage(i18n.language);
    }, [handleFindLanguage, i18n.language]);


    return (
        <>
            {
                productsLoading ?
                    <Loader/>
                    :
                    null
            }

            <Header/>
            <main className={styles.homeWrapper}>
                {/* HOME SLIDER SECTION */}
                <section className={styles.homeSliderSection}>
                    <Swiper
                        slidesPerView={1}
                        direction={'horizontal'}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[EffectFade, Autoplay, Pagination]}
                        autoplay={{delay: 3000}}
                        style={{
                            "--swiper-pagination-color": "white",
                            "--swiper-pagination-bullet-inactive-color": "black",
                            "--swiper-pagination-bullet-inactive-opacity": "1",
                            "--swiper-pagination-bullet-size": "16px",
                            "--swiper-pagination-bullet-horizontal-gap": "6px",
                        }}
                    >
                        {sliderData?.map((data) => {
                            return (
                                <SwiperSlide key={data?.id}>
                                    <div className={`${styles.sliderCard} ${data?.id === 2 ? styles.titleBottom : ""}`}>
                                        <img className={styles.homeSliderBackground} src={data?.imageUrl}
                                             alt="Background"/>
                                        <div className={styles.cardTitle}>
                                            <div className={styles.arrivals}>{data?.arrivals}</div>
                                            <div className={styles.latest}>{data?.latest}</div>
                                            <div className={styles.shipping}>{data?.shipping}</div>
                                            <a className={styles.shop}>{data?.shop}</a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </section>
                {/* PRODUCTS SECTION */}
                <section className={styles.productsSection}>
                    <div className={styles.productsHeading}>
                        <div className={styles.productsContent}>
                            <div className={styles.productsHeadingTop}>
                                <a href="" className={styles.bestSeller}>{t('main.homePage.bestsellers')}</a>
                            </div>
                            <div className={styles.productsHeadingTop}>
                                <a href="" className={styles.bestSeller}>{t('main.homePage.newproduct')}</a>
                            </div>
                        </div>
                        <div className={styles.productsContent}>
                            <a className={styles.contentItem}
                               href="">{t('main.homePage.seeall')}<CaretCircleDoubleRight/></a>
                        </div>
                    </div>
                    <div className={styles.productsContainer}>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={0}
                            freeMode={true}
                            loop={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                600: {
                                    slidesPerView: 2,
                                },
                                850: {
                                    slidesPerView: 3,
                                },
                                1250: {
                                    slidesPerView: 4,
                                }
                            }}
                        >
                            {productsData?.slice(5, 10).map((product) => {
                                return (
                                    <SwiperSlide key={product.id}>
                                        <ProductCard product={product} tallSlide={false}/>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </section>
                {/* FASHION SECTION */}
                <section className={styles.fashionSection}>
                        <img src="https://754969b0.rocketcdn.me/clotya/wp-content/uploads/2022/05/slider-14.jpg"
                             alt="background"/>
                        <div className={styles.fashionContent}>
                            <p>{t('main.homePage.coatjackets')}</p>
                            <h2>{t('main.homePage.thenewfashion')} <br></br> {t('main.homePage.collection')}</h2>
                            <Link to={'/shop'}>{t('main.homePage.shopnow')}</Link>
                        </div>
                </section>
                {/* PRODUCTS SECTION */}
                <section className={styles.productsSection}>
                    <div className={styles.productsHeading}>
                        <div className={styles.productsContent}>
                            <div className={styles.productsHeadingTop}>
                                <a href="" className={styles.bestSeller}>{t('main.homePage.dealOfTheWeek')}</a>
                                <Timer/>
                            </div>
                        </div>
                        <div className={styles.productsContent}>
                            <a className={styles.contentItem} href="">{t('main.homePage.seeall')}
                                <CaretCircleDoubleRight/>
                            </a>
                        </div>
                    </div>
                    <div className={styles.productsContainer}>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={0}
                            freeMode={true}
                            loop={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                750: {
                                    slidesPerView: 2,
                                },
                                1200: {
                                    slidesPerView: 3,
                                },
                            }}

                        >
                            {productsData?.slice(4, 10).map((product) => {
                                return (
                                    <SwiperSlide key={product.id}>
                                        <ProductCard product={product} tallSlide={true} productId={product.id}/>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </section>
                {/* REVIEW SECTION */}
                <Review/>
                {/*SALE SECTION*/}
                <section className={styles.saleSection}>
                    <div className={styles.saleContent}>
                        <div className={styles.saleText}>
                            <p>{t('main.homePage.flashsale')}</p>
                            <span> - 80 % </span>
                            <h3>{t("main.homePage.whenYourBuy")} <br></br>
                                {t("main.homePage.ends")}</h3>
                            <Link to={'/shop'}>{t("main.homePage.shopnow")}</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>

    )
}

export default Home;
