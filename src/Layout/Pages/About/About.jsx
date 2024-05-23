import React from 'react'
import styles from "./About.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PageHeading from '../../Common/PageHeading/PageHeading';
import {TwitterLogo,FacebookLogo,InstagramLogo,LinkedinLogo} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

const About = () => {
  const {t} = useTranslation();
  return (
    <div className={styles.aboutWrapper}>
        <Header/>
      <main>
      <PageHeading title= {t("main.about.aboutAbout")} />
      <div className={styles.aboutContact}>
        <div className={styles.aboutContainer}>
            <section className={styles.aboutNooni}>
              <div className={styles.aboutNooniText}>
              <h1>{t("main.about.aboutNooni")}</h1>
                <p>{t("main.about.nooniWas")}</p>
              </div>
            </section>
            <section className={styles.aboutImage}>
              <img src='https://demo.theme-sky.com/nooni-fashion/wp-content/uploads/2023/08/about-parallax-1.jpg' alt=''></img>
            </section>

            <section className={styles.aboutSection}>
              <div className={styles.sectionContact}>
              <div className={styles.sectionLeft}>
              <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/08/about-3-1.jpg' alt=''></img>
              </div>
              <div className={styles.sectionRight}>
              <div className={styles.sectionText}>
                <h1>{t("main.about.aboutHowWe")}</h1>
                <div className={styles.textBox}>
                 <h3>{t("main.about.aboutProductionDesing")}</h3>
                 <p>{t("main.about.aboutIntegerDignissim")}</p>
                </div>
                <div className={styles.textBox}>
                <h3>{t("main.about.aboutManufacturing")}</h3>
                 <p>{t("main.about.aboutMaecenasSem")}</p>
                </div>
                <div className={styles.textBox}>
                <h3>{t("main.about.aboutMarketing")}</h3>
                <p>{t("main.about.aboutRutrum")}</p>
                </div>
              </div>
              </div>
              </div>
             
             <div className={styles.aboutTeam}>
              <div className={styles.aboutText}>
                <h1>{t("main.about.aboutOurTeam")}</h1>
              </div>
              <div className={styles.aboutSlider}>
                <div className={styles.aboutSliderWrapper}>
                  <div className={styles.aboutCard}>
                    <div className={styles.cardImage}>
                      <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2021/04/team-3.jpg' alt=''></img>
                      <div className={styles.aboutOverley}>
                      <TwitterLogo size={30} color='white' />
                      <FacebookLogo size={30} color='white'/>
                      <InstagramLogo size={30} color ='white'/>
                      <LinkedinLogo size={30} color='white' />
                      </div>
                    </div>
                    <div className={styles.aboutCardText}>
                      <h3>{t("main.about.aboutGraphicDesign")}</h3>
                      <p>Chris Patterson</p>
                    </div>
                  </div> 
                  <div className={styles.aboutCard}>
                  <div className={styles.cardImage}>
                      <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2021/04/team-4.jpg' alt=''></img>
                      <div className={styles.aboutOverley}>
                      <TwitterLogo size={30} color='white' />
                      <FacebookLogo size={30} color='white'/>
                      <InstagramLogo size={30} color ='white'/>
                      <LinkedinLogo size={30} color='white' />
                      </div>
                    </div>
                    <div className={styles.aboutCardText}>
                      <h3>{t("main.about.aboutMarketings")}</h3>
                      <p>Isabella</p>
                    </div>
                  </div>
                  <div className={styles.aboutCard}>
                  <div className={styles.cardImage}>
                      <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2021/04/team-1.jpg' alt=''></img>
                      <div className={styles.aboutOverley}>
                      <TwitterLogo size={30} color='white' />
                      <FacebookLogo size={30} color='white'/>
                      <InstagramLogo size={30} color ='white'/>
                      <LinkedinLogo size={30} color='white' />
                      </div>
                    </div>
                    <div className={styles.aboutCardText}>
                      <h3>{t("main.about.aboutCeoFounder")}</h3>
                      <p>John Hossain</p>
                    </div>
                  </div>
                  <div className={styles.aboutCard}>
                  <div className={styles.cardImage}>
                      <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2021/04/team-2.jpg' alt=''></img>
                      <div className={styles.aboutOverley}>
                      <TwitterLogo size={30} color='white' />
                      <FacebookLogo size={30} color='white'/>
                      <InstagramLogo size={30} color ='white'/>
                      <LinkedinLogo size={30} color='white' />
                      </div>
                    </div>
                    <div className={styles.aboutCardText}>
                      <h3>{t("main.about.aboutSaler")}</h3>
                      <p>Charlotte</p>
                    </div>
                  </div>
                </div>
              </div>
             </div>
            </section>

            <section className={styles.aboutContactUs}>
              <div className={styles.aboutUsOverlay}>
                <div className={styles.UsText}>
                <h1>{t("main.about.aboutWeDeliver")}</h1>
                <p>{t("main.about.aboutSedViverra")}</p>
                <button>{t("main.about.aboutContactUs")}</button>
                </div>
              </div>
            </section>

            <section className={styles.companySwapper}>
              <div className={styles.companySwapperSlider}>
                <div className={styles.companyBox}>
                  <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/brand-5.png' alt=''></img>
                </div>
                <div  className={styles.companyBox}>
                  <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/brand-1.png' alt=''></img>
                </div>
                <div  className={styles.companyBox}>
                <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/brand-6.png' alt=''></img>
                </div>
                <div  className={styles.companyBox}>
                  <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/brand-2.png' alt=''></img>
                </div>
                <div  className={styles.companyBox}>
                <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/brand-4.png' alt=''></img>
                </div>
                <div  className={styles.companyBox}>
                <img src='https://nooni-be87.kxcdn.com/nooni-fashion/wp-content/uploads/2023/04/brand-3.png' alt=''></img>
                </div>
              </div>
            </section>
        </div>
      </div>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default About
