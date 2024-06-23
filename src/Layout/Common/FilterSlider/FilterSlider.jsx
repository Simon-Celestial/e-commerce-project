import styles from "./FilterSlider.module.scss";
import RangeSlider from "react-range-slider-input";
import "./sliderStyles.css";
import {useContext} from "react";
import {DataContext} from "../../../Context/DataContext.jsx";
import { useTranslation } from "react-i18next";

export const FilterSlider = ({onApplyFilters, onReset, priceBounds, setPriceBounds}) => {
    const {t} = useTranslation();
    const {
        currencyConverter,
        currencyState

    } = useContext(DataContext);

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
                    <p>{t("main.filterSlider.filter")}:</p>
                    <div className={styles.monitor}>
                        {(currencyState === "azn"? "AZN" : "$") + " " + currencyConverter(priceBounds[0])?.toFixed(2)}
                    </div>
                    <span>-</span>
                    <div className={styles.monitor}>
                        {(currencyState === "azn"? "AZN" : "$") + " " + currencyConverter(priceBounds[1])?.toFixed(2)}
                    </div>
                </div>
                <div className={styles.filterButtons}>
                    <div className={styles.filterButton}
                         onClick={onApplyFilters}>
                       {t("main.filterSlider.Sliderfilter")}
                    </div>
                    <div className={styles.filterButton} onClick={onReset}>
                       {t("main.filterSlider.Sliderreset")}
                    </div>
                </div>
            </div>
        </div>
    )
}