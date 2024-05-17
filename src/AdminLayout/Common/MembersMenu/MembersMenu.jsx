import styles from "./MembersMenu.module.scss";
import {X} from "@phosphor-icons/react";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Bounce, toast} from "react-toastify";
import {ThreeCircles} from "react-loader-spinner";

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error)
        };
    });
};
const defaults = {
    id: null,
    name: '',
    surname: '',
    position: '',
    photo: '',
};
const MembersMenu = ({setMenuOpen, menuOpen, update, selectedItem, setSelectedItem, setIsUpdating, isUpdating}) => {


    const [inputState, setInputState] = useState(defaults);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInputState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    useEffect(() => {
        if (selectedItem) {
            setInputState({
                ...selectedItem,
            })
        } else {
            setInputState(defaults);
        }
    }, [selectedItem])
    const handleAcceptImage = useCallback(async (e) => {
        const file = e.target.files[0];
        e.target.value = '';
        if (file.size > 1000 * 1000 * 150) {
            toast.error(`File is too big`,
                {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                }
            );
            e.target.value = '';
            return;
        }
        if (file.size < 1000 * 5) {
            toast.error(`File is too small`,
                {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                }
            );
            e.target.value = '';
            return;
        }
        const result = await getBase64(file);
        setInputState((prev) => ({
            ...prev,
            photo: result,
        }))

    }, []);

    const handleMenuClose = useCallback(() => {
        setMenuOpen(prevState => !prevState);
        setTimeout(() => {
            setSelectedItem(null)
        }, 200);
    }, [setMenuOpen]);
    useEffect(() => {
        if (!menuOpen)
            setInputState(defaults);
    }, [menuOpen]);


    const handleUpdateData = useCallback(async () => {
        const requestData = {
            name: inputState.name,
            surname: inputState.surname,
            position: inputState.position,
            photo: inputState?.photo || '/images/noImage.jpg'
        };
        try {
            setIsUpdating(true);
            if (inputState.id) {
                await axios.put(
                    `https://azizrahimov-001-site1.ftempurl.com/api/TeamMember/update?id=${inputState.id}`,
                    requestData
                );
                toast.success('Member Edited Successfully', {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    transition: Bounce,
                });
            } else {
                await axios.post("https://azizrahimov-001-site1.ftempurl.com/api/TeamMember/create", requestData);
                toast.success('Member Added Successfully', {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    transition: Bounce,
                });
            }
            update();
            handleMenuClose();
        } catch (error) {
            toast.error('Failed to create member', {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
        } finally {
            setIsUpdating(false);
        }
    }, [inputState])

    return (
        <div className={`${styles.menuWrapper} ${menuOpen ? styles.menuVisible : ""}`}>
            <div className={styles.menuContainer}>
                <div className={styles.menuHeading}>
                    <div className={styles.headingTitle}>
                        <h1>{selectedItem ? "Edit Member" : "Add Member"}</h1>
                        <p>{selectedItem ? "Edit team member" : "Add new team member"}</p>
                    </div>
                    <div className={styles.closeMenu} onClick={handleMenuClose}>
                        <X/>
                    </div>
                </div>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputRow}>
                        <p>Name :</p>
                        <input type="text"
                               name="name"
                               id="name"
                               onChange={handleInputChange}
                               value={inputState.name}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <p>Surname :</p>
                        <input type="text"
                               name="surname"
                               id="surname"
                               onChange={handleInputChange}
                               value={inputState.surname}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <p>Position :</p>
                        <input type="text"
                               name="position"
                               id="position"
                               onChange={handleInputChange}
                               value={inputState.position}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <p>Image :</p>
                        <div className={styles.imageInputWrapper}>
                            <input className={styles.imageInput}
                                   type="file"
                                   accept="image/*,.jpeg,.jpg,.png,.webp"
                                   name="photo"
                                   id="photo"
                                   onChange={handleAcceptImage}
                            />
                        </div>
                    </div>
                    <div className={`${styles.inputRow} ${styles.viewImageRow}`}>
                        <p>View Image :</p>
                        <div className={styles.imageBox}>
                            <img
                                onClick={() => setInputState(prev => ({
                                    ...prev,
                                    photo: null,
                                }))}
                                src={inputState?.photo || '/images/noImage.jpg'}
                                alt="NoMail team"/>
                        </div>
                    </div>
                </div>
                <div className={styles.menuFooter}>
                    <div className={`${styles.button} ${styles.add}`} onClick={handleUpdateData}
                         style={{
                             opacity: isUpdating ? 0.5 : 1,
                             pointerEvents: isUpdating ? "none" : "all"
                         }}
                    >
                        {isUpdating ? (
                            <ThreeCircles
                                visible={true}
                                height="23"
                                width="23"
                                color="black"
                                ariaLabel="three-circles-loading"
                            />
                        ) : (
                            <span>{selectedItem ? "Edit Member" : "Add Member"}</span>
                        )}
                    </div>
                    <div className={`${styles.button} ${styles.cancel}`} onClick={handleMenuClose}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembersMenu;