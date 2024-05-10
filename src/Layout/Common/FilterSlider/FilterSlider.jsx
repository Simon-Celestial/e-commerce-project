import styles from "./FilterSlider.module.scss";
import RangeSlider from "react-range-slider-input";
import "./sliderStyles.css";


export const FilterSlider = ({onApplyFilters, onReset, priceBounds, setPriceBounds}) => {

    return (
        <div className={styles.rangeWrapper}>
            <RangeSlider
                min={0}
                max={1000}
                step={5}
                value={priceBounds}
                onInput={setPriceBounds}
            />
            <div className={styles.priceWrapper}>
                <div className={styles.monitorBlock}>
                    <p>Price:</p>
                    <div className={styles.monitor}>
                        {"$" + priceBounds[0]?.toFixed(2)}
                    </div>
                    <span>-</span>
                    <div className={styles.monitor}>
                        {"$" + priceBounds[1]?.toFixed(2)}
                    </div>
                </div>
                <div className={styles.filterButtons}>
                    <div className={styles.filterButton}
                         onClick={onApplyFilters}>
                        filter
                    </div>
                    <div className={styles.filterButton} onClick={onReset}>
                        reset
                    </div>
                </div>
            </div>
        </div>
    )
}