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
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {BasketContext} from "../../../Context/BasketContext";
import {WishListContext} from "../../../Context/WishListContext.jsx";
import Search from "../../Common/Search/Search.jsx";
import {DataContext} from "../../../Context/DataContext.jsx";
import {QuickView} from "../../Common/QuickView/QuickView.jsx";
import {LanguageAndCurrency} from "../../Common/LanguageAndCurrency/LanguageAndCurrency.jsx";
import {useTranslation} from "react-i18next";
import sideMenuData from "/public/data/SideMenuData/sideMenuData.json";
import headerNavData from "/public/data/HeaderNavData/headerNavData.json";


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
    const [sideMenuElemState, setSideMenuElemState] = useState("")
    const [dropDownState, setDropDownState] = useState("");

    const handleMouseEnter = useCallback((productID) => {
        setDropDownState(productID)
    }, [setDropDownState])

    const handleMouseLeave = useCallback(() => {
        setDropDownState("");
    }, [setDropDownState]);


    const handleSideMenuVisible = useCallback((itemID) => {
        setSideMenuElemState(prevState => prevState === itemID ? "" : itemID);
    }, [setSideMenuElemState]);

    const {t, i18n} = useTranslation();


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
        if (localStorage.getItem("user")) {
            fetchUserName();
        }
    }, []);

    const translatedSideMenu = useMemo(() => {
        if (i18n.language === "en") {
            return sideMenuData.en
        } else if (i18n.language === "az") {
            return sideMenuData.az
        } else {
            return sideMenuData.ru
        }

    }, [i18n.language])

    console.log(translatedSideMenu)


    return (
        <>
            <QuickView/>
            <header className={`${styles.headerWrapper} ${headerFixed ? styles.fixed : null}`}>
                <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>
                <div className={styles.headerContent}>
                    <div className={styles.headerTop}>
                        <div className={styles.headerText}>
                            <p>{t('header.bestSellingProducts')}</p>
                            <Link to="/shop">{t('header.shopNow')}</Link>
                        </div>
                        <LanguageAndCurrency/>
                    </div>
                    <div className={styles.headerBottom}>
                        <div className={styles.headerNavigation}>
                            <div className={styles.sideMenu} onClick={handleMenuToggle}>
                                <List/>
                            </div>
                            <div className={styles.navigation}>
                                {headerNavData?.map((nav) => {
                                    return (
                                        <div key={nav?.id} className={styles.navEntity}
                                             onMouseEnter={() => handleMouseEnter(nav?.id)}>
                                            {nav.id === "miscellaneous" ?
                                                <>
                                                    <p>{t('header.miscellaneous')}</p>
                                                    <CaretDown/>
                                                    <div
                                                        className={`${styles.navDropDown} ${styles.miscellaneousDropDown}`}>
                                                        <div className={styles.miscellaneousContent}>
                                                            <div className={styles.dropLink}>
                                                                <Link
                                                                    to={'/blog'}>{t('header.headerDropDown.blog')}</Link>
                                                            </div>
                                                            <div className={styles.dropLink}>
                                                                <Link
                                                                    to={'/about'}>{t('header.headerDropDown.about')}</Link>
                                                            </div>
                                                            <div className={styles.dropLink}>
                                                                <Link
                                                                    to={'/contact'}>{t('header.headerDropDown.contact')}</Link>
                                                            </div>
                                                            <div className={styles.dropLink}>
                                                                <Link
                                                                    to={"/wishlist"}>{t('header.headerDropDown.wishList')}</Link>
                                                            </div>
                                                            <div className={styles.dropLink}>
                                                                <Link
                                                                    to={"/basket"}>{t('header.headerDropDown.cart')}</Link>
                                                            </div>
                                                            <div className={styles.dropLink}>
                                                                <Link
                                                                    to={"/checkout"}>{t('header.headerDropDown.checkout')}</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <Link to={nav?.route}>{nav?.name}</Link>
                                                    <CaretDown/>
                                                </>

                                            }
                                        </div>
                                    )
                                })}
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
                                            <Link to={"/account"}
                                                  className={styles.welcomeUser}>{t('header.headerDropDown.welcome')}, {accountDetails.name}</Link>
                                            <span onClick={handleExitAccount}>
                                                <Power weight="fill"/>
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
                                                            {currencyState === "azn" ? "AZN" : "$"} {(currencyConverter(product?.salePrice) * product?.count)?.toFixed(2)}
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
                                        <p>{currencyState === "azn" ? "AZN" : "$"} {currencyConverter(calculateSubtotal)?.toFixed(2)}</p>

                                    </div>
                                    <div className={styles.basketBtn}>
                                        <Link to={'/basket'}>{t('header.headerDropDown.viewCart')}</Link>
                                    </div>
                                    <Link to={"/checkout"} className={styles.basketBtn}>
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
                        {translatedSideMenu?.map((menuItem) => {
                            return (
                                <div key={menuItem?.id} className={`${styles.navEntity}`}
                                     onClick={() => handleSideMenuVisible(menuItem?.id)}>
                                    <Link to={menuItem?.route}>{menuItem?.name}</Link>
                                    {menuItem?.options?.length > 0 ?
                                        <CaretRight style={{
                                            transform: sideMenuElemState === menuItem?.id ? "rotate(90deg)" : ""
                                        }}/>
                                        :
                                        null
                                    }
                                    {menuItem?.options?.length > 0 ?
                                        <div
                                            className={`${styles.elementDropdown} ${sideMenuElemState === menuItem?.id ? styles.elementVisible : ""}`}>
                                            <div className={styles.dropDownTitle}>
                                                {menuItem?.options?.map((menuChild) => {
                                                    return (
                                                        <Link to={menuChild?.route}
                                                              key={menuChild?.id}>{menuChild.name}</Link>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>

                            )
                        })}
                        <div className={styles.closeBtn} onClick={handleMenuToggle}>
                            <X/>
                        </div>
                    </div>
                </div>

                {/*DROPDOWN HERE*/}
                {/*SHOP DROPDOWN*/}
                <div className={`${styles.headerDropDown} ${dropDownState === "shop" ? styles.activeDropDown : null}`}
                     onMouseLeave={handleMouseLeave}>
                    <div className={styles.headerDropDownContent}>
                        <div className={styles.dropDownContainer}>
                            <div className={styles.dropDownRow}>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.womenClothing')}</h2>
                                    <Link to={"#"}>{t('header.women')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.coatsAndJackets')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.dresses')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.hoodiesAndSweatShirts')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.jeans')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.knitWear')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.menClothing')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.hoodies')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.coatsAndJackets')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.pants')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.shirts')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.shorts')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.tShirts')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.shopByCollection')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.fallCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.pastelCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.springCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.summerCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.vintageCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.winterCollection')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.shopByActivity')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.backToSchool')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.sportClothing')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.vacationAndWedding')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.workClothing')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.summerClothing')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.casualClothing')}</Link>
                                </div>


                            </div>
                            <div className={styles.imagesRow}>
                                <div className={styles.imageContainer}>
                                    <img src="https://klbtheme.com/clotya/wp-content/uploads/2022/05/banner-22.jpg"
                                         alt="Image"/>
                                    <div className={styles.title}>
                                        <span>{t('header.headerDropDown.newProduct')}</span>
                                        <h1>{t('header.headerDropDown.theBestNewCollection')}</h1>
                                    </div>
                                </div>
                                <div className={styles.imageContainer}>
                                    <img src="https://klbtheme.com/clotya/wp-content/uploads/2022/05/banner-23.jpg"
                                         alt="Image"/>
                                    <div className={styles.title}>
                                        <span>{t('header.headerDropDown.enjoyFreeShipping')}</span>
                                        <h1>{t('header.headerDropDown.manPickFrom')} $15</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*WOMEN DROPDOWN*/}
                <div className={`${styles.headerDropDown} ${dropDownState === "women" ? styles.activeDropDown : null}`}
                     onMouseLeave={handleMouseLeave}>
                    <div className={styles.headerDropDownContent}>
                        <div className={styles.dropDownContainer}>
                            <div className={styles.dropDownRow}>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.womenClothing')}</h2>
                                    <Link to={"#"}>{t('header.women')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.coatsAndJackets')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.dresses')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.hoodiesAndSweatShirts')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.jeans')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.knitWear')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.menClothing')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.hoodies')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.coatsAndJackets')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.pants')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.shirts')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.shorts')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.tShirts')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.shopByCollection')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.fallCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.pastelCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.springCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.summerCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.vintageCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.winterCollection')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.shopByActivity')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.backToSchool')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.sportClothing')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.vacationAndWedding')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.workClothing')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.summerClothing')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.casualClothing')}</Link>
                                </div>
                            </div>
                            <div className={styles.dropDownRow}>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.shopByBodyFit')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.curveAndPlusSize')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.maternity')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.dresses')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.petite')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.jeans')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.tall')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.topTrending')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.fallCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.coatsAndJackets')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.winterCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.springCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.summerCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.casualClothing')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.fashionStyle')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.18thCentury')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.19thCentury')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.20thCentury')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.21thCentury')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.newIn')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.coatsAndJackets')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.dresses')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.jeans')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.workClothing')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.hoodiesAndSweatShirts')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.casualClothing')}</Link>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                {/*MEN DROPDOWN*/}
                <div className={`${styles.headerDropDown} ${dropDownState === "men" ? styles.activeDropDown : null}`}
                     onMouseLeave={handleMouseLeave}>
                    <div className={styles.headerDropDownContent}>
                        <div className={styles.dropDownContainer}>
                            <div className={styles.imagesRow}>
                                <div className={styles.imageContainer}>
                                    <img src="https://klbtheme.com/clotya/wp-content/uploads/2022/04/banner-02.jpg"
                                         alt="Image"/>
                                    <div className={styles.title}>
                                        <span>{t('header.headerDropDown.fashionableClothes')}</span>
                                        <h1>{t('header.headerDropDown.theWorldBestDesigners')}</h1>
                                    </div>
                                </div>
                                <div className={styles.imageContainer}>
                                    <img src="https://klbtheme.com/clotya/wp-content/uploads/2022/04/banner-04.jpg"
                                         alt="Image"/>
                                    <div className={styles.title}>
                                        <span>{t('header.headerDropDown.enjoySuperDiscounts')}</span>
                                        <h1>{t('header.headerDropDown.salesUpTo')} 50%</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.dropDownRow}>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.womenClothing')}</h2>
                                    <Link to={"#"}>{t('header.women')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.coatsAndJackets')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.dresses')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.hoodiesAndSweatShirts')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.jeans')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.knitWear')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.menClothing')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.hoodies')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.coatsAndJackets')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.pants')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.shirts')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.shorts')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.tShirts')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.shopByCollection')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.fallCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.pastelCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.springCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.summerCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.vintageCollection')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.winterCollection')}</Link>
                                </div>
                                <div className={styles.dropDownColumn}>
                                    <h2>{t('header.headerDropDown.shopByActivity')}</h2>
                                    <Link to={"#"}>{t('header.headerDropDown.backToSchool')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.sportClothing')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.vacationAndWedding')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.workClothing')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.summerClothing')}</Link>
                                    <Link to={"#"}>{t('header.headerDropDown.casualClothing')}</Link>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>


            </header>
        </>
    )
}

export default Header
