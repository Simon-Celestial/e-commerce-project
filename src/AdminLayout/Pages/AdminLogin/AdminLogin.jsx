import styles from "./AdminLogin.module.scss";
import {Eye, EyeSlash, Key, User} from "@phosphor-icons/react";
import {useCallback, useContext, useState} from "react";
import axios from "axios";
import {Bounce, toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../Context/AuthContext.jsx";


export const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywidXNlcm5hbWUiOiJ1c2VyMTIzIiwiaWF0IjoxNjg0MzEyMzQ4LCJleHAiOjE2ODQzMTU5NDh9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

const AdminLogin = () => {

    const {
        setToken
    } = useContext(AuthContext);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginLoading,setLoginLoading] = useState(false);

    const navigate = useNavigate();


    const handleViewPassword = useCallback(() => {
        setPasswordVisible(prevState => !prevState)
    }, [setPasswordVisible]);

    const adminLogIn = useCallback(async (e) => {
        e.preventDefault();
        try {
            setLoginLoading(true);
            const response = await axios.get("http://localhost:8000/admins");
            const admin = response.data;
            const adminWithEmail = admin.find(
                (adminData) =>
                    adminData?.adminEmail === email
            );
            const adminWithPassword = admin.find(
                (adminData) =>
                    adminData?.adminPassword === password
            );
            if (adminWithEmail && adminWithPassword) {
                localStorage.setItem("token", JSON.stringify(adminToken));
                setToken(localStorage.getItem("token"));
                toast.success(`Hesabınıza uğurla daxil oldunuz.`, {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                navigate("/admin/dashboard");
            } else if(!adminWithEmail) {
                toast.error(`Belə hesab mövcud deyil.`, {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
            else if(!adminWithPassword) {
                toast.error(`Bu hesab üçün şifrə yanlışdır.`, {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error("Error:", error);
        }
        finally {
            setLoginLoading(false);
        }
    }, [email,password, navigate,setLoginLoading,setToken]);
    return (
        <section className={styles.adminLoginSection}>
            <div className={styles.loginPanel}>
                <div className={styles.inputWrapper}>
                    <div className={styles.iconBox}>
                        <User weight="fill"/>
                    </div>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"/>
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.iconBox}>
                        <Key weight="fill"/>
                    </div>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={passwordVisible ? "text" : "password"} className={styles.password}/>
                    <div className={styles.viewPass} onClick={handleViewPassword}>
                        {passwordVisible ? <EyeSlash/> : <Eye/>}
                    </div>
                </div>
                <div className={styles.loginBtn}
                onClick={adminLogIn}
                style={{
                    opacity: loginLoading? "0.3" : "1",
                    pointerEvents : loginLoading? "none" : "all"
                }}>
                        LOGIN
                </div>
            </div>
        </section>
    );
};

export default AdminLogin;