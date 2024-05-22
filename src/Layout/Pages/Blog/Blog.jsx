import React, {useCallback, useEffect, useState,useMemo} from 'react'
import styles from "./Blog.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PageHeading from '../../Common/PageHeading/PageHeading';
import {useTranslation} from "react-i18next";
import commentsMultiLang from "/public/data/CommentsData/commentsData.json"
import postsMultiLang from "/public/data/PopularPostsData/popularPosts.json"





const Blog = () => {
    const [postsData, setPostsData] = useState(null);
    const [postSearch, setPostSearch] = useState("");
    const [commentsData, setCommentsData] =useState(null);


    const {i18n} = useTranslation();

    const filteredPosts = useMemo(() => {
        return postsData?.filter(data => data.title.toLowerCase().includes(postSearch.toLowerCase()))
    },[postSearch,postsData]);

    const handlePostInput = useCallback((e) => {
        setPostSearch(e.target.value)
    },[setPostSearch]);


    const handleTranslateData = useCallback((selectedLang,currentData,setData) => {
        if (selectedLang === "en") {
            setData(currentData.en);
        } else if (selectedLang === "ru") {
            setData(currentData.ru);
        } else {
            setData(currentData.az);
        }
    }, []);




    useEffect(() => {
        handleTranslateData(i18n.language,postsMultiLang,setPostsData);
        handleTranslateData(i18n.language,commentsMultiLang,setCommentsData);
    }, [handleTranslateData, i18n.language,setCommentsData,commentsMultiLang,setPostsData,postsMultiLang]);


    return (
        <>
            <div className={styles.blogWrapper}>
                <Header/>
                <main className={styles.wrapperBlog}>
                    <PageHeading title="Blog"/>
                    <div className={styles.blogContainer}>
                        <div className={styles.blogLeft}>
                            <div className={styles.blogBox}>
                                <div className={styles.blogImage}>
                                    <img
                                        src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/blog-2.jpg'
                                        alt=''></img>
                                </div>
                                <div className={styles.blogText}>
                                    <p>FASHION, TRENDING</p>
                                    <h1>Perfect Pieces To Match Your Custom Tees</h1>
                                    <p>Nunc ut sem ut ex sollicitudin commodo. Suspendisse non enim felis. Nam nec diam
                                        ultricies, malesuada purus in, malesuada libero</p>
                                    <a href=''>READ MORE</a>

                                </div>
                            </div>
                            <div className={styles.blogBox}>
                                <div className={styles.blogImage}>
                                    <img
                                        src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/blog-14.jpg'
                                        alt=''></img>
                                </div>
                                <div className={styles.blogText}>
                                    <p>FASHION, MEN</p>
                                    <h1>The Do’s and Don’ts In Custom Shirt Design Printing</h1>
                                    <p>Nunc ut sem ut ex sollicitudin commodo. Suspendisse non enim felis. Nam nec diam
                                        ultricies, malesuada purus in, malesuada libero</p>
                                    <a href=''>READ MORE</a>

                                </div>
                            </div>
                            <div className={styles.blogBox}>
                                <div className={styles.blogImage}>
                                    <img
                                        src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/blog-6.jpg'
                                        alt=''></img>
                                </div>
                                <div className={styles.blogText}>
                                    <p>FASHION, TRENDING</p>
                                    <h1>Weekday Outfit Inspiration for All Occasions</h1>
                                    <p>Nunc ut sem ut ex sollicitudin commodo. Suspendisse non enim felis. Nam nec diam
                                        ultricies, malesuada purus in, malesuada libero</p>
                                    <a href=''>READ MORE</a>

                                </div>
                            </div>
                            <div className={styles.blogBox}>
                                <div className={styles.blogImage}>
                                    <img
                                        src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/blog-1.jpg'
                                        alt=''></img>
                                </div>
                                <div className={styles.blogText}>
                                    <p>FASHION, WOMEN</p>
                                    <h1>Your Summer is Incomplete Without These Dresses</h1>
                                    <p>Nunc ut sem ut ex sollicitudin commodo. Suspendisse non enim felis. Nam nec diam
                                        ultricies, malesuada purus in, malesuada libero</p>
                                    <a href=''>READ MORE</a>

                                </div>
                            </div>
                        </div>
                        <div className={styles.blogRight}>
                            <div className={styles.blogContact}>
                                <div className={styles.blogMinibox}>
                                    <div className={styles.blogInput}>
                                        <input type='text' placeholder='Search for products...'
                                               onChange={handlePostInput}
                                               value={postSearch}
                                        ></input>
                                    </div>
                                </div>
                                <div className={styles.blogMinibox}>
                                    <div className={styles.blogPopular}>
                                        <h3>Popular Posts</h3>
                                        {filteredPosts?.length > 0?
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
                                <div className={styles.blogMinibox}>
                                    <div className={styles.blogPopular}>
                                        <h3>Recent Comments</h3>
                                        {commentsData?.map((data) => {
                                            return (
                                                <div  key={data?.id} className={styles.popularBox}>
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
                                <div className={styles.blogMinibox}>
                                    <div className={styles.blogPopular}>
                                        <h3>Tags Post</h3>
                                        <div className={styles.popularBox}>
                                            <div className={styles.blogComments}>
                                                <div className={styles.commentsBox}>
                                                    <button>Dresses</button>
                                                    <button>Fashionita</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.popularBox}>
                                            <div className={styles.blogComments}>
                                                <div className={styles.commentsBox}>
                                                    <button>Fashion trend</button>
                                                    <button>Holiday Sale</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.popularBox}>
                                            <div className={styles.blogComments}>
                                                <div className={styles.commentsBox}>
                                                    <button>Kids</button>
                                                    <button>Men wear</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.popularBox}>
                                            <div className={styles.blogComments}>
                                                <div className={styles.commentsBox}>
                                                    <button>Sale off</button>
                                                    <button>Tips & tricks</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.popularBox}>
                                            <div className={styles.blogComments}>
                                                <div className={styles.commentsBox}>
                                                    <button>Tops</button>
                                                    <button>Women wear</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    )
}

export default Blog
