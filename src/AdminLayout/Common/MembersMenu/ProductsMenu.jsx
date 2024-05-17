import styles from "./ProductsMenu.module.scss";
import {X} from "@phosphor-icons/react";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Bounce, toast} from "react-toastify";
import {ThreeCircles} from "react-loader-spinner";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



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
    title: '',
    regularPrice: 0,
    salePrice: 0,
    frontImage: '',
    backImage: "",
    category: ""
};
const ProductsMenu = ({setMenuOpen, menuOpen, update, selectedItem, setSelectedItem, setIsUpdating, isUpdating}) => {


    const [inputState, setInputState] = useState(defaults);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInputState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setInputState(prevState => ({
            ...prevState,
            category: selectedCategory,
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
    const handleAcceptImage = useCallback(async (e,imageType) => {
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
            [imageType]: result,
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
            title: inputState?.title,
            regularPrice: Number(inputState?.regularPrice),
            salePrice: Number(inputState?.salePrice),
            frontImage: inputState?.frontImage,
            backImage: inputState?.backImage,
            category: inputState?.category
        };
        try {
            setIsUpdating(true);
            if (inputState.id) {
                await axios.put(
                    `http://localhost:8000/products/${inputState.id}`,
                    requestData
                );
                toast.success('Product Edited Successfully', {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    transition: Bounce,
                });
            } else {
                await axios.post("http://localhost:8000/products/", requestData);
                toast.success('Product Added Successfully', {
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
            toast.error('Failed to add product', {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            console.log(error)
        } finally {
            setIsUpdating(false);
        }
    }, [inputState])

    return (
        <div className={`${styles.menuWrapper} ${menuOpen ? styles.menuVisible : ""}`}>
            <div className={styles.menuContainer}>
                <div className={styles.menuHeading}>
                    <div className={styles.headingTitle}>
                        <h1>{selectedItem ? "Edit Product" : "Add Product"}</h1>
                        <p>{selectedItem ? "Edit selected product" : "Add new product"}</p>
                    </div>
                    <div className={styles.closeMenu} onClick={handleMenuClose}>
                        <X/>
                    </div>
                </div>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputRow}>
                        <p>Title :</p>
                        <input type="text"
                               name="title"
                               id="title"
                               placeholder="Enter Product Name"
                               onChange={handleInputChange}
                               value={inputState.title}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <p>Regular Price :</p>
                        <input type="number"
                               name="regularPrice"
                               id="regularPrice"
                               placeholder="Product Regular Price"
                               onChange={handleInputChange}
                               value={inputState.regularPrice}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <p>Sale Price :</p>
                        <input type="number"
                               name="salePrice"
                               id="salePrice"
                               placeholder="Product Sale Price"
                               onChange={handleInputChange}
                               value={inputState.salePrice}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <p>Category :</p>
                        <FormControl sx={{ m: 1, minWidth: 370 }} size="small">
                            <InputLabel
                                id="demo-select-small-label"
                                classes={{
                                    root: styles.customSelect
                                }}
                            >Category</InputLabel>
                            <Select
                                classes={{ root: styles.customMenuItem }}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={inputState.category}
                                label="Category"
                                onChange={handleCategoryChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem  value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Kids"}>Kids</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={`${styles.inputRow} ${styles.viewImageRow}`}>
                        <p>Front Image :</p>
                        <div className={styles.imageBox}>
                            <img
                                onClick={() => setInputState(prev => ({
                                    ...prev,
                                    frontImage: null,
                                }))}
                                src={inputState?.frontImage || '/images/noImage.png'}
                                alt="Product Image"/>
                        </div>

                        <div className={styles.imageInputWrapper}>
                            <input className={styles.imageInput}
                                   type="file"
                                   accept="image/*,.jpeg,.jpg,.png,.webp"
                                   name="image"
                                   id="image"
                                   onChange={(e) => handleAcceptImage(e, 'frontImage')}
                            />
                        </div>
                    </div>
                    <div className={`${styles.inputRow} ${styles.viewImageRow}`}>
                        <p>Back Image :</p>
                        <div className={styles.imageBox}>
                            <img
                                onClick={() => setInputState(prev => ({
                                    ...prev,
                                    backImage: null,
                                }))}
                                src={inputState?.backImage || '/images/noImage.png'}
                                alt="Product Image"/>
                        </div>
                        <div className={styles.imageInputWrapper}>
                            <input className={styles.imageInput}
                                   type="file"
                                   accept="image/*,.jpeg,.jpg,.png,.webp"
                                   name="image"
                                   id="image"
                                   onChange={(e) => handleAcceptImage(e, 'backImage')}
                            />
                        </div>
                    </div>
                </div>
                .
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
                            <span>{selectedItem ? "Edit Product" : "Add Product"}</span>
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

export default ProductsMenu;