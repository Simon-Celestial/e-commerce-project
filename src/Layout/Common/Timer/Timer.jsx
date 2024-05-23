import  { useState, useEffect } from 'react';
import { DotOutline } from "@phosphor-icons/react";
import styles from "./Timer.module.scss";
import { useTranslation } from "react-i18next";

export const Timer = () => {
    const endDate = new Date('2024-06-01');
    const targetTime = endDate.getTime();

    const [elapsedTime, setElapsedTime] = useState(0);
    const {t} = useTranslation();

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now();
            const difference = targetTime - currentTime;
            setElapsedTime(difference);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime]);

    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);

    return (
        <div className={styles.timerWrapper}>
            <div className={styles.counter}>
                <p>{days < 10 ? `0${days}` : days}</p>
                <span>{t('main.homePage.timer.days')}</span>
            </div>
            <div className={styles.separator}>
                <DotOutline weight="fill" />
                <DotOutline weight="fill" />
            </div>
            <div className={styles.counter}>
                <p>{hours < 10 ? `0${hours}` : hours}</p>
                <span>{t('main.homePage.timer.hours')}</span>
            </div>
            <div className={styles.separator}>
                <DotOutline weight="fill" />
                <DotOutline weight="fill" />
            </div>
            <div className={styles.counter}>
                <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
                <span>{t('main.homePage.timer.minutes')}</span>
            </div>
            <div className={styles.separator}>
                <DotOutline weight="fill" />
                <DotOutline weight="fill" />
            </div>
            <div className={styles.counter}>
                <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
                <span>{t('main.homePage.timer.seconds')}</span>
            </div>
        </div>
    )
}

