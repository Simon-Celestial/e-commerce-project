import styles from "./SingleProductCard.module.scss";
import {FacebookLogo, Heart, MagnifyingGlassPlus, PinterestLogo, Star, TwitterLogo} from "@phosphor-icons/react";
import {GitDiff} from "@phosphor-icons/react/dist/ssr";
import {Link} from "react-router-dom";
import {useCallback, useContext, useMemo, useState} from "react";
import {BasketContext} from "../../../Context/BasketContext.jsx";
import {WishListContext} from "../../../Context/WishListContext.jsx";
import {DataContext} from "../../../Context/DataContext.jsx";
export const SingleProductCard = ({product}) => {

    const {
        addToCart,
    } = useContext(BasketContext);

    const {
        addToWishList,
        wishListItems
    } = useContext(WishListContext);
    const {
        currencyConverter,
        currencyState

    } = useContext(DataContext);



    const [magnifyingImg, setMagnifyingImg] = useState(false);

    const handleMagnifyingImg = useCallback(() => {
        setMagnifyingImg(prevState => !prevState);
    }, [setMagnifyingImg]);

    const getColorForRating = (rating) => {
        if (rating === 0) {
            return "#808080";
        } else if (rating >= 1 && rating < 3) {
            return "#FF0000";
        } else if (rating === 3) {
            return "#FFFF00";
        } else if (rating === 4) {
            return "#006400";
        } else if (rating === 5) {
            return "#008000";
        } else {
            return "#000000";
        }
    }

    const isProductInWishlist = useMemo(() => {
        return wishListItems?.some(item => item.id === product?.id);
    }, [wishListItems, product]);


    return (
            <div className={styles.detailsContent}>
                <div className={styles.imageBlock}>
                    <div className={styles.zoomBtn} onClick={handleMagnifyingImg}>
                        <MagnifyingGlassPlus/>
                    </div>
                    {
                        product?.regularPrice ?
                            <div className={`${styles.mark} ${styles.sale}`}>
                                sale
                            </div>
                            : null
                    }

                    {product?.hot && product?.quantity > 0 ?
                        <div
                            className={`${styles.mark} ${styles.hot} ${!product?.regularPrice ? styles.hotDefault : null}`}>
                            hot
                        </div>
                        :
                        null
                    }
                    {
                        product?.quantity < 1 ?
                            <div className={`
                                                 ${styles.mark}
                                                 ${styles.stock} 
                                                 ${!product?.sale ? styles.defaultMark : null} 
                                                 ${!product?.hot && !product?.regularPrice ? styles.leftDefault : null}
                                                 `}>
                                out of stock
                            </div>
                            :
                            null
                    }

                    <img src={product?.frontImage}
                         alt="Model Clothes" className={magnifyingImg ? styles.magnified : ""}/>
                </div>
                <div className={styles.descriptionBlock}>
                    <h1>{product?.title}</h1>
                    <div className={styles.optionsBlock}>
                        <div className={styles.rating}>
                            <Star weight="duotone" style={{
                                color: getColorForRating(product?.rating)
                            }}/>
                            <p>({product?.rating})</p>
                        </div>
                        <div className={styles.stockBlock}>
                            Stock: {product?.quantity > 1 ? <p>In stock</p> : <p style={{
                            color: "red"
                        }}>Out of stock</p>}
                        </div>

                    </div>
                    <div className={styles.priceBlock}>
                        <p>{currencyState === "azn"? "AZN" : "$"} {currencyConverter(product.salePrice)?.toFixed(2)}</p>
                        {product?.regularPrice ?
                            <>
                                <span>{currencyState === "azn"? "AZN" : "$"} {currencyConverter(product.regularPrice)?.toFixed(2)}</span>
                                <h5>(-{(((product?.regularPrice - product?.salePrice) / product?.regularPrice) * 100).toFixed(2)}%)</h5>
                            </>
                            :
                            null
                        }
                    </div>
                    <div className={styles.descriptionTitle}>
                        {product?.description}
                    </div>
                    <div className={styles.buttonsBlock}>
                        <div className={styles.button} onClick={() => addToCart(product)}>
                            add to cart
                        </div>
                        <div className={styles.button}>
                            buy now
                        </div>

                    </div>
                    <div className={styles.miscellaneousBlock}>
                        <div className={styles.options}>
                            <div className={styles.manipulation} onClick={() => addToWishList(product)}>
                                {!isProductInWishlist ?
                                    <Heart/>
                                    :
                                    <Heart  weight={"fill"}/>
                                }
                                Add to wishlist
                            </div>
                            <div className={styles.manipulation}>
                                <GitDiff/>
                                Compare
                            </div>
                        </div>
                        <div className={styles.social}>
                            <Link to="#" className={styles.socialEntity}>
                                <FacebookLogo weight="thin"/>
                            </Link>

                            <Link to="#" className={styles.socialEntity}>
                                <TwitterLogo weight="thin"/>
                            </Link>
                            <Link to="#" className={styles.socialEntity}>
                                <PinterestLogo weight="thin"/>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.idBlock}>
                        <span>SKU: <p>SF00{product?.id}</p></span>
                        <span>CATEGORY: <p>{product?.category}</p></span>
                    </div>
                </div>
            </div>
    )
}