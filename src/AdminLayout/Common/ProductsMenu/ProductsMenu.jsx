import styles from "./ProductsMenu.module.scss";
import {X} from "@phosphor-icons/react";
import {useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";
import {Bounce, toast} from "react-toastify";
import {ThreeCircles} from "react-loader-spinner";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import {AuthContext} from "../../../Context/AuthContext.jsx";




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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const AVAILABLE_SIZES = [
    's',
    'xs',
    'm',
    'l',
    'xl',
    'xxl',
];


const defaults = {
    id: null,
    title: '',
    regularPrice: "",
    salePrice: "",
    frontImage: null,
    backImage: null,
    category: "",
    rating: "",
    size: [],
    hot: false,
    quantity: 0,
    description: "",
};

function getStyles(name, selectedSizes) {
    return {
        fontWeight:
            selectedSizes.indexOf(name) === -1
                ? 400
                : 600,
    };
}
const ProductsMenu = ({setMenuOpen, menuOpen, update, selectedItem, setSelectedItem, setIsUpdating, isUpdating}) => {

    const {
        categoryData,
    } = useContext(AuthContext);


    const [inputState, setInputState] = useState(selectedItem || defaults);


    const handleSizeChange = (event) => {
        const {
            target: { value },
        } = event;
        setInputState(prevState => ({
            ...prevState,
            size: typeof value === 'string' ? value.split(',') : value,
        }));
    };


    const handleInputChange = useCallback((e) => {
        const {name, value} = e.target;
        setInputState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleCategoryChange = useCallback((e) => {
        const selectedCategory = e.target.value;
        setInputState(prevState => ({
            ...prevState,
            category: selectedCategory,
        }));
    }, [setInputState]);

    const handleRatingChange = useCallback((e) => {
        const selectedRating = e.target.value;
        setInputState(prevState => ({
            ...prevState,
            rating: selectedRating,
        }));
    }, [setInputState]);


    const handleHotChange = useCallback((e) => {
        const value = e.target.value === 'yes';
        setInputState(prevState => ({
            ...prevState,
            hot: value,
        }));
    }, []);

    useEffect(() => {
        if (selectedItem) {
            setInputState({
                ...selectedItem,
            })
        } else {
            setInputState(defaults);
        }
    }, [selectedItem]);

    const handleAcceptImage = useCallback(async (e, imageType) => {
        const file = e.target.files[0];
        e.target.value = '';
        if (file.size > 1000 * 1000 * 150) {
            toast.error(`Şəkil çox böyükdür`,
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
            toast.error(`Şəkil çox kiçikdir`,
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
            title: inputState?.title.trim(),
            regularPrice: Number(inputState?.regularPrice),
            salePrice: Number(inputState?.salePrice),
            frontImage: inputState?.frontImage,
            backImage: inputState?.backImage,
            category: inputState?.category,
            rating: Number(inputState?.rating),
            size: inputState?.size,
            hot: inputState?.hot,
            quantity: Number(inputState?.quantity),
            description: inputState?.description.trim()
        };

        if (
            !requestData.title ||
            !requestData.description ||
            !requestData.salePrice ||
            !requestData.category ||
            requestData.size.length === 0 ||
            !requestData.rating ||
            !requestData.frontImage
        ) {
            toast.error('Bütün tələb olunan sahələri doldurun', {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            return;
        }
        try {
            setIsUpdating(true);
            if (selectedItem) {
                await axios.put(
                    `http://localhost:8000/products/${inputState.id}`,
                    requestData
                );
                toast.success(`${requestData.title} uğurla redaktə edildi`, {
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
                toast.success(`${requestData.title} uğurla əlavə edildi`, {
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
            toast.error('Məhsul əlavə edərkən xəta baş verdi', {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            console.log(error);
        } finally {
            setIsUpdating(false);
        }
    }, [inputState, selectedItem]);

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
                        <p>Title : <b>*</b></p>
                        <input type="text"
                               name="title"
                               id="title"
                               placeholder="Enter Product Name"
                               onChange={handleInputChange}
                               value={inputState.title}
                        />
                    </div>
                    <div className={`${styles.inputRow} ${styles.descriptionRow}`}>
                        <p>Description : <b>*</b></p>
                        <textarea
                            placeholder="Poduct Description"
                            name="description"
                            id="description"
                            onChange={handleInputChange}
                            value={inputState.description}
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
                        <p>Sale Price : <b>*</b></p>
                        <input type="number"
                               name="salePrice"
                               id="salePrice"
                               placeholder="Product Sale Price"
                               onChange={handleInputChange}
                               value={inputState.salePrice}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <p>Quantity :</p>
                        <input type="number"
                               name="quantity"
                               id="quantity"
                               placeholder="Enter Product Qunantity"
                               onChange={handleInputChange}
                               value={inputState.quantity}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <p>Rating :</p>
                        <Box sx={{minWidth: 318, border: '1px solid #323641'}}
                        className={styles.muiBox}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"
                                            classes={{
                                                root: styles.customSelect
                                            }}
                                >Rating
                                </InputLabel>
                                <Select
                                    classes={{root: styles.customMenuItem}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={inputState?.rating}
                                    label="rating"
                                    onChange={handleRatingChange}
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className={styles.inputRow}>
                        <p>Category : <b>*</b></p>
                        <FormControl
                            sx={{m: 1, minWidth: 308, border: '1px solid #323641'}}
                            size="small"
                            className={styles.muiBox}>
                            <InputLabel
                                id="demo-select-small-label"
                                classes={{
                                    root: styles.customSelect
                                }}
                            >Category</InputLabel>
                            <Select
                                classes={{root: styles.customMenuItem}}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={inputState.category}
                                label="Category"
                                onChange={handleCategoryChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {categoryData?.map((category) => {
                                    return (
                                        <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={styles.inputRow}>
                        <p>Size : <b>*</b></p>
                        <FormControl sx={{m: 1, width: 308, border: '1px solid #323641'}}
                                     className={styles.muiBox}>
                            <InputLabel
                                id="demo-multiple-name-label"
                                classes={{
                                    root: styles.customSelect
                                }}
                            >Size</InputLabel>
                            <Select
                                classes={{root: styles.customMenuItem}}
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={inputState.size}
                                onChange={handleSizeChange}
                                input={<OutlinedInput label="Size"/>}
                                MenuProps={MenuProps}
                            >
                                {AVAILABLE_SIZES?.map((size) => (
                                    <MenuItem
                                        key={size}
                                        value={size}
                                        style={getStyles(size, inputState.size)}
                                    >
                                        {size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </div>
                    <div className={`${styles.inputRow} ${styles.viewImageRow}`}>
                        <p>Front Image : <b>*</b></p>
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
                    <div className={styles.inputRow}>
                        <p>Hot :</p>
                        <FormControl sx={{m: 1, minWidth: 305, border: '1px solid #323641'}} size="small"
                                     className={styles.muiBox}
                        >
                            <InputLabel
                                id="demo-select-small-label"
                                classes={{
                                    root: styles.customSelect
                                }}>Hot</InputLabel>
                            <Select
                                classes={{root: styles.customMenuItem}}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={inputState.hot ? 'yes' : 'no'}
                                label="hot"
                                onChange={handleHotChange}
                            >
                                <MenuItem value={"no"}>No</MenuItem>
                                <MenuItem value={"yes"}>Yes</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                </div>
                .
                <div className={styles.menuFooter}>
                    <button
                        disabled={isUpdating}
                        className={`${styles.button} ${styles.add}`} onClick={handleUpdateData}
                         style={{
                             opacity: isUpdating ? 0.5 : 1,
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
                    </button>
                    <div className={`${styles.button} ${styles.cancel}`} onClick={handleMenuClose}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsMenu;