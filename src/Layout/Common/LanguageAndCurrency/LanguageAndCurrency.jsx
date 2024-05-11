
import styles from "./LanguageAndCurrency.module.scss";
import languages from "/public/data/languages.json";
import {CaretDown} from "@phosphor-icons/react";
import {useTranslation} from "react-i18next";
import {useCallback, useMemo} from "react";


export const LanguageAndCurrency = () => {
    const { i18n } = useTranslation();


    const selectedLanguage = useMemo(() => {
        if (i18n.language === "en")
        {
            return "English"
        } else if(i18n.language === "az" ) {
            return "Azərbaycan"
        } else if (i18n.language === "ru") {
            return "Русский"
        }
    },[i18n.language])



    const changeLanguageHandler = useCallback((language) => {
        i18n.changeLanguage(language);
    },[i18n.changeLanguage])

    const languageClickHandler = useCallback((id) => {
        changeLanguageHandler(id);
    },[changeLanguageHandler]);

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.containerEntity}>
                {selectedLanguage}
                <CaretDown />
                <div className={styles.dropDownContainer}>
                    <div className={styles.dropDownBox}>
                        {languages?.map(language => {
                            return (
                                <p className={i18n.language === language.id ? styles.selected : ""} key={language.id} onClick={() => languageClickHandler(language.id)}>
                                    {language.name}
                                </p>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.containerEntity}>
                USD
                <CaretDown  />
                <div className={styles.dropDownContainer}>
                    <div className={styles.dropDownBox}>
                        <p>USD</p>
                        <p>EUR</p>
                    </div>
                </div>
            </div>
        </div>

    )
}