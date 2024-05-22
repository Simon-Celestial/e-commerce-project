import styles from "./Home.module.scss";
import Header from '../../Components/Header/Header';
import Footer from "../../Components/Footer/Footer";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, EffectFade, Pagination} from 'swiper/modules';
import {CaretDoubleRight} from "@phosphor-icons/react";
import {useState, useCallback, useEffect, useContext} from "react";
import ProductCard from "../../Common/ProductCard/ProductCard";
import Review from "../../Common/Review/Review";
import {Loader} from "../../Common/Loader/Loader.jsx";
import {DataContext} from "../../../Context/DataContext.jsx";
import {Timer} from "../../Common/Timer/Timer.jsx";
import homeSliderDataRU from "/public/data/HomeSliderData/homeSliderDataRU.json";
import homeSliderDataAZ from "/public/data/HomeSliderData/homeSliderDataAZ.json";
import homeSliderDataEN from "/public/data/HomeSliderData/homeSliderDataEN.json";
import {useTranslation} from "react-i18next";




const Home = () => {
    const {
        productsLoading,
        productsData,
    } = useContext(DataContext);


    const [slidesPerView, setSlidesPerView] = useState(5);
    const [dealSlidePerView, setDealSlidesPerView] = useState(3);

    const {i18n } = useTranslation();



    useEffect(() => {
        window.scrollTo(0, 0); 
      }, []);
    


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
            setSlidesPerView(5);
        }
    }, []);

    const handleResizeDeal = useCallback(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1150 && windowWidth > 800) {
            setDealSlidesPerView(2);
        } else if (windowWidth <= 800 && windowWidth > 0) {
            setDealSlidesPerView(1);
        } else {
            setDealSlidesPerView(3);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        window.addEventListener("resize", handleResizeDeal);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("resize", handleResizeDeal);
        };
    }, []);

    const [sliderData, setSliderData] = useState(null);

    const handleFindLanguage = useCallback((currentLang,setData) => {
        if (currentLang === "en") {
            setData(homeSliderDataEN);
        } else if (currentLang === "ru") {
            setData(homeSliderDataRU);
        } else {
            setData(homeSliderDataAZ);
        }
    }, []);

    useEffect(() => {
        handleFindLanguage(i18n.language,setSliderData);
    }, [handleFindLanguage,i18n.language,setSliderData]);

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
                            "--swiper-pagination-color": "black",
                            "--swiper-pagination-bullet-inactive-color": "gray",
                            "--swiper-pagination-bullet-inactive-opacity": "1",
                            "--swiper-pagination-bullet-size": "16px",
                            "--swiper-pagination-bullet-horizontal-gap": "6px",
                        }}
                    >
                        {sliderData?.map((data) => {
                            return (
                                <SwiperSlide key={data.id}>
                                    <div className={`${styles.sliderCard} ${data.id === 2 ? styles.titleBottom : ""}`}>
                                        <img className={styles.homeSliderBackground} src={data.imageUrl}
                                             alt="Background"/>
                                        <div className={styles.cardTitle}>
                                            <div className={styles.arrivals}>{data.arrivals}</div>
                                            <div className={styles.latest}>{data.latest}</div>
                                            <div className={styles.shipping}>{data.shipping}</div>
                                            <a className={styles.shop}>{data.shop}</a>
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
                        <div className={styles.productscontent}>
                            <div className={styles.productsHeadingtop}>
                                <a href="" className={styles.besTeller}>BESTSELLERS</a>
                            </div>
                            <div className={styles.productsHeadingtop}>
                                <a href="">NEW PRODUCTS</a>
                            </div>
                        </div>
                        <div className={styles.productscontent}>
                            <a className={styles.productscontentsee} href="">See All <CaretDoubleRight
                                fontSize={"15px"}/></a>
                        </div>
                    </div>
                    <div className={styles.productsContainer}>
                        <Swiper
                            slidesPerView={slidesPerView}
                            spaceBetween={0}
                            freeMode={true}
                            loop={true}
                        >
                            {productsData?.slice(0, 6).map((product) => {
                                return (
                                    <SwiperSlide key={product.id}>
                                        <ProductCard product={product} tallSlide={false}/>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </section>

                {/* COAT SECTION */}
                <section>
                    <div className={styles.coat}>
                        <div className={styles.coatContent}>
                            <p>COAT & JACKETS</p>
                            <h2>The New Fashion <br></br> Collection</h2>
                            <a href="">SHOP NOW</a>
                        </div>
                    </div>
                </section>

                {/* PRODUCTS SECTION */}
                <section className={styles.productsSection}>
                    <div className={styles.productsHeading}>
                        <div className={styles.productscontent}>
                            <div className={styles.productsHeadingtop}>
                                <a href="" className={styles.besTeller}>DEAL OF THE WEEK</a>
                                <Timer />
                            </div>
                        </div>
                        <div className={styles.productscontent}>
                            <a className={styles.productscontentsee} href="">See All <CaretDoubleRight
                                fontSize={"15px"}/></a>
                        </div>
                    </div>
                    <div className={styles.productsContainer}>
                        <Swiper
                            slidesPerView={dealSlidePerView}
                            spaceBetween={0}
                            freeMode={true}
                            loop={true}
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

                {/* PRODUCTS Review */}
                <section>
                    <Review/>
                </section>

                <section className={styles.saleShop}>
                    <div className={styles.saleShopbox}>
                        <div className={styles.saleText}>
                            <p>FLASH SALE</p>
                            <span> - 80 % </span>
                            <h3>When You Buy $100 E-Gift Cards <br></br>
                                ENDS 22-1-2023</h3>
                            <a href="">SHOP NOW</a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>

    )
}

export default Home
