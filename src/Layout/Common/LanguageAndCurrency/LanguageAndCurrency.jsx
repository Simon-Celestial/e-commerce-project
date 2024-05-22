import styles from "./LanguageAndCurrency.module.scss";
import languages from "/public/data/languages.json";
import {CaretDown} from "@phosphor-icons/react";
import {useTranslation} from "react-i18next";
import {useCallback, useContext, useMemo} from "react";
import {DataContext} from "../../../Context/DataContext.jsx";
import currencyData from "/public/data/currency.json";


export const LanguageAndCurrency = () => {
    const {
        currencyState,
        setCurrencyState,
    } = useContext(DataContext);

    const {i18n } = useTranslation();

    const selectedLanguage = useMemo(() => {
        if (i18n.language === "en") {
            return "English"
        } else if (i18n.language === "az") {
            return "Azərbaycan"
        } else if (i18n.language === "ru") {
            return "Русский"
        }
    }, [i18n.language])


    const changeLanguageHandler = useCallback((language) => {
        i18n.changeLanguage(language);
    }, [i18n.changeLanguage]);

    const languageClickHandler = useCallback((id) => {
        changeLanguageHandler(id);
    }, [changeLanguageHandler]);

    const currencyClickHandler = useCallback((currency) => {
        setCurrencyState(currency);
    }, [setCurrencyState]);

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.containerEntity}>
                {selectedLanguage}
                <CaretDown/>
                <div className={styles.dropDownContainer}>
                    <div className={styles.dropDownBox}>
                        {languages?.map(language => {
                            return (
                                <p className={i18n.language === language.id ? styles.selected : ""} key={language.id}
                                   onClick={() => languageClickHandler(language.id)}>
                                    {language.name}
                                </p>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.containerEntity}>
                <p className={styles.currency}>{currencyState}</p>
                <CaretDown/>
                <div className={styles.dropDownContainer}>
                    <div className={styles.dropDownBox}>
                        {currencyData.map((type) => {
                            return (
                                <p key={type.id}
                                   className={`${styles.currency}
                                   ${type.id === currencyState ? styles.selected : null}`}
                                   onClick={() => currencyClickHandler(type.id)}
                                >{type.name}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}