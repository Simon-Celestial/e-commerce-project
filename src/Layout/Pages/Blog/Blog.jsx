import {useCallback, useEffect, useMemo, useState} from 'react'
import styles from "./Blog.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PageHeading from '../../Common/PageHeading/PageHeading';
import {useTranslation} from "react-i18next";
import commentsMultiLang from "/public/data/CommentsData/commentsData.json";
import postsMultiLang from "/public/data/PopularPostsData/popularPosts.json";
import blogDataMultiLang from "/public/data/BlogData/blogData.json";


const Blog = () => {
    const [postsData, setPostsData] = useState(null);
    const [postSearch, setPostSearch] = useState("");
    const [commentsData, setCommentsData] = useState(null);
    const [blogData, setBlogData] = useState(null);

    const {t} = useTranslation();
    const {i18n} = useTranslation();


    const filteredPosts = useMemo(() => {
        return postsData?.filter(data => data.title.toLowerCase().includes(postSearch.toLowerCase()))
    }, [postSearch, postsData]);

    const handlePostInput = useCallback((e) => {
        setPostSearch(e.target.value)
    }, [setPostSearch]);


    const handleTranslateData = useCallback((selectedLang, currentData, setData) => {
        if (selectedLang === "en") {
            setData(currentData.en);
        } else if (selectedLang === "ru") {
            setData(currentData.ru);
        } else {
            setData(currentData.az);
        }
    }, []);

    useEffect(() => {
        handleTranslateData(i18n.language, postsMultiLang, setPostsData);
        handleTranslateData(i18n.language, commentsMultiLang, setCommentsData);
        handleTranslateData(i18n.language, blogDataMultiLang,setBlogData)
    }, [handleTranslateData, i18n.language, setCommentsData, commentsMultiLang, setPostsData, postsMultiLang,blogDataMultiLang,setBlogData]);


    return (
        <>
            <Header/>
            <main className={styles.blogMain}>
                <PageHeading title={t("main.blog.blogBlog")}/>
                <div className={styles.blogContent}>
                    <div className={styles.blogLeft}>
                        {blogData?.map((blog)=> {
                            return (
                                <div key={blog?.id} className={styles.blogBox}>
                                    <div className={styles.blogImage}>
                                        <img
                                            src={blog?.image}
                                            alt="Blog Image"></img>
                                    </div>
                                    <div className={styles.blogText}>
                                        <b>{blog?.trending.join(", ")}</b>
                                        <h1>{blog?.name}</h1>
                                        <p>{blog?.content}</p>
                                        <a href=''>{t("main.blog.readMore")}</a>

                                    </div>
                                </div>

                            )
                        })}
                    </div>
                    <div className={styles.blogRight}>
                        <div className={styles.blogContact}>
                            <div className={styles.blogMiniBox}>
                                <div className={styles.blogInput}>
                                    <input
                                        type='text'
                                        placeholder={t("main.search.searchProduct")}
                                        onChange={handlePostInput}
                                        value={postSearch}/>
                                </div>
                            </div>
                            <div className={styles.blogMiniBox}>
                                <div className={styles.blogPopular}>
                                    <h3>{t("main.blog.popularPosts")}</h3>
                                    {filteredPosts?.length > 0 ?
                                        filteredPosts?.map((post) => {
                                            return (
                                                <div key={post?.id} className={styles.popularBox}>
                                                    <img
                                                        src={post?.image}
                                                        alt='Post Image'></img>
                                                    <p>{post?.title}</p>
                                                </div>
                                            )
                                        })
                                        :
                                        <p style={{
                                            fontSize: "20px",
                                            fontWeight: "500",
                                            marginTop: "20px"
                                        }}>No post found...</p>
                                    }
                                </div>
                            </div>
                            <div className={styles.blogMiniBox}>
                                <div className={styles.blogPopular}>
                                    <h3>{t("main.blog.recentComments")}</h3>
                                    {commentsData?.map((data) => {
                                        return (
                                            <div key={data?.id} className={styles.popularBox}>
                                                <div className={styles.blogComments}>
                                                    <p style={{
                                                        fontSize: "15px"
                                                    }}>{data?.comment}</p>
                                                    <span>{data?.date}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={styles.blogMiniBox}>
                                <div className={styles.blogPopular}>
                                    <h3>{t("main.blog.tagsPost")}</h3>
                                    <div className={styles.tagsBox}>
                                        <span>{t("main.blog.blogDresses")}</span>
                                        <span>{t("main.blog.blogFashionita")}</span>
                                        <span>{t("main.blog.blogFashionTrend")}</span>
                                        <span>{t("main.blog.blogHolidaySale")}</span>
                                        <span>{t("main.blog.blogKids")}</span>
                                        <span>{t("main.blog.blogMenWear")}</span>
                                        <span>{t("main.blog.saleOff")}</span>
                                        <span>{t("main.blog.blogTipsTricks")}</span>
                                        <span>{t("main.blog.blogTops")}</span>
                                        <span>{t("main.blog.blogWomenWear")}</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Blog
