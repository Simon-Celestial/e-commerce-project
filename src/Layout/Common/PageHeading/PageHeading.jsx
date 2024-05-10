import React from 'react'
import styles from "./PageHeading.module.scss";
import { Link } from 'react-router-dom';

const PageHeading = ({title}) => {
  return (
    <section className={styles.pageHeadingSection}>
    <div className={styles.contentWrapper}>
      <div className={styles.breadcrumb}>
        <div className={styles.breadTitle}>
          <div className={styles.breadTitlebox}>
            <Link to="/">Home</Link>
            /
            <span>{title}</span>
          </div>
          <div className={styles.breadTitlebox}>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default PageHeading
