import styles from "./Search.module.scss";
import {MagnifyingGlass, ShootingStar, X} from '@phosphor-icons/react';
import {Link} from "react-router-dom";
import {useCallback, useContext, useMemo, useState,useEffect} from "react";
import {DataContext} from "../../../Context/DataContext.jsx";

const getColorForRating = (rating) => {
    if (rating === 0) {
        return "#808080";
    } else if (rating >= 1 && rating < 3) {
        return "#FF0000";
    } else if (rating === 3) {
        return "#ff9100";
    } else if (rating === 4) {
        return "#03c503";
    } else if (rating === 5) {
        return "#015901";
    } else {
        return "#000000";
    }
}

const Search = ({searchOpen, setSearchOpen}) => {

    const {
        productsData,
    } = useContext(DataContext);


    const [searchState, setSearchState] = useState("");
    const [shouldFilterUpdate, setShouldFilterUpdate] = useState(Date.now());


    const handleSearchProducts = useCallback((e) => {
        setSearchState(e.target.value);
    }, [setSearchState]);

    const filteredProducts = useMemo(() => {
        if (shouldFilterUpdate && searchState !== "") {
            return productsData?.filter((product) => {
                const title = product.title.toLowerCase();
                const searchQuery = searchState.toLowerCase();
                return title.includes(searchQuery);
            });
        } else {
            return [];
        }
    }, [shouldFilterUpdate, searchState, productsData]);

    const handleCloseSearch = useCallback(() => {
        setSearchOpen(prev => !prev)
    }, [setSearchOpen])

    useEffect(() => {
        const action = () => {
            setSearchOpen(false);
        }
        document.addEventListener("click", action);
        return () => {
            document.removeEventListener("click", action);
        };
    }, []);


    return (
        <div className={`${styles.searchOverlay} ${searchOpen ? styles.searchVisible : ""}`}>
            <div className={styles.searchWrapper} onClick={ev => ev.stopPropagation()}>
                <div className={styles.searchContent}>
                    <div className={styles.heading}>
                        <p>Search for products ({filteredProducts?.length})</p>
                        <div className={styles.closeSearch} onClick={handleCloseSearch}>
                            <X/>
                        </div>
                    </div>
                    <div className={styles.searchInputContainer}>
                        <input type="text"
                               onChange={handleSearchProducts}
                               placeholder='Enter product name...'
                        />
                        <div className={styles.searchBtn}>
                            <MagnifyingGlass/>
                        </div>
                    </div>
                    <div className={styles.resultsContainer}>
                        {filteredProducts?.map((product) => {
                            return (
                                <div key={product.id} className={styles.resultCard}>
                                    <Link className={styles.image} to={`/details/${product.id}`}>
                                        <img
                                            src={product.frontImage}
                                            alt="Result Image"/>
                                    </Link>
                                    <div className={styles.cardTitle}>
                                        <Link to={`/details/${product.id}`}>
                                            {product.title}
                                        </Link>
                                        <div className={styles.price}>
                                            {product.regularPrice ? <p>AZN {product.regularPrice.toFixed(2)}</p> : null}
                                            AZN {product.salePrice?.toFixed(2)}
                                        </div>
                                        <div className={styles.rating} style={{
                                            color: getColorForRating(product.rating)
                                        }}>
                                            <ShootingStar weight="fill"/>
                                            <p>({product.rating})</p>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
