import styles from "./Wishlist.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PageHeading from '../../Common/PageHeading/PageHeading';
import {
    Check,
    EnvelopeSimple,
    FacebookLogo,
    PinterestLogo,
    Trash,
    TwitterLogo,
    WhatsappLogo,
    X
} from "@phosphor-icons/react";
import {Link} from "react-router-dom";
import {useCallback, useContext} from "react";
import {WishListContext} from "../../../Context/WishListContext.jsx";
import {BasketContext} from "../../../Context/BasketContext.jsx";
import {DataContext} from "../../../Context/DataContext.jsx";

const Wishlist = () => {
    const {
        wishListItems,
        removeFromWishList
    } = useContext(WishListContext);

    const {
        addToCart,
    } = useContext(BasketContext);

    const {
        currencyConverter,
        currencyState

    } = useContext(DataContext);


    const handleAddToCart = useCallback(async (product, productId) => {
        addToCart(product);
        await product?.quantity > 0? removeFromWishList(productId) : null;
    }, [addToCart, removeFromWishList]);


    return (
        <div className={styles.wishlistWrapper}>
            <Header/>
            <main className={styles.wishlistContainer}>
                <PageHeading title={"Wishlist"}/>
                {wishListItems?.length < 1 ?
                    <div className={styles.wishlistEmpty}>
                        <img src="/images/heart.png" alt="Heart"/>
                        <p>Your wishlist is currently empty.</p>
                        <Link to="/shop">
                            Return to Shop
                        </Link>
                    </div>
                    :
                    <div className={styles.wishlistCardsWrapper}>
                        <div className={`${styles.tableRow} ${styles.topRow}`}>
                            <div className={`${styles.product} ${styles.cell}`}>
                                Product
                            </div>
                            <div className={`${styles.price} ${styles.cell}`}>
                                Unit price
                            </div>
                            <div className={`${styles.stock} ${styles.cell}`}>
                                Stock status
                            </div>
                            <div className={`${styles.add} ${styles.cell}`}>
                                Add to Cart
                            </div>
                            <div className={`${styles.delete} ${styles.cell}`}>
                                Delete
                            </div>
                        </div>
                        {wishListItems?.map((product) => {
                            return (
                                <div key={product.id} className={`${styles.tableRow} ${styles.bottomRow}`}>
                                    <div className={`${styles.product} ${styles.cell}`}>
                                        <img
                                            src={product.frontImage}
                                            alt="Fashion Clothes"/>
                                        <Link to={`/details/${product.id}`}>
                                            {product.title}
                                        </Link>
                                    </div>
                                    <div className={`${styles.price} ${styles.cell}`}>
                                    <span>{product.regularPrice ?
                                        <p>{currencyState === "azn"? "AZN" : "$"} {currencyConverter(product.regularPrice)?.toFixed(2)}</p> : null}{currencyState === "azn"? "AZN" : "$"} {currencyConverter(product.salePrice)?.toFixed(2)}</span>
                                    </div>
                                    <div className={`${styles.stock} ${styles.cell}`}>
                                        {product.quantity > 0 ?
                                            <span className={styles.inStock}><Check/> In Stock</span>
                                            :
                                            <span className={styles.notInStock}><X/>Out of Stock</span>
                                        }
                                    </div>
                                    <div className={`${styles.add} ${styles.cell}`}>
                                        <div className={styles.addToCart}
                                             onClick={() => handleAddToCart(product, product.id)}>
                                            add to cart
                                        </div>

                                    </div>
                                    <div className={`${styles.delete} ${styles.cell}`}>
                                        <div className={styles.deleteBtn}
                                             onClick={() => removeFromWishList(product.id)}>
                                            <Trash/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className={styles.social}>
                            <h3>Share on:</h3>
                            <div className={styles.iconsBlock}>
                                <Link to="#" className={styles.circle}>
                                    <FacebookLogo weight="fill"/>
                                </Link>
                                <Link to="#" className={styles.circle}>
                                    <TwitterLogo weight="fill"/>
                                </Link>
                                <Link to="#" className={styles.circle}>
                                    <PinterestLogo weight="fill"/>
                                </Link>
                                <Link to="#" className={styles.circle}>
                                    <EnvelopeSimple/>
                                </Link>
                                <Link to="#" className={styles.circle}>
                                    <WhatsappLogo/>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </main>
            <Footer/>
        </div>
    )
}

export default Wishlist;
