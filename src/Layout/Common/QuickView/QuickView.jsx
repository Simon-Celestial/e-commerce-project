import styles from "./QuickView.module.scss";
import {useCallback, useContext} from "react";
import {DataContext} from "../../../Context/DataContext.jsx";
import {SingleProductCard} from "../SingleProductCard/SingleProductCard.jsx";
import {X} from "@phosphor-icons/react";
export const QuickView = () => {
    const {
        quickView,
        setQuickView,
        selectedProduct,
    } = useContext(DataContext);


const handleCloseQuickView = useCallback(()=> {
    setQuickView(prevState => !prevState);
},[setQuickView]);


    return (
        <>
            <div className={`${styles.quickViewOverlay} ${quickView && styles.visible}`}>
                <div className={styles.quickViewContent}>
                    <div className={styles.closeBtn} onClick={handleCloseQuickView}>
                        <X/>
                    </div>
                    {selectedProduct?.map((product) => {
                        return (
                            <SingleProductCard key={product.id} product={product}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}