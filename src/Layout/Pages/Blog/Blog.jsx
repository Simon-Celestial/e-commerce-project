import React from 'react'
import styles from "./Blog.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PageHeading from '../../Common/PageHeading/PageHeading';

const Blog = () => {
    return (
        <>
            <div className={styles.blogWrapper}>
                <Header />
                <main className={styles.wrapperBlog}>
                    <PageHeading title="Blog" />
                    <div className={styles.blogContainer}>
                        <div className={styles.blogLeft}>
                            <div className={styles.blogBox}>
                                <div className={styles.blogImage}>
                                    <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/blog-2.jpg' alt=''></img>
                                </div>
                                <div className={styles.blogText}>
                                    <p>FASHION, TRENDING</p>
                                    <h1>Perfect Pieces To Match Your Custom Tees</h1>
                                    <p>Nunc ut sem ut ex sollicitudin commodo. Suspendisse non enim felis. Nam nec diam ultricies, malesuada purus in, malesuada libero</p>
                                    <a href=''>READ MORE</a>

                                </div>
                            </div>
                            <div className={styles.blogBox}>
                                <div className={styles.blogImage}>
                                    <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/blog-14.jpg' alt=''></img>
                                </div>
                                <div className={styles.blogText}>
                                    <p>FASHION, MEN</p>
                                    <h1>The Do’s and Don’ts In Custom Shirt Design Printing</h1>
                                    <p>Nunc ut sem ut ex sollicitudin commodo. Suspendisse non enim felis. Nam nec diam ultricies, malesuada purus in, malesuada libero</p>
                                    <a href=''>READ MORE</a>

                                </div>
                            </div>
                            <div className={styles.blogBox}>
                                <div className={styles.blogImage}>
                                    <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/blog-6.jpg' alt=''></img>
                                </div>
                                <div className={styles.blogText}>
                                    <p>FASHION, TRENDING</p>
                                    <h1>Weekday Outfit Inspiration for All Occasions</h1>
                                    <p>Nunc ut sem ut ex sollicitudin commodo. Suspendisse non enim felis. Nam nec diam ultricies, malesuada purus in, malesuada libero</p>
                                    <a href=''>READ MORE</a>

                                </div>
                            </div>
                            <div className={styles.blogBox}>
                                <div className={styles.blogImage}>
                                    <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/blog-1.jpg' alt=''></img>
                                </div>
                                <div className={styles.blogText}>
                                    <p>FASHION, WOMEN</p>
                                    <h1>Your Summer is Incomplete Without These Dresses</h1>
                                    <p>Nunc ut sem ut ex sollicitudin commodo. Suspendisse non enim felis. Nam nec diam ultricies, malesuada purus in, malesuada libero</p>
                                    <a href=''>READ MORE</a>

                                </div>
                            </div>
                        </div>
                        <div className={styles.blogRight}>
                            <div className={styles.blogContact}>
                                <div className={styles.blogMinibox}>
                                    <div className={styles.blogInput}>
                                        <input type='text' placeholder='Search for products...'></input>
                                    </div>
                                </div>
                                <div className={styles.blogMinibox}>
                                    <div className={styles.blogPopular}>
                                        <h3>Popular Posts</h3>
                                        <div className={styles.popularBox}>
                                            <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/blog-1-1174x862.jpg' alt=''></img>
                                            <p>Your Summer is Incomplete Without These Dresses</p>
                                        </div>
                                        <div className={styles.popularBox}>
                                            <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/blog-2-1174x862.jpg' alt=''></img>
                                            <p>Perfect Pieces To Match Your Custom Tees</p>
                                        </div>
                                        <div className={styles.popularBox}>
                                            <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/blog-6-1174x862.jpg' alt=''></img>
                                            <p>Weekday Outfit Inspiration for All Occasions</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.blogMinibox}>
                                <div className={styles.blogPopular}>
                                        <h3>Recent Comments</h3>
                                        <div className={styles.popularBox}>
                                            <div className={styles.blogComments}>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor arcu, consectetur eleifend commodo at,</p>
                                           <span>JUL 24, 2023</span>
                                            </div>
                                         
                                        </div>
                                        <div className={styles.popularBox}>
                                        <div className={styles.blogComments}>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor arcu, consectetur eleifend commodo at,</p>
                                           <span>JUL 24, 2023</span>
                                            </div>
                                        </div>
                                        <div className={styles.popularBox}>
                                        <div className={styles.blogComments}>
                                            <p>Phasellus vitae imperdiet felis. Nam non condimentum erat. Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                           <span>JUL 24, 2023</span>
                                            </div>
                                        </div>
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
                <Footer />
            </div>
        </>
    )
}

export default Blog
