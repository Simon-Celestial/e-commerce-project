import styles from "./Shop.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PageHeading from '../../Common/PageHeading/PageHeading';
import ProductCard from '../../Common/ProductCard/ProductCard';
import {FilterSlider} from "../../Common/FilterSlider/FilterSlider.jsx";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {DataContext} from "../../../Context/DataContext.jsx";
import {Loader} from "../../Common/Loader/Loader.jsx";
import {Rows, SquaresFour} from "@phosphor-icons/react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useTranslation } from "react-i18next";

// PAGINATION
const itemsPerPage = 9;

const sizeTypes = [
    {
        id: "xs",
        size: "XS"
    },
    {
        id: "s",
        size: "S"
    },
    {
        id: "m",
        size: "M"
    },
    {
        id: "l",
        size: "L"
    },
    {
        id: "xl",
        size: "XL"
    },
    {
        id: "xxl",
        size: "XXL"
    },
];

const stockStatus = [
    {
        id: "inStock",
        status: "In stock"
    },
    {
        id: "outOfStock",
        status: "Out of Stock"
    },
];


const Shop = () => {
    const {
        productsLoading,
        productsData,
    } = useContext(DataContext);

    const [priceBounds, setPriceBounds] = useState([0, 1000]);
    const [shouldFilterUpdate, setShouldFilterUpdate] = useState(Date.now());
    const [listView, setListView] = useState(false);
    const [gridView, setGridView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const allTypeFilters = useMemo(() => Array.from(new Set(productsData?.map(it => it.category))), [productsData]);
    const [typeFilters, setTypeFilters] = useState(allTypeFilters);
    const [selectedStockStatus, setSelectedStockStatus] = useState(['inStock', 'outOfStock']);
    const [selectedSizes, setSelectedSizes] = useState(["xs", "s", "m", "l", "xl", "xxl"]);
    const {t} = useTranslation();


    // TO MAKE ALL TYPE INPUTS CHECKED
    useEffect(() => {
        setTypeFilters(allTypeFilters);
    }, [allTypeFilters, productsData]);

    // PRICE RANGE FILTER
    const rangeFilteredProducts = useMemo(() => {
        if (shouldFilterUpdate) {
            return productsData?.filter((product) => {
                const price = product?.salePrice;
                return price >= priceBounds[0] && price <= priceBounds[1];
            })
        } else {
            return productsData;
        }
    }, [shouldFilterUpdate, productsData]);

    // CATEGORY FILTER
    const typeFilteredProducts = useMemo(() => {
        return rangeFilteredProducts?.filter(it => typeFilters.includes(it.category))
    }, [rangeFilteredProducts, typeFilters]);
    const typeFilterChanged = useCallback((id, checked) => {
        setTypeFilters(prev => checked ? [...prev, id] : prev?.filter(it => it !== id))
    }, []);


    // STOCK FILTER
    const stockFilteredProducts = useMemo(() => {
        if (selectedStockStatus.length === 0) {
            return [];
        } else {
            return typeFilteredProducts?.filter((product) => {
                const isInStock = product?.quantity > 0;
                return selectedStockStatus.includes(isInStock ? 'inStock' : 'outOfStock');
            });
        }
    }, [selectedStockStatus, typeFilteredProducts]);

    const handleStockFilterChange = useCallback((status, checked) => {
        if (checked) {
            setSelectedStockStatus(prevStatus => [...prevStatus, status]);
        } else {
            setSelectedStockStatus(prevStatus => prevStatus?.filter(s => s !== status));
        }
    }, []);

    const sizeFilteredProducts = useMemo(() => {
        if (selectedSizes.length === 0) {
            return [];
        } else {
            return stockFilteredProducts?.filter(product =>
                selectedSizes.some(size => product?.size?.includes(size))
            );
        }
    }, [selectedSizes, stockFilteredProducts]);

    const handleSizeFilterChange = useCallback((size, checked) => {
        if (checked) {
            setSelectedSizes(prevSizes => [...prevSizes, size]);
        } else {
            setSelectedSizes(prevSizes => prevSizes?.filter(s => s !== size));
        }
    }, []);


    // UPDATE
    const onApply = useCallback(() => setShouldFilterUpdate(Date.now()), []);
    // DELETE ALL FILTERS
    const onReset = useCallback(() => {
        setPriceBounds([0, 1000]);
        setShouldFilterUpdate(null);
        setSelectedStockStatus(['inStock', 'outOfStock']);
        setTypeFilters(allTypeFilters);
        setSelectedSizes(["xs", "s", "m", "l", "xl", "xxl"]);
    }, [setPriceBounds, setShouldFilterUpdate, setSelectedStockStatus, setTypeFilters, allTypeFilters, setSelectedSizes]);

    // PRODUCTLARIN LIST VE YA GRID GORUNUSU
    const handleChangeView = useCallback(() => {
        setListView(prevState => !prevState);
        setGridView(prevState => !prevState);
    }, [setGridView, setListView]);

    // PAGINATION
    const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage,
        [currentPage]);
    const endIndex = useMemo(() => startIndex + itemsPerPage, [startIndex]);
    const handlePageChange = useCallback((event, page) => {
        setCurrentPage(page);
    }, [setCurrentPage]);

    const currentProducts = useMemo(() => {
        return sizeFilteredProducts?.slice(startIndex, endIndex);
    }, [sizeFilteredProducts, startIndex, endIndex]);

    useEffect(() => {
        if (sizeFilteredProducts && sizeFilteredProducts.length > 0 && endIndex > sizeFilteredProducts.length - 1) {
            setCurrentPage(Math.ceil(sizeFilteredProducts?.length / itemsPerPage));
        }
    }, [endIndex, sizeFilteredProducts, setCurrentPage, itemsPerPage]);

    return (
        <>
            {
                productsLoading && <Loader/>
                  
            }
            <div className={styles.shopWrapper}>
                <Header/>
                <main>
                    {/* PAGE HEADING SECTION */}
                    <PageHeading title={t("main.shop.shopShop")}/>

                    {/* CATEGORY SECTION */}
                    <section className={styles.categorySection}>
                        <div className={styles.listContainer}>
                            <div className={styles.listWrapper}>
                                <div className={styles.listBox}>
                                    <div className={styles.listImages}>
                                        <img
                                            src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/08/men-coats.jpg"
                                            alt=""/>
                                    </div>
                                    <div className={styles.listText}>
                                        <h3>{t('main.shop.shopMale')}</h3>
                                        <p>{sizeFilteredProducts
                                            ?.filter(item => item.category === "Male")
                                            .length} {t("main.shop.shopProducts")}</p>
                                    </div>
                                </div>
                                <div className={styles.listBox}>
                                    <div className={styles.listImages}>
                                        <img
                                            src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/08/women-hoodies.jpg"
                                            alt=""/>
                                    </div>
                                    <div className={styles.listText}>
                                        <h3>{t("main.shop.shopFemale")}</h3>
                                        <p>{sizeFilteredProducts
                                            ?.filter(item => item.category === "Female")
                                            .length} {t("main.shop.shopProducts")}</p>
                                    </div>
                                </div>
                                <div className={styles.listBox}>
                                    <div className={styles.listImages}>
                                        <img
                                            src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/03/40-310x310.jpg"
                                            alt=""/>
                                    </div>
                                    <div className={styles.listText}>
                                        <h3>{t("main.shop.shopKids")}</h3>
                                        <p>{sizeFilteredProducts
                                            ?.filter(item => item.category === "Kids")
                                            .length} {t("main.shop.shopProducts")}</p>
                                    </div>
                                </div>
                                <div className={styles.listBox}>
                                    <div className={styles.listImages}>
                                        <img
                                            src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/08/women-jeans.jpg"
                                            alt=""/>
                                    </div>
                                    <div className={styles.listText}>
                                        <h3>{t("main.shop.shopOthers")}</h3>
                                        <p>{sizeFilteredProducts
                                            ?.filter(item => item.category !== "Female" && item.category !== "Male" && item.category !== "Kids")
                                            .length} {t("main.shop.shopProducts")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PRODUCTS SECTION */}
                    <section className={styles.productsSection}>
                        <div className={styles.productsContent}>
                            <div className={styles.filterContainer}>
                                {/*STOCK FILTER*/}
                                <div className={styles.filterInpubox}>
                                    <div className={styles.filterTypeInput}>
                                        {t("main.shop.shopSTOCK")}
                                    </div>
                                    <div className={styles.filterProductfilter}>
                                        <ul className={styles.productCategries}>
                                            {stockStatus?.map((status) => {
                                                const productCount = typeFilteredProducts?.filter(item => item.stockStatus === status.id)?.length || 0;

                                                if (productCount === 0) return <></>
                                                return (
                                                    <li key={status.id} className={styles.cartItem}>
                                                        <input
                                                            type="checkbox"
                                                            onChange={(e) => handleStockFilterChange(status.id, e.target.checked)}
                                                            checked={selectedStockStatus.includes(status.id)}
                                                        />
                                                        {status.status} ({productCount})
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                {/*CATEGORY FILTER*/}
                                <div className={styles.filterInpubox}>
                                    <div className={styles.filterTypeInput}>
                                        TYPE
                                    </div>
                                    <div className={styles.filterProductfilter}>
                                        <ul className={styles.productCategries}>
                                            {
                                                allTypeFilters?.map(tf => {
                                                    const filtered = rangeFilteredProducts?.filter(it => it.category === tf)?.length || 0;
                                                    if (filtered === 0) return <></>;
                                                    return <li
                                                        key={`type_filter_${tf}`}
                                                        style={{
                                                            textTransform: 'capitalize'
                                                        }}
                                                        className={styles.cartItem}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={typeFilters.includes(tf)}
                                                            onChange={ev =>
                                                                typeFilterChanged(tf, ev.target.checked)}
                                                        ></input>
                                                        {tf} ({filtered})
                                                    </li>;
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                {/*PRICE FILTER*/}
                                <div className={styles.filterInpubox}>
                                    <div className={styles.filterTypeInput}>
                                        PRICE
                                    </div>
                                    <div className={`${styles.filterProductfilter} ${styles.rangeContainer}`}>
                                        <FilterSlider
                                            priceBounds={priceBounds}
                                            setPriceBounds={setPriceBounds}
                                            onReset={onReset}
                                            onApplyFilters={onApply}
                                        />
                                    </div>
                                </div>
                                {/*SIZE FILTER*/}
                                <div className={styles.filterInpubox}>
                                    <div className={styles.filterTypeInput}>
                                        SIZE
                                    </div>
                                    <div className={styles.filterProductfilter}>
                                        <ul className={styles.productCategries}>
                                            {sizeTypes?.map((size) => {
                                                const filtered = stockFilteredProducts?.filter(product =>
                                                    product?.size?.some(_size => _size === size.id)
                                                )?.length;
                                                if (filtered === 0) return <></>
                                                return (
                                                    <li key={size.id} className={styles.cartItem}>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedSizes?.includes(size.id)}
                                                            onChange={(e) => handleSizeFilterChange(size.id, e.target.checked)}
                                                        />
                                                        {size.size} ({filtered})
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.productsContainer}>
                                <div className={styles.sortContainer}>
                                    <div className={`${styles.sortBox}`}>
                                        <Rows className={listView ? styles.active : ""} onClick={handleChangeView}/>
                                        <SquaresFour className={gridView ? styles.active : ""}
                                                     onClick={handleChangeView}/>
                                    </div>
                                </div>
                                <div className={`${styles.productCardsWrapper} ${listView ? styles.listView : ""}`}>
                                    {currentProducts?.length < 1 ? (
                                        <div className={styles.noProducts}>
                                            No Products found...
                                        </div>
                                    ) : (
                                        currentProducts?.map((product) => (
                                            <div className={styles.card} key={product.id}>
                                                <ProductCard product={product} listView={listView} id={product.id}/>
                                            </div>
                                        ))
                                    )}

                                </div>

                                {/*PAGINATION*/}
                                <div className={styles.paginationWrapper}>
                                    <Stack spacing={1}>
                                        <Pagination
                                            count={Math.ceil(sizeFilteredProducts?.length / itemsPerPage)}
                                            variant="outlined"
                                            shape="rounded"
                                            size="large"
                                            page={currentPage}
                                            onChange={handlePageChange}
                                        />
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
                <Footer/>
            </div>
        </>
    )
}

export default Shop
