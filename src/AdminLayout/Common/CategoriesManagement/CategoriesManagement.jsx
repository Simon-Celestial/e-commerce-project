import {useCallback, useContext, useEffect, useState} from 'react';
import styles from "./CategoriesManagement.module.scss";
import {Trash} from "@phosphor-icons/react";
import {Bounce, toast} from "react-toastify";
import axios from "axios";
import {AuthContext} from "../../../Context/AuthContext.jsx";

const defaults = {
    id: null,
    name: ""
}

export const CategoriesManagement = () => {
    const {
        categoryData,
        setCategoryData
    } = useContext(AuthContext);

    const [category, setCategory] = useState(defaults);
    const [isUpdating, setIsUpdating] = useState(false);
    const [shouldUpdate, setShouldUpdate] = useState(Date.now());

    const updateCategories = useCallback(() => {
        setShouldUpdate(Date.now())
    }, []);


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("https://json-server-eta-ten.vercel.app/categories");
                setCategoryData(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            }
        })();
    }, [shouldUpdate]);


    const handleCategoryChange = useCallback((e) => {
        setCategory({...category, name: e.target.value});
    }, [category]);

    const handleDeleteCategory = useCallback(async (id, name) => {
        try {
            setIsUpdating(true);
            await axios.delete(`https://json-server-eta-ten.vercel.app/categories/${id}`);
            updateCategories();
            toast.success(`${name} uğurla silindi!`, {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    }, [updateCategories]);

    const handleUpdateCategory = useCallback(async () => {
        const requestData = {
            name: category.name.trim(),
        };

        if (requestData.name === "") {
            toast.error('Kateqoriya adı boş olmamalıdır', {
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
            await axios.post("https://json-server-eta-ten.vercel.app/categories/", requestData);
            toast.success(`${requestData.name} uğurla əlavə etdi`, {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            updateCategories();
            setCategory(defaults);
        } catch (error) {
            toast.error('Kateqoriya əlavə edərkən xəta baş verdi', {
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
    }, [category, updateCategories]);

    return (
        <div className={styles.categoriesWrapper}>
            <div className={styles.allCategories}>
                {categoryData?.map((category) => {
                    return (
                        <div key={category?.id} className={styles.categoryEntity}>
                            {category?.name}
                            <div className={`${styles.deleteCategory} ${isUpdating ? styles.disabled : ""}`}
                                 onClick={() => handleDeleteCategory(category?.id, category?.name)}
                            >
                                <Trash/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.categoriesButtons}>
                <div className={styles.categoryInput}>
                    <input
                        placeholder="Add Category Name"
                        type="text"
                        onChange={handleCategoryChange}
                        value={category.name}
                    />
                </div>
                <div className={`${styles.addButton} ${isUpdating ? styles.disabled : ""}`}
                     onClick={handleUpdateCategory}
                >
                    Add category
                </div>
            </div>

        </div>
    );
};

