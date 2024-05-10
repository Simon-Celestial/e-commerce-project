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


const Header = () => {
    const {
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartItems,
        calculateSubtotal,
    } = useContext(BasketContext);

    const {
        wishListItems,
    } = useContext(WishListContext);
    const {
        accountDetails,
        access,
        handleClearStorage,
        fetchUserName
    } = useContext(DataContext);


    const [menuOpen, setMenuOpen] = useState(false);
    const [basketOpen, setBasketOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);


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
        navigate("/home")
    }, [navigate])

    useEffect(() => {
        if ( localStorage.getItem("user")) {
            fetchUserName();
        }
    }, []);


    return (
        <>
            <QuickView />
            <header className={styles.headerWrapper}>
                <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>
                <div className={styles.headerContent}>
                    <div className={styles.headerTop}>
                        <div className={styles.headerText}>
                            <p>UP TO 40% OFF BEST-SELLING FURNITURE.</p>
                            <a href="">SHOP NOW</a>
                        </div>
                        <div className={styles.headerLanguage}>
                            <div className={styles.headerLanguagefrom}>ENGLISH <i
                                className="fa-solid fa-chevron-down"></i>
                                <div className={styles.dropdownLanguage}>
                                    <div className={styles.dropdownBox}>
                                        <p>FRANCAIS</p>
                                        <p>DEAUTCH</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.headerLanguagefrom}>USD <i className="fa-solid fa-chevron-down"></i>
                                <div className={styles.dropdownLanguage}>
                                    <div className={styles.dropdownBox}>
                                        <p>USD</p>
                                        <p>EUR</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.headerBottom}>
                        <div className={styles.headerNavigation}>
                            <div className={styles.sideMenu} onClick={handleMenuToggle}>
                                <List/>
                            </div>
                            <div className={styles.navigation}>
                                <div className={styles.navEntity}>
                                    <Link to={'/shop'}>Shop</Link>
                                    <CaretDown/>
                                    <div className={`${styles.navDropDown} ${styles.shopDropDown}`}>
                                        <div className={`${styles.dropDownContent} ${styles.shopDropContent}`}>
                                            <div className={styles.flex1}>
                                                <ul>
                                                    <div className={styles.whomen}>Women Clothings</div>
                                                    <li>Women</li>
                                                    <li>Coats & Jackets</li>
                                                    <li>Dresses</li>
                                                    <li>Hoodies & Sweatshirts</li>
                                                    <li>Jeans</li>
                                                    <li>Knitwears</li>
                                                </ul>
                                                <ul>
                                                    <div className={styles.whomen}>Men Clothings</div>
                                                    <li>Coats & Jackets</li>
                                                    <li>Hoodies</li>
                                                    <li>Pants</li>
                                                    <li>Shirts</li>
                                                    <li>Shorts</li>
                                                    <li>T-Shirts</li>
                                                </ul>
                                                <ul>
                                                    <div className={styles.whomen}>Shop By Collections</div>
                                                    <li>Fall Collection</li>
                                                    <li>Pastel Collection</li>
                                                    <li>Spring Collection</li>
                                                    <li>Summer Collection</li>
                                                    <li>Vintage Collection</li>
                                                    <li>Winter Collection</li>
                                                </ul>
                                                <ul>
                                                    <div className={styles.whomen}>Shop By Activity</div>
                                                    <li>Back to School</li>
                                                    <li>Casual Clothings</li>
                                                    <li>Sport Clothings</li>
                                                    <li>Summer Clothings</li>
                                                    <li>Vacation & Wedding</li>
                                                    <li>Work Clothings</li>
                                                </ul>
                                            </div>
                                            <div className={styles.dropDownimages}>
                                                <div className={styles.dropDownimages1}>
                                                    <img
                                                        src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/05/banner-mega-1-2.jpg"></img>
                                                    <span>NEW PRODUCT</span>
                                                    <h1>The best new Collection</h1>
                                                </div>
                                                <div className={styles.dropDownimages1}>
                                                    <img
                                                        src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/05/banner-mega-2-2.jpg"></img>
                                                    <span>ENJOY FREE SHIPPING</span>
                                                    <h1>Men Pick from $15</h1>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className={styles.navEntity}>
                                    <p>Women</p>
                                    <CaretDown/>
                                    <div className={`${styles.navDropDown} ${styles.womenDropDown}`}>
                                        <div className={styles.dropDownContent}>
                                            <div className={styles.dropDownFlex}>
                                                <div className={styles.flex1}>
                                                    <ul>
                                                        <div className={styles.whomen}>Women Clothings</div>
                                                        <li>Women</li>
                                                        <li>Coats & Jackets</li>
                                                        <li>Dresses</li>
                                                        <li>Hoodies & Sweatshirts</li>
                                                        <li>Jeans</li>
                                                        <li>Knitwears</li>
                                                    </ul>
                                                    <ul>
                                                        <div className={styles.whomen}>Men Clothings</div>
                                                        <li>Coats & Jackets</li>
                                                        <li>Hoodies</li>
                                                        <li>Pants</li>
                                                        <li>Shirts</li>
                                                        <li>Shorts</li>
                                                        <li>T-Shirts</li>
                                                    </ul>
                                                    <ul>
                                                        <div className={styles.whomen}>Shop By Collections</div>
                                                        <li>Fall Collection</li>
                                                        <li>Pastel Collection</li>
                                                        <li>Spring Collection</li>
                                                        <li>Summer Collection</li>
                                                        <li>Vintage Collection</li>
                                                        <li>Winter Collection</li>
                                                    </ul>
                                                    <ul>
                                                        <div className={styles.whomen}>Shop By Activity</div>
                                                        <li>Back to School</li>
                                                        <li>Casual Clothings</li>
                                                        <li>Sport Clothings</li>
                                                        <li>Summer Clothings</li>
                                                        <li>Vacation & Wedding</li>
                                                        <li>Work Clothings</li>
                                                    </ul>
                                                </div>
                                                <div className={styles.flex1}>
                                                    <ul>
                                                        <div className={styles.whomen}>Shop by Body Fit</div>
                                                        <li>Curve & Plus Size</li>
                                                        <li>Maternity</li>
                                                        <li>Petite</li>
                                                        <li>Tall</li>
                                                    </ul>
                                                    <ul>
                                                        <div className={styles.whomen}>Top Trendings</div>
                                                        <li>Fall Collection</li>
                                                        <li>Pastel Collection</li>
                                                        <li>Spring Collection</li>
                                                        <li>Summer Collection</li>

                                                    </ul>
                                                    <ul>
                                                        <div className={styles.whomen}>Fashion Style</div>
                                                        <li>18th Century</li>
                                                        <li>19th Century</li>
                                                        <li>20th Century</li>
                                                        <li>21th Century</li>
                                                    </ul>
                                                    <ul>
                                                        <div className={styles.whomen}>New in</div>
                                                        <li>Coats & Jackets</li>
                                                        <li>Dresses</li>
                                                        <li>Hoodies & Sweatshirts</li>
                                                        <li>Jeans</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.navEntity}>
                                    <p>Men</p>
                                    <CaretDown/>
                                    <div className={`${styles.navDropDown} ${styles.manDropDown}`}>
                                        <div className={styles.dropDownContent}>
                                            <div className={styles.navbarDropdown}>
                                                <div className={styles.dropDownContentmen}>
                                                    <div className={styles.flex1}>
                                                        <ul>
                                                            <div className={styles.whomen}>Men Clothings</div>
                                                            <li>Men</li>
                                                            <li>Coats & Jackets</li>
                                                            <li>Hoodies</li>
                                                            <li>Pants</li>
                                                            <li>Shirts</li>
                                                            <li>Shorts</li>
                                                        </ul>
                                                        <ul>
                                                            <div className={styles.whomen}>Shop by Activity</div>
                                                            <li>Activities</li>
                                                            <li>Back to School</li>
                                                            <li>Casual Clothings</li>
                                                            <li>Sport Clothings</li>
                                                            <li>Summer Clothings</li>
                                                            <li>Vacation & Wedding</li>
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
                                    <p>Miscelanious</p>
                                    <CaretDown/>
                                    <div className={`${styles.navDropDown} ${styles.kidsDropDown}`}>
                                        <div className={styles.kidsDropContent}>
                                            <div className={styles.dropLink}>
                                                <Link to={'/blog'}>Blog</Link>
                                            </div>
                                            <div className={styles.dropLink}>
                                                <Link to={'/about'}>About</Link>
                                            </div>
                                            <div className={styles.dropLink}>
                                                <Link to={'/contact'}>Contact</Link>
                                            </div>
                                            <div className={styles.dropLink}>
                                                <Link to={"/wishlist"}>Wishlist</Link>
                                            </div>
                                            <div className={styles.dropLink}>
                                                <Link to={"/basket"}>Cart</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <Link to="/" className={styles.headerLogo}>
                            <img
                                src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/themes/nooni/images/logo.png"
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
                                            <Link to={"/account"} className={styles.welcomeUser}>Welcome, {accountDetails.name}</Link>
                                            <span onClick={handleExitAccount}>
                                                <Power  weight="fill" />
                                                Log Out
                                            </span>
                                        </>
                                        :
                                        <>
                                            <Link to="/login">Login</Link>
                                            <Link to="/register">Register</Link>
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
                                <h3>Cart ({cartItems?.length})</h3>
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
                                                            ${(product.salePrice * product.count).toFixed(2)}
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
                                        <p>Subtotal:</p>
                                        <p>${calculateSubtotal()?.toFixed(2)}</p>
                                    </div>
                                    <div className={styles.basketBtn}>
                                        <Link to={'/basket'}>view cart</Link>
                                    </div>
                                    <div className={styles.basketBtn}>
                                        checkout
                                    </div>
                                </div>
                            </>
                            :
                            <div className={styles.basketEmpty}>
                                <img src="/images/cart.png" alt="Cart"/>
                                <p>Your cart is curently empty</p>
                            </div>
                        }

                    </div>
                </div>

                <div className={`${styles.sideMenuOverlay} ${menuOpen ? styles.overlayVisible : ""}`}>
                    <div className={`${styles.sideMenuWrapper}`}>
                        <div className={styles.navEntity}>
                            <a href="">Home</a>
                            <CaretRight fontSize={"20px"}/>
                            <div className={styles.elementDropdown}>
                                <div className={styles.dropDownTitle}>
                                    <a href="">Furniture 1</a>
                                    <a href="">Furniture 2</a>
                                    <a href="">Furniture 3</a>
                                    <a href="">Fashion 1</a>
                                    <a href="">Furniture </a>
                                    <a href="">Fashion 2</a>
                                    <a href="">Fashion 3</a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.navEntity}>
                            <a href="">Shop</a>
                            <CaretRight fontSize={"20px"}/>
                            <div className={styles.elementDropdown}>
                                <div className={styles.dropDownTitle}>
                                    <a href="">Furniture 1</a>
                                    <a href="">Furniture 2</a>
                                    <a href="">Furniture 3</a>
                                    <a href="">Fashion 1</a>
                                    <a href="">Furniture </a>
                                    <a href="">Fashion 2</a>
                                    <a href="">Fashion 3</a>
                                </div>
                            </div>

                        </div>
                        <div className={styles.navEntity}>
                            <a href="">Product</a>
                            <CaretRight fontSize={"20px"}/>
                            <div className={styles.elementDropdown}>
                                <div className={styles.dropDownTitle}>
                                    <a href="">Furniture 1</a>
                                    <a href="">Furniture 2</a>
                                    <a href="">Furniture 3</a>
                                    <a href="">Fashion 1</a>
                                    <a href="">Furniture </a>
                                    <a href="">Fashion 2</a>
                                    <a href="">Fashion 3</a>
                                </div>
                            </div>

                        </div>
                        <div className={styles.navEntity}>
                            <a href="">Blog</a>
                            <CaretRight fontSize={"20px"}/>
                            <div className={styles.elementDropdown}>
                                <div className={styles.dropDownTitle}>
                                    <a href="">Furniture 1</a>
                                    <a href="">Furniture 2</a>
                                    <a href="">Furniture 3</a>
                                    <a href="">Fashion 1</a>
                                    <a href="">Furniture </a>
                                    <a href="">Fashion 2</a>
                                    <a href="">Fashion 3</a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.navEntity}>
                            <a href="">About</a>
                        </div>
                        <div className={styles.navEntity}>
                            <a href="">Contact Us</a>
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
