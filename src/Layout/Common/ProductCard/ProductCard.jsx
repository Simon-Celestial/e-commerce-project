import styles from "./ProductCard.module.scss";
import {Heart, MagnifyingGlass, GitDiff} from '@phosphor-icons/react/dist/ssr';
import {Link} from "react-router-dom";
import {BasketContext} from "../../../Context/BasketContext";
import {useCallback, useContext, useMemo} from "react";
import {WishListContext} from "../../../Context/WishListContext.jsx";
import {DataContext} from "../../../Context/DataContext.jsx";
import { useTranslation } from "react-i18next";


const ProductCard = ({product, tallSlide, listView,specialStyles}) => {
    const {t} = useTranslation();
    const {
        addToCart,
    } = useContext(BasketContext);

    const {
        addToWishList,
        wishListItems,
    } = useContext(WishListContext);

    const {
        setQuickView,
        setSelectedProduct,
        currencyConverter,
        currencyState

    } = useContext(DataContext);




    const isProductInWishlist = useMemo(() => {
        return wishListItems.some(item => item.id === product.id);
    }, [wishListItems, product]);

    const handleQuickViewOpen = useCallback((product)=>{
        setSelectedProduct([product]);
        setQuickView(prev => !prev);
    },[setQuickView,setSelectedProduct])

    return (
        <>
        <div className={`${styles.productWrapper} ${listView ? styles.listView : ""}`}>
            <div className={styles.productsContainerBox}>
                <div className={`${styles.productImage} ${tallSlide ? styles.tallSlide : ""} ${specialStyles ? styles.specialImage : null}`}>
                    {product?.regularPrice && product?.quantity > 0 ?
                        <div className={`${styles.mark} ${styles.saleMark}`}>
                            {t("main.product.productSale")}
                        </div>
                        :
                        null
                    }
                    {
                        product?.hot && product.quantity > 0 ?
                            <div
                                className={`${styles.mark} ${styles.hotMark} ${!product.regularPrice ? styles.defaultMark : null}`}>
                                {t("main.product.productHot")}
                            </div>
                            :
                            null
                    }
                    {
                        product?.quantity < 1 ?
                            <div className={`${styles.mark} ${styles.outOfStock}`}>
                                {t("main.product.productSoldOut")}
                            </div>
                            :
                            null
                    }
                    <img src={product?.frontImage} alt="Shop Image"/>
                    {
                        product?.backImage ?
                            <img src={product.backImage} className={styles.backImage} alt="Shop Image"/>
                            :
                            null
                    }
                    {
                        !listView ?
                            <div className={styles.add} onClick={() => addToCart(product)}>
                                <a>{t("main.product.productAddToCart")}</a>
                            </div>
                            :
                            null
                    }
                    <div className={styles.heart}>
                        {isProductInWishlist ?
                            <Heart weight="fill"/>
                            :
                            <Heart />
                        }
                    </div>
                    <div className={styles.menu}>
                        <div className={`${styles.menuEntity} ${styles.search}`} onClick={()=>handleQuickViewOpen(product)}>
                            <MagnifyingGlass/>
                        </div>
                        <div className={`${styles.menuEntity} ${styles.compare}`}>
                            <GitDiff/>
                        </div>
                        <div className={`${styles.menuEntity} ${styles.wishList}`}
                             onClick={() => addToWishList(product)}>
                            <Heart/>
                        </div>

                    </div>
                </div>
                <div className={styles.productText}>
                    <Link to={`/details/${product?.id}`}>{product.title}</Link>
                    <span>{currencyState === "azn"? "AZN" : "$"} {currencyConverter(product.salePrice)?.toFixed(2)}
                        {product.regularPrice ?
                            <p>{currencyState === "azn"? "AZN" : "$"} {currencyConverter(product.regularPrice)?.toFixed(2)}</p>
                            :
                            null
                        }
          </span>
                    {listView ?
                        <>
                            <h2>{t("main.product.productConstructedFrom")}</h2>
                            <div className={styles.addToCart} onClick={() => addToCart(product)}>
                               {t("main.product.productAddToCart")}
                            </div>
                        </>
                        :
                        null
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductCard
