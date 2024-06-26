import {useState, useEffect, useCallback} from 'react';
import styles from "./LoginAndRegister.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PageHeading from '../../Common/PageHeading/PageHeading';
import {Link, useNavigate} from 'react-router-dom';
import {Bounce, toast} from 'react-toastify';
import axios from 'axios';
import {Eye, EyeSlash} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";


const Register = () => {
    const {t} = useTranslation();
    const [user, setUser] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
        userPhone: "",

    });

    const [confirmPassword, setConfirmPassword] = useState("");


    const [passwordBtnsStates, setPasswordBtnsStates] = useState({
        mainPass: false,
        confirmPass: false
    });

    const handlePassView = useCallback((btnName) => {
        setPasswordBtnsStates(prevState => ({
            ...prevState,
            [btnName]: !prevState[btnName]
        }));
    }, [setPasswordBtnsStates]);

    const navigate = useNavigate();

    const handleConfirmPass = useCallback((e) => {
        setConfirmPassword(e.target.value);
    },[setConfirmPassword]);

    const addUser = useCallback(async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("https://json-server-eta-ten.vercel.app/users");
            const data = response.data;
            let serverEmail = data.find((userData) => userData.userEmail === user.userEmail);
            if (serverEmail) {
                toast.error(`Belə hesab artıq mövcuddur.`, {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            } else {
                if (user.userPassword.length >= 6 && confirmPassword === user.userPassword) {
                    await axios.post("https://json-server-eta-ten.vercel.app/users/", user, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    toast.success(`Uğurla qeydiyyatdan keçmisiz`, {
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                    navigate("/login");
                    setUser({
                        userName: "",
                        userEmail: "",
                        userPassword: "",
                        userPhone: ""
                    });
                } else {
                    toast.error(`Şifrə ən azı altı simvoldan ibarət olmalıdır və şifrə təsdiqi ilə uyğun olmalıdır.`, {
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                }
            }
        } catch (error) {
            console.error("Hata:", error);
        }
    }, [user, confirmPassword, navigate]);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <>
            <Header/>
            <main className={styles.pageWrapper}>
                <div className={styles.pageContent}>
                    <PageHeading title={t("main.register.registerRegister")}/>
                    <div className={styles.formContainer}>
                        <form onSubmit={addUser}>
                            <div className={styles.inputContainer}>
                                <p>{t("main.register.registerEmailAddress")} <span>*</span></p>
                                <input
                                    type="email"
                                    required
                                    placeholder={t("main.register.registerEmail")}
                                    onChange={(e) => setUser({...user, userEmail: e.target.value})}
                                    value={user.userEmail}/>
                            </div>
                            <div className={styles.inputContainer}>
                                <p>{t("main.register.registerUsername")} <span>*</span></p>
                                <input
                                    style={{
                                        textTransform: "capitalize"
                                    }}
                                    type="text" placeholder= {t("main.register.registerUsername")}
                                    onChange={(e) => setUser({...user, userName: e.target.value})}
                                    value={user.userName}
                                    required
                                />
                            </div>
                            <div className={`${styles.inputContainer}`}>
                                <p>{t("main.register.registerPassword")} <span>*</span></p>
                                <div className={styles.passInputWrapper}>
                                    <div className={styles.viewBtn} onClick={() => handlePassView('mainPass')}>
                                        {passwordBtnsStates.mainPass ? <Eye/> : <EyeSlash/>}
                                    </div>
                                    <input
                                        type={passwordBtnsStates.mainPass ? "text" : "password"}
                                        required
                                        placeholder= {t("main.register.registerPassword")}
                                        onChange={(e) => setUser({...user, userPassword: e.target.value})}
                                        value={user.userPassword}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputContainer}>
                                <p>{t("main.register.registerConfirmPassword")} <span>*</span></p>
                                <div className={styles.passInputWrapper}>
                                    <div className={styles.viewBtn} onClick={() => handlePassView('confirmPass')}>
                                        {passwordBtnsStates.confirmPass ? <Eye/> : <EyeSlash/>}
                                    </div>
                                    <input
                                        type={passwordBtnsStates.confirmPass ? "text" : "password"}
                                        placeholder= {t("main.register.registerConfirmPassword")}
                                        onChange={handleConfirmPass}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.inputContainer}>
                                <p>{t("main.register.registerPhoneNumber")}</p>
                                <input
                                    type="tel" placeholder="+994XXXXXXX"
                                    onChange={(e) => setUser({...user, userPhone: e.target.value})}
                                    value={user.userPhone}
                                />
                            </div>
                            <button type="submit" className={styles.submitButton}>{t("main.register.registerRegister")}</button>
                            <div className={styles.redirect}>
                                <Link to="/login">{t("main.register.registerAlreadyHaveAnd")}</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Register;

