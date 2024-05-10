import React from 'react'
import styles from "./Contact.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const Contact = () => {
  return (
    <>
      <div className={styles.contactUs}>
        <Header />
        <main className={styles.contactWrapper}>
          <section className={styles.contactImages}>
            <div className={styles.contactOverlay}>
              <h1>Get in touch with us. Send us a message</h1>
            </div>
          </section>
          <section className={styles.contactInput}>
            <div className={styles.containerContact}>
              <div className={styles.containerBox}>
                <div className={styles.conatinerLeft}>
                  <h2>Contact Us</h2>
                  <div className={styles.contactTell}>
                    <h4>Call to Us:</h4>
                    <p>We’re available 24/7, 7 days a week.</p>
                    <a href=''>+08 9229 8228</a>
                  </div>
                  <div className={styles.contactTell}>
                    <h4>Write to Us:</h4>
                    <p>Fill out our form and we will contact you within 24 hours.</p>
                    <a href=''>Email: Support1234@Jaroti</a>
                  </div>
                  <div className={styles.contactTell}>
                    <h4>Headquarter:</h4>
                    <p>Monday – Friday: 9:00-20:00</p>
                    <p>Saturady: 11:00 – 15:00</p>
                    <a href=''>123 Atlantic, Brooklyn, New York, USA</a>
                  </div>
                </div>
                <div className={styles.containerRight}>
                  <h2>We would love to hear from you.</h2>
                  <div className={styles.containerFrom}>
                    <div className={styles.subjectInput}>
                      <input type='text' placeholder='Name *'></input>
                      <input type='Email' placeholder='E - Email'></input>
                    </div>
                    <input type='text' placeholder='Subject *'></input>
                    <textarea name="" id="" cols="30" rows="10" width="100%" placeholder='Message'></textarea>
                    <button>SEND MESSAGE</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.contactLocation}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317716.6064073197!2d-0.43123970044350396!3d51.52860701956136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2zTG9uZG9uLCBCaXJsyZnFn21pxZ8gS3JhbGzEsXE!5e0!3m2!1saz!2saz!4v1714584164893!5m2!1saz!2saz"
              width="100%"
              height="600"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>


          </section>
        </main>
        <Footer />
      </div>
    </>

  )
}

export default Contact
