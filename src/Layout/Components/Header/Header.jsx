import styles from "./Header.module.scss";
import {
    CaretDown,
    Heart,
    List,
    MagnifyingGlass,
    ShoppingCart,
    User,
    X,
    CaretRight,
    TrashSimple,
    Power
} from "@phosphor-icons/react";
import {useCallback, useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {BasketContext} from "../../../Context/BasketContext";
import {WishListContext} from "../../../Context/WishListContext.jsx";
import Search from "../../Common/Search/Search.jsx";
import {DataContext} from "../../../Context/DataContext.jsx";
import {QuickView} from "../../Common/QuickView/QuickView.jsx";
import {LanguageAndCurrency} from "../../Common/LanguageAndCurrency/LanguageAndCurrency.jsx";
import {useTranslation} from "react-i18next";


const Header = () => {
    const {
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartItems,
        calculateSubtotal,
        setCartItems,
    } = useContext(BasketContext);

    const {
        wishListItems,
        setWishListItems
    } = useContext(WishListContext);
    const {
        accountDetails,
        access,
        handleClearStorage,
        fetchUserName,
        currencyConverter,
        currencyState

    } = useContext(DataContext);


    const [menuOpen, setMenuOpen] = useState(false);
    const [basketOpen, setBasketOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [headerFixed, setHeaderFixed] = useState(false);

    const { t } = useTranslation();



    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const threshold = 600;
            setHeaderFixed(scrollPosition > threshold);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const handleSearchOpen = useCallback((e) => {
        e.stopPropagation();
        setSearchOpen(prevState => !prevState);
    }, [setSearchOpen])

    const handleMenuToggle = useCallback(() => {
        setMenuOpen(prevState => !prevState);
    }, [setMenuOpen]);

    const handleBasketToggle = useCallback(() => {
        setBasketOpen(prevState => !prevState);
    }, [setBasketOpen])

    const navigate = useNavigate();

    const handleExitAccount = useCallback(() => {
        handleClearStorage();
        setCartItems([]);
        setWishListItems([]);
        navigate("/home");
    }, [navigate])

    useEffect(() => {
        if ( localStorage.getItem("user")) {
            fetchUserName();
        }
    }, []);


    return (
        <>
            <QuickView />
            <header className={`${styles.headerWrapper} ${headerFixed ? styles.fixed : null}`}>
                <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>
                <div className={styles.headerContent}>
                    <div className={styles.headerTop}>
                        <div className={styles.headerText}>
                            <p>{t('header.bestSellingProducts')}</p>
                            <Link to="/shop">{t('header.shopNow')}</Link>
                        </div>
                        <LanguageAndCurrency />
                    </div>
                    <div className={styles.headerBottom}>
                        <div className={styles.headerNavigation}>
                            <div className={styles.sideMenu} onClick={handleMenuToggle}>
                                <List/>
                            </div>
                            <div className={styles.navigation}>
                                <div className={styles.navEntity}>
                                    <Link to={'/shop'}>{t('header.shop')}</Link>
                                    <CaretDown/>
                                    <div className={`${styles.navDropDown} ${styles.shopDropDown}`}>
                                        <div className={`${styles.dropDownContent} ${styles.shopDropContent}`}>
                                            <div className={styles.flex1}>
                                                <ul>
                                                    <div className={styles.whomen}>{t('header.headerDropDown.womenClothing')}</div>
                                                    <li>{t('header.women')}</li>
                                                    <li>{t('header.headerDropDown.coatsAndJackets')}</li>
                                                    <li>{t('header.headerDropDown.dresses')}</li>
                                                    <li>{t('header.headerDropDown.hoodiesAndSweatShirts')}</li>
                                                    <li>{t('header.headerDropDown.jeans')}</li>
                                                    <li>{t('header.headerDropDown.menClothing')}</li>
                                                </ul>
                                                <ul>
                                                    <div className={styles.whomen}>{t('header.headerDropDown.menClothing')}</div>
                                                    <li>{t('header.headerDropDown.hoodies')}</li>
                                                    <li>{t('header.headerDropDown.coatsAndJackets')}</li>
                                                    <li>{t('header.headerDropDown.pants')}</li>
                                                    <li>{t('header.headerDropDown.shirts')}</li>
                                                    <li>{t('header.headerDropDown.shorts')}</li>
                                                    <li>{t('header.headerDropDown.tShirts')}</li>
                                                </ul>
                                                <ul>
                                                    <div className={styles.whomen}>{t('header.headerDropDown.shopByCollection')}</div>
                                                    <li>{t('header.headerDropDown.fallCollection')}</li>
                                                    <li>{t('header.headerDropDown.pastelCollection')}</li>
                                                    <li>{t('header.headerDropDown.springCollection')}</li>
                                                    <li>{t('header.headerDropDown.summerCollection')}</li>
                                                    <li>{t('header.headerDropDown.vintageCollection')}</li>
                                                    <li>{t('header.headerDropDown.winterCollection')}</li>
                                                </ul>
                                                <ul>
                                                    <div className={styles.whomen}>{t('header.headerDropDown.shopByActivity')}</div>
                                                    <li>{t('header.headerDropDown.backToSchool')}</li>
                                                    <li>{t('header.headerDropDown.sportClothing')}</li>
                                                    <li>{t('header.headerDropDown.vacationAndWedding')}</li>
                                                    <li>{t('header.headerDropDown.workClothing')}</li>
                                                    <li>{t('header.headerDropDown.summerClothing')}</li>
                                                    <li>{t('header.headerDropDown.casualClothing')}</li>
                                                </ul>
                                            </div>
                                            <div className={styles.dropDownimages}>
                                                <div className={styles.dropDownimages1}>
                                                    <img
                                                        src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/05/banner-mega-1-2.jpg"></img>
                                                    <span>{t('header.headerDropDown.newProduct')}</span>
                                                    <h1>{t('header.headerDropDown.theBestNewCollection')}</h1>
                                                </div>
                                                <div className={styles.dropDownimages1}>
                                                    <img
                                                        src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/05/banner-mega-2-2.jpg"></img>
                                                    <span>{t('header.headerDropDown.enjoyFreeShipping')}</span>
                                                    <h1>{t('header.headerDropDown.manPickFrom')} $15</h1>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className={styles.navEntity}>
                                    <p>{t('header.women')}</p>
                                    <CaretDown/>
                                    <div className={`${styles.navDropDown} ${styles.womenDropDown}`}>
                                        <div className={styles.dropDownContent}>
                                            <div className={styles.dropDownFlex}>
                                                <div className={styles.flex1}>
                                                    <ul>
                                                        <div className={styles.whomen}>{t('header.headerDropDown.womenClothing')}</div>
                                                        <li>{t('header.women')}</li>
                                                        <li>{t('header.headerDropDown.coatsAndJackets')}</li>
                                                        <li>{t('header.headerDropDown.dresses')}</li>
                                                        <li>{t('header.headerDropDown.hoodiesAndSweatShirts')}</li>
                                                        <li>{t('header.headerDropDown.jeans')}</li>
                                                        <li>{t('header.headerDropDown.knitWear')}</li>
                                                    </ul>
                                                    <ul>
                                                        <div className={styles.whomen}>{t('header.headerDropDown.menClothing')}</div>
                                                        <li>{t('header.headerDropDown.coatsAndJackets')}</li>
                                                        <li>{t('header.headerDropDown.hoodies')}</li>
                                                        <li>{t('header.headerDropDown.pants')}</li>
                                                        <li>{t('header.headerDropDown.shirts')}</li>
                                                        <li>{t('header.headerDropDown.shorts')}</li>
                                                        <li>{t('header.headerDropDown.tShirts')}</li>
                                                    </ul>
                                                    <ul>
                                                        <div className={styles.whomen}>{t('header.headerDropDown.tShirts')}</div>
                                                        <li>{t('header.headerDropDown.fallCollection')}</li>
                                                        <li>{t('header.headerDropDown.pastelCollection')}</li>
                                                        <li>{t('header.headerDropDown.springCollection')}</li>
                                                        <li>{t('header.headerDropDown.summerCollection')}</li>
                                                        <li>{t('header.headerDropDown.vintageCollection')}</li>
                                                        <li>{t('header.headerDropDown.winterCollection')}</li>
                                                    </ul>
                                                    <ul>
                                                        <div className={styles.whomen}>{t('header.headerDropDown.shopByActivity')}</div>
                                                        <li>{t('header.headerDropDown.backToSchool')}</li>
                                                        <li>{t('header.headerDropDown.casualClothing')}</li>
                                                        <li>{t('header.headerDropDown.summerClothing')}</li>
                                                        <li>{t('header.headerDropDown.sportClothing')}</li>
                                                        <li>{t('header.headerDropDown.vacationAndWedding')}</li>
                                                        <li>{t('header.headerDropDown.workClothing')}</li>
                                                    </ul>
                                                </div>
                                                <div className={styles.flex1}>
                                                    <ul>
                                                        <div className={styles.whomen}>{t('header.headerDropDown.shopByBodyFit')}</div>
                                                        <li>{t('header.headerDropDown.curveAndPlusSize')}</li>
                                                        <li>{t('header.headerDropDown.maternity')}</li>
                                                        <li>{t('header.headerDropDown.petite')}</li>
                                                        <li>{t('header.headerDropDown.tall')}</li>
                                                    </ul>
                                                    <ul>
                                                        <div className={styles.whomen}>{t('header.headerDropDown.topTrending')}</div>
                                                        <li>{t('header.headerDropDown.fallCollection')}</li>
                                                        <li>{t('header.headerDropDown.winterCollection')}</li>
                                                        <li>{t('header.headerDropDown.springCollection')}</li>
                                                        <li>{t('header.headerDropDown.summerCollection')}</li>

                                                    </ul>
                                                    <ul>
                                                    <div className={styles.whomen}>{t('header.headerDropDown.fashionStyle')}</div>
                                                        <li>{t('header.headerDropDown.18thCentury')}</li>
                                                        <li>{t('header.headerDropDown.19thCentury')}</li>
                                                        <li>{t('header.headerDropDown.20thCentury')}</li>
                                                        <li>{t('header.headerDropDown.21thCentury')}</li>
                                                    </ul>
                                                    <ul>
                                                        <div className={styles.whomen}>{t('header.headerDropDown.newIn')}</div>
                                                        <li>{t('header.headerDropDown.coatsAndJackets')}</li>
                                                        <li>{t('header.headerDropDown.dresses')}</li>
                                                        <li>{t('header.headerDropDown.hoodiesAndSweatShirts')}</li>
                                                        <li>{t('header.headerDropDown.jeans')}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.navEntity}>
                                    <p>{t('header.men')}</p>
                                    <CaretDown/>
                                    <div className={`${styles.navDropDown} ${styles.manDropDown}`}>
                                        <div className={styles.dropDownContent}>
                                            <div className={styles.navbarDropdown}>
                                                <div className={styles.dropDownContentmen}>
                                                    <div className={styles.flex1}>
                                                        <ul>
                                                            <div className={styles.whomen}>{t('header.headerDropDown.menClothing')}</div>
                                                            <li>{t('header.men')}</li>
                                                            <li>{t('header.headerDropDown.coatsAndJackets')}</li>
                                                            <li>{t('header.headerDropDown.hoodiesAndSweatShirts')}</li>
                                                            <li>{t('header.headerDropDown.pants')}</li>
                                                            <li>{t('header.headerDropDown.shirts')}</li>
                                                            <li>{t('header.headerDropDown.shorts')}</li>
                                                        </ul>
                                                        <ul>
                                                            <div className={styles.whomen}>{t('header.headerDropDown.shopByActivity')}</div>
                                                            <li>{t('header.headerDropDown.backToSchool')}</li>
                                                            <li>{t('header.headerDropDown.casualClothing')}</li>
                                                            <li>{t('header.headerDropDown.summerClothing')}</li>
                                                            <li>{t('header.headerDropDown.sportClothing')}</li>
                                                            <li>{t('header.headerDropDown.vacationAndWedding')}</li>
                                                            <li>{t('header.headerDropDown.workClothing')}</li>
                                                        </ul>
                                                    </div>
                                                    <div className={styles.leftImage}>
                                                        <img
                                                            src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/05/banner-mega-3-1.jpg"
                                                            alt="Image"></img>
                                                    </div>
                                                </div>
                                                <div className={styles.wideImage}>
                                                    <img
                                                        src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/05/banner-mega-4-1.jpg"
                                                        alt="Image"></img>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className={styles.navEntity}>
                                    <p>{t('header.miscellaneous')}</p>
                                    <CaretDown/>
                                    <div className={`${styles.navDropDown} ${styles.kidsDropDown}`}>
                                        <div className={styles.kidsDropContent}>
                                            <div className={styles.dropLink}>
                                                <Link to={'/blog'}>{t('header.headerDropDown.blog')}</Link>
                                            </div>
                                            <div className={styles.dropLink}>
                                                <Link to={'/about'}>{t('header.headerDropDown.about')}</Link>
                                            </div>
                                            <div className={styles.dropLink}>
                                                <Link to={'/contact'}>{t('header.headerDropDown.contact')}</Link>
                                            </div>
                                            <div className={styles.dropLink}>
                                                <Link to={"/wishlist"}>{t('header.headerDropDown.wishList')}</Link>
                                            </div>
                                            <div className={styles.dropLink}>
                                                <Link to={"/basket"}>{t('header.headerDropDown.cart')}</Link>
                                            </div>
                                            <div className={styles.dropLink}>
                                                <Link to={"/checkout"} >{t('header.headerDropDown.checkout')}</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <Link to="/" className={styles.headerLogo}>
                            <img
                                src="/images/logo.png"
                                alt="Site Logo"/>
                        </Link>
                        <div className={styles.headerButtons}>
                            <div className={`${styles.buttonEntity} ${styles.searchButton}`} onClick={handleSearchOpen}>
                                <MagnifyingGlass/>
                            </div>
                            <div className={`${styles.buttonEntity} ${styles.account}`}>
                                <User/>
                                <div className={`${styles.accountDropDown} ${access ? styles.transformed : null}`}>
                                    {access ?
                                        <>
                                            <Link to={"/account"} className={styles.welcomeUser}>{t('header.headerDropDown.welcome')}, {accountDetails.name}</Link>
                                            <span onClick={handleExitAccount}>
                                                <Power  weight="fill" />
                                                {t('header.headerDropDown.logOut')}
                                            </span>
                                        </>
                                        :
                                        <>
                                            <Link to="/login">{t('header.headerDropDown.login')}</Link>
                                            <Link to="/register">{t('header.headerDropDown.register')}</Link>
                                        </>
                                    }
                                </div>
                            </div>
                            <Link to="/wishlist" className={styles.buttonEntity}>
                                <div className={styles.count}>
                                    {wishListItems?.length}
                                </div>
                                <Heart/>
                            </Link>
                            <div className={`${styles.buttonEntity}`} onClick={handleBasketToggle}>
                                <ShoppingCart/>
                                <div className={styles.count}>
                                    {cartItems?.length}
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
                <div className={`${styles.basketOverlay} ${basketOpen ? styles.basketVisible : ""}`}>
                    <div className={styles.basketWrapper}>
                        <div className={styles.basketHeading}>
                            {cartItems?.length > 0 ?
                                <h3>{t('header.headerDropDown.cart')} ({cartItems?.length})</h3>
                                :
                                null
                            }
                            <div className={styles.closeBasket} onClick={handleBasketToggle}>
                                <X/>
                            </div>
                        </div>
                        {cartItems?.length > 0 ?
                            <>
                                <div className={styles.basketProducts}>
                                    {
                                        cartItems?.map((product) => {
                                            return (
                                                <div key={product.id} className={styles.basketCard}>
                                                    <Link to={`/details/${product?.id}`} className={styles.basketImage}>
                                                        <img
                                                            src={product.frontImage}
                                                            alt=""></img>
                                                    </Link>
                                                    <div className={styles.basketTitle}>
                                                        <Link to={`/details/${product?.id}`}
                                                              className={styles.productName}>{product.title}</Link>
                                                        <div className={styles.basketButton}>
                                                            <div className={styles.controlBtn}
                                                                 onClick={() => decreaseQuantity(product.id)}>
                                                                -
                                                            </div>
                                                            <div className={styles.controlBtn}>
                                                                {product.count}
                                                            </div>
                                                            <div className={styles.controlBtn}
                                                                 onClick={() => increaseQuantity(product.id)}>
                                                                +
                                                            </div>
                                                        </div>
                                                        <div className={styles.productPrice}>
                                                            {currencyState === "azn"? "AZN" : "$"} {(currencyConverter(product?.salePrice) * product?.count)?.toFixed(2)}
                                                        </div>
                                                    </div>
                                                    <div className={styles.deleteProduct}
                                                         onClick={() => removeFromCart(product.id)}>
                                                        <TrashSimple/>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <div className={styles.basketFooter}>
                                    <div className={styles.subtotal}>
                                        <p>{t('header.headerDropDown.subtotal')}:</p>
                                        <p>{currencyState === "azn"? "AZN" : "$"} {currencyConverter(calculateSubtotal)?.toFixed(2)}</p>

                                    </div>
                                    <div className={styles.basketBtn}>
                                        <Link to={'/basket'}>{t('header.headerDropDown.viewCart')}</Link>
                                    </div>
                                    <Link to={"/checkout"}  className={styles.basketBtn}>
                                        {t('header.headerDropDown.checkout')}
                                    </Link>
                                </div>
                            </>
                            :
                            <div className={styles.basketEmpty}>
                                <img src="/images/cart.png" alt="Cart"/>
                                <p>{t('header.headerDropDown.emptyCart')}</p>
                            </div>
                        }

                    </div>
                </div>

                <div className={`${styles.sideMenuOverlay} ${menuOpen ? styles.overlayVisible : ""}`}>
                    <div className={`${styles.sideMenuWrapper}`}>
                        <div className={styles.navEntity}>
                            <Link to={'/'}>{t('header.headerDropDown.home')}</Link>
                            <CaretRight fontSize={"20px"}/>
                            <div className={styles.elementDropdown}>
                                <div className={styles.dropDownTitle}>
                                    <a href="">{t('header.headerDropDown.option')} 1</a>
                                    <a href="">{t('header.headerDropDown.option')} 2</a>
                                    <a href="">{t('header.headerDropDown.option')} 3</a>
                                    <a href="">{t('header.headerDropDown.option')} 4</a>
                                    <a href="">{t('header.headerDropDown.option')} 5</a>
                                    <a href="">{t('header.headerDropDown.option')} 6</a>
                                    <a href="">{t('header.headerDropDown.option')} 7</a>
                                    <a href="">{t('header.headerDropDown.option')} 8</a>

                                </div>
                            </div>
                        </div>
                        <div className={styles.navEntity}>
                            <Link to={'/shop'}>{t('header.shop')}</Link>
                            <CaretRight fontSize={"20px"}/>
                            <div className={styles.elementDropdown}>
                                <div className={styles.dropDownTitle}>
                                    <a href="">{t('header.headerDropDown.option')} 1</a>
                                    <a href="">{t('header.headerDropDown.option')} 2</a>
                                    <a href="">{t('header.headerDropDown.option')} 3</a>
                                    <a href="">{t('header.headerDropDown.option')} 4</a>
                                    <a href="">{t('header.headerDropDown.option')} 5</a>
                                </div>
                            </div>

                        </div>
                        <div className={styles.navEntity}>
                            <a href="">{t('header.headerDropDown.product')}</a>
                            <CaretRight fontSize={"20px"}/>
                            <div className={styles.elementDropdown}>
                                <div className={styles.dropDownTitle}>
                                    <a href="">{t('header.headerDropDown.option')} 1</a>
                                    <a href="">{t('header.headerDropDown.option')} 2</a>
                                    <a href="">{t('header.headerDropDown.option')} 3</a>
                                    <a href="">{t('header.headerDropDown.option')} 4</a>
                                    <a href="">{t('header.headerDropDown.option')} 5</a>
                                    <a href="">{t('header.headerDropDown.option')} 6</a>

                                </div>
                            </div>

                        </div>
                        <div className={styles.navEntity}>
                            <Link to={'/blog'}>{t('header.headerDropDown.blog')}</Link>
                            <CaretRight fontSize={"20px"}/>
                            <div className={styles.elementDropdown}>
                                <div className={styles.dropDownTitle}>
                                    <a href="">{t('header.headerDropDown.option')} 1</a>
                                    <a href="">{t('header.headerDropDown.option')} 2</a>
                                    <a href="">{t('header.headerDropDown.option')} 3</a>
                                    <a href="">{t('header.headerDropDown.option')} 4</a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.navEntity}>
                            <Link to={'/about'}>{t('header.headerDropDown.about')}</Link>
                        </div>
                        <div className={styles.navEntity}>
                            <Link to={'/contact'}>{t('header.headerDropDown.contactUs')}</Link>
                        </div>
                        <div className={styles.closeBtn} onClick={handleMenuToggle}>
                            <X/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
