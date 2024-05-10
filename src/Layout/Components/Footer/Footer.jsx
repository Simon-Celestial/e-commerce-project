import React from 'react'
import styles from './Footer.module.scss'
const Footer = () => {
  return (
    <footer className= {styles.footerWrapper}>
      <div className={styles.footerContainer}>
      <div className={styles.footerLeft}>
        <div className={styles.footerLogo}>
          <img src="https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2022/12/logo.png"></img>
          <p>Sed quis quam ligula. Ut urna tellus, sagittis id libero nec, aliquet vehicula sem. Curabitur mattis lacus ante, a sodales dolor mollis eu.</p>
        </div>
        <div className={styles.footerTime}>
          <p>Tel:(234)23-45-666</p>
          <p>Mon-Fri: 8am – 8pm</p>
          <p>Sat-Sun: 8am – 7pm</p>
        </div>
      </div>
      <div className={styles.footerRight}>
        <div className={styles.footerEmail}>
          <h1>SIGN UP FOR EMAILS</h1>
          <p>Enjoy 15% off* your first order when you sign up to our newsletter</p>
          <form action=''>
            <input type='email' placeholder='Your e-mail address'></input>
            <button>SUBSCRIBE</button>
          </form>
        </div>
        <div className={styles.footerList}>
          <ul>
            <li>Our Story</li>
            <li>Careers</li>
            <li>Influencers</li>
            <li>Join our team</li>
          </ul>
          <ul>
            <li>Contact Us</li>
            <li>Customer Service</li>
            <li>Find Store</li>
            <li>Shipping & Returns</li>
          </ul>
          <ul>
            <li>Interior Design</li>
            <li>Room Planner</li>
            <li>Our Projects</li>
            <li>Design Chat</li>
          </ul>
        </div>
      </div>
      </div>
    </footer>
  )
}

export default Footer

