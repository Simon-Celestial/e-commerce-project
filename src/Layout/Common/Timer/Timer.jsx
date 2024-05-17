import  { useState, useEffect } from 'react';
import { DotOutline } from "@phosphor-icons/react";
import styles from "./Timer.module.scss";

export const Timer = () => {
    const endDate = new Date('2024-05-25');
    const targetTime = endDate.getTime();

    const [elapsedTime, setElapsedTime] = useState(0);

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
                <span>Days</span>
            </div>
            <div className={styles.separator}>
                <DotOutline weight="fill" />
                <DotOutline weight="fill" />
            </div>
            <div className={styles.counter}>
                <p>{hours < 10 ? `0${hours}` : hours}</p>
                <span>Hours</span>
            </div>
            <div className={styles.separator}>
                <DotOutline weight="fill" />
                <DotOutline weight="fill" />
            </div>
            <div className={styles.counter}>
                <p>{minutes < 10 ? `0${minutes}` : minutes}</p>
                <span>Minutes</span>
            </div>
            <div className={styles.separator}>
                <DotOutline weight="fill" />
                <DotOutline weight="fill" />
            </div>
            <div className={styles.counter}>
                <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
                <span>Seconds</span>
            </div>
        </div>
    )
}

