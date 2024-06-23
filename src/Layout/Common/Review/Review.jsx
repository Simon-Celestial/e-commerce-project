import React, { useState, useCallback, useEffect } from 'react';
import styles from "./Review.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import reviewDataAZ from "/public/data/ReviewSliderData/reviewDataAZ";
import reviewDataRU from "/public/data/ReviewSliderData/reviewDataRU"
import reviewDataEN from "/public/data/ReviewSliderData/reviewDataEN"



import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';



const Review = () => {
    const [slidePerView, setSlidesPerView] = useState(2);
    const [reviewData, setReviewData] = useState(null);
    const {t} = useTranslation();
    const {i18n } = useTranslation();



    const handleResize = useCallback(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1200 && windowWidth > 0) {
            setSlidesPerView(1);
        }
        else {
            setSlidesPerView(2);
        }
    }, []);
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const handleFindLanguage = useCallback((current) => {
        if (current === "en") {
            setReviewData(reviewDataEN);
        } else if (current === "ru") {
            setReviewData(reviewDataRU);
        } else {
            setReviewData(reviewDataAZ);
        }
    }, []);

    useEffect(() => {
        handleFindLanguage(i18n.language);
    }, [handleFindLanguage,i18n.language]);


    return (
        <div>
            <section className={styles.review}>
                <div className={styles.ourReview}>
                    <h1>{t("main.review.reviewOURREVIEWS")}</h1>
                    <div className={styles.reviewSlider}>
                        <Swiper
                            slidesPerView={slidePerView}
                            spaceBetween={25}
                            freeMode={true}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            style={{
                                "--swiper-pagination-color": "black",
                                "--swiper-pagination-bullet-inactive-color": "gray",
                                "--swiper-pagination-bullet-inactive-opacity": "1",
                                "--swiper-pagination-bullet-size": "16px",
                                "--swiper-pagination-bullet-horizontal-gap": "6px",
                            }}
                        >
                            {reviewData?.map(item => (
                                <SwiperSlide key={item.id}>
                                    <div className={styles.cardWrapper}>
                                        <div className={styles.reviewSliderBox} >
                                            <div className={styles.reviewSliderLeft}>
                                                <img src={item.image} alt="Review" />
                                            </div>
                                            <div className={styles.reviewSliderRight}>
                                                <div className={styles.reviewStar}>
                                                    {[...Array(5)].map((_, index) => (
                                                        <i className="fa-solid fa-star" key={index}></i>
                                                    ))}
                                                </div>
                                                <div className={styles.reviewText}>
                                                    <p>{item.title}</p>
                                                    <a href="#">{item.name}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                        </Swiper>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default Review;
