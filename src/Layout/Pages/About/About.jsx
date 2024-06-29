import styles from "./About.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PageHeading from '../../Common/PageHeading/PageHeading';
import {useTranslation} from "react-i18next";
import workTitleData from "/public/data/WorkTitleData/workTitleData.json";
import teamMembersData from "/public/data/TeamMembersData/teamMembersData.json";
import {useMemo} from "react";
import sponsorsData from "/public/data/SponsorsData/sponsorsData.json";
import {Link} from "react-router-dom";
import {FacebookLogo, InstagramLogo, LinkedinLogo, TwitterLogo} from "@phosphor-icons/react";


const About = () => {
    const {t, i18n} = useTranslation();

    const translatedWorkData = useMemo(() => {
        if (i18n.language === "en") {
            return workTitleData.en;
        } else if (i18n.language === "ru") {
            return workTitleData.ru;
        } else if (i18n.language === "az") {
            return workTitleData.az;
        }
    }, [i18n.language, workTitleData]);

    const translatedMembersData = useMemo(() => {
        if (i18n.language === "en") {
            return teamMembersData.en;
        } else if (i18n.language === "ru") {
            return teamMembersData.ru;
        } else if (i18n.language === "az") {
            return teamMembersData.az;
        }

    },[teamMembersData,i18n.language])
    return (
        <>
            <Header/>
            <main className={styles.aboutMain}>
                <PageHeading title={t("main.about.aboutAbout")}/>
                <section className={styles.topSection}>
                    <div className={styles.sectionContent}>
                        <p>{t("main.about.aboutBoutique")}</p>
                    </div>
                </section>
                <section className={styles.imageSection}>
                    <div className={styles.imageBox}>
                        <h1>{t("main.about.newManCollection")}</h1>
                        <img src="https://corsen.qodeinteractive.com/wp-content/uploads/2022/09/left-home-img-2.jpg"
                             alt="Wide Picture"/>
                    </div>
                </section>
                <section className={styles.workSection}>
                    <div className={styles.sectionContent}>
                        <div className={styles.imageBlock}>
                            <img src="https://corsen.qodeinteractive.com/wp-content/uploads/2022/09/Shop-list-img-9.jpg"
                                 alt="Man Image"/>
                        </div>
                        <div className={styles.titleBlock}>
                            <h2>{t("main.about.howDoWeWork")} ?</h2>
                            {translatedWorkData?.map((workData)=>{
                                return (
                                    <div key={workData?.id} className={styles.textBlock}>
                                        <h2>{workData?.title}</h2>
                                        <p>{workData?.description}</p>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </section>
                <section className={styles.teamSection}>
                    <div className={styles.sectionContent}>
                        <h2>{t("main.about.aboutOurTeam")}</h2>
                        <div className={styles.teamContainer}>
                            {translatedMembersData?.map((member)=>{
                                return (
                                    <div key={member?.id} className={styles.memberBlock}>
                                        <div className={styles.memberImg}>
                                            <div className={styles.socialIcons}>
                                                <Link to={"#"}>
                                                    <FacebookLogo />
                                                </Link>
                                                <Link to={"#"}>
                                                    <TwitterLogo />
                                                </Link>
                                                <Link to={"#"}>
                                                    <InstagramLogo />
                                                </Link>
                                                <Link to={"#"}>
                                                    <LinkedinLogo />
                                                </Link>
                                            </div>
                                            <img
                                                src={member?.image}
                                                alt={member?.name}/>
                                        </div>
                                        <p>{member?.job}</p>
                                        <h2>{member?.name}</h2>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </section>
                <section className={styles.contactSection}>
                 <div className={styles.sectionContent}>
                     <div className={styles.sectionTitle}>
                         <h1>{t("main.about.aboutWeDeliver")}</h1>
                         <p>{t("main.about.aboutConnections")}</p>
                         <Link to={"/contact"}>{t("main.contact.contactUs")}</Link>
                     </div>
                 </div>
                </section>
                <section className={styles.sponsorsSection}>
                    <div className={styles.sectionContent}>
                        {sponsorsData?.map((sponsor)=> {
                            return (
                                <div key={sponsor?.id} className={styles.sponsorBlock}>
                                    <img
                                        src={sponsor?.image}
                                        alt="Sponsor Logo"/>
                                </div>
                            )
                        })}

                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default About
