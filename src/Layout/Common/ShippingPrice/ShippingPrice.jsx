
import styles from './ShippingPrice.module.scss';
import {useCallback, useContext,useMemo} from "react";
import {DataContext} from "../../../Context/DataContext.jsx";
import {BasketContext} from "../../../Context/BasketContext.jsx";
import SHIPPING_TYPES from "/public/data/ShippingData/shippingData.json";
import {useTranslation} from "react-i18next";



export const ShippingPrice = () => {
    const {
        currencyConverter,
        currencyState
    } = useContext(DataContext);

    const {
        shippingTypeId,
        setShippingTypeId,
    } = useContext(BasketContext);

    const {i18n} = useTranslation();

    const handleShippingPrice = useCallback((id) => {
        setShippingTypeId(id);
    }, []);

    const translatedData = useMemo(() => {
        if (i18n.language === "en") {
            return SHIPPING_TYPES.en;
        } else if (i18n.language === "ru") {
            return SHIPPING_TYPES.ru;
        } else {
            return SHIPPING_TYPES.az;
        }
    }, [i18n.language]);
    return(
        <div className={styles.priceWrapper}>
            {
                translatedData?.map((type) => {
                    return (
                        <div key={type.id} className={styles.flatRate}>
                            <input
                                type='checkbox'
                                name="priceSelect"
                                onChange={() => handleShippingPrice(type.id)}
                                checked={type.id === shippingTypeId}
                            />
                            <label>{type.type}: {currencyConverter(type.price)?.toFixed(2)} {currencyState === "azn"? "AZN" : "$"}</label>
                        </div>
                    )
                })
            }
        </div>
    )
}