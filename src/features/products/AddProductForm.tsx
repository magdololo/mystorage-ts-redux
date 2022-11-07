import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {useForm, SubmitHandler, Controller} from 'react-hook-form';

import {AutocompleteWithUserProducts} from "./AutocompleteWithUserProducts";
import AutocompleteWithCategoriesTitle from "../categories/AutocompleteWithCategoriesTitle";

import {selectCurrentStorage, selectUser} from "../../slices/usersSlice";
import {addUserProduct, UserProduct} from "../../slices/userProductsSlice";
import {
    Category,
    selectAllCategoriesSortedByRequired,
    selectCategoryByPath,
    selectDefaultCategory
} from "../../slices/categoriesSlice";

import {Alert, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import plLocale from 'date-fns/locale/pl';
import {MenuItem} from "@mui/material";
import 'react-datepicker/dist/react-datepicker.css';

import {useTranslation} from "react-i18next";
import addCategoryForm from "../categories/AddCategoryForm";
import {useParams} from "react-router-dom";

export type FormValues = {
    expireDate: Date | null
    productName: string
    category: Category | null
    capacity: number | null
    unit: string
    quantity: number | null
};

type AddProductFormProps = {
    handleCloseAddProduct: () => void
    isShownAddProductModal: boolean

}
export type AutocompleteWithUserProductsProps = {
    onChange: (data: any) => void
    value: string
    setSelectedProductFromAutocomplete: (userProduct: UserProduct) => void;
    //setNewProductName: (data: string) => void
}
export type AutocompleteWithCategoriesTitleProps = {
    onChange: (data: any) => void
    value: Category | null
    disabled: boolean


}
const AddProductForm = ( {handleCloseAddProduct, isShownAddProductModal}: AddProductFormProps,) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [selectedProductFromAutocomplete, setSelectedProductFromAutocomplete] = useState<UserProduct | null>(null);
    const currentStorageId = useAppSelector(selectCurrentStorage)
    const user = useSelector(selectUser)
    const uid = user ? user.uid : ""
    const currentCategory = useAppSelector<Category | null>((state) => state.categories.currentCategory)
    console.log(currentCategory)
    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: {errors}
    } = useForm<FormValues>();
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (!isShownAddProductModal) {
            reset()
            setSelectedProductFromAutocomplete(null)
        }
    }, [isShownAddProductModal, reset])
    useEffect(() => {
        if (selectedProductFromAutocomplete) {
            setValue('capacity', selectedProductFromAutocomplete.capacity);
            setValue('unit', selectedProductFromAutocomplete.unit);
        }
    }, [selectedProductFromAutocomplete, setValue]);
    const closeModal = () => {
        setErrorMessage('');
        setSelectedProductFromAutocomplete(null)
        reset();
        handleCloseAddProduct();
    }
    const onSubmit: SubmitHandler<FormValues> = data => {
            console.log(data)
            let userProduct: UserProduct = {
                productId: "",
                name: data.productName,
                categoryId: data.category ? data.category.id ?? "" : "",
                capacity: data.capacity ?? 0,
                unit: data.unit,
                quantity: data.quantity ?? 0,
                expireDate: data.expireDate,
                userId: currentStorageId!!,
                id: ""


            }
            dispatch(addUserProduct(userProduct))
            closeModal();

        }
    const units = [
        {
            value: 'gr',
        },
        {
            value: 'ml',
        },
        {
            value: 'kg',
        },
        {
            value: 'szt',
        },
        {
            value: 'l',

        }

    ];
    const {categoryPath} = useParams();
    const categoryFromPath = useAppSelector(selectCategoryByPath(categoryPath ?? "")) as Category
    const requiredCategory = useAppSelector(selectDefaultCategory) as Category

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Box id="modal-modal-description" sx={{mt: 2, width: "80%", marginLeft: "10%"}}>
                        <Controller
                            name="category"
                            control={control}
                            rules={{required: true}}
                             defaultValue={categoryFromPath ? categoryFromPath : requiredCategory}
                            render={({field: {onChange, value}}) => (
                                <AutocompleteWithCategoriesTitle
                                    value={value}
                                    onChange={onChange}
                                    disabled={!!currentCategory}
                                />
                            )}
                        />
                    </Box>
                    {errors.category && (<p className="text-xs text-red ml-10">{t("products.AddProductForm.validationCategoryName")}</p>)}
                    <Box id="modal-modal-description" sx={{mt: 2, width: "80%", marginLeft: "10%"}}>
                        <Controller
                            name="productName"
                            control={control}
                            rules={{required: true}}
                            render={({field: {onChange, value}}) => (<>
                                <AutocompleteWithUserProducts
                                    value={value ?? ""}
                                    onChange={onChange}
                                    setSelectedProductFromAutocomplete={setSelectedProductFromAutocomplete}
                                    //setNewProductName={setNewProductName}

                                />
                                </>
                            )}
                        />
                    </Box>
                    {errors.productName && (<p className="text-xs text-red ml-10">{t("products.AddProductForm.validationProductName")}</p>)}
                    <Box id="modal-modal-description" sx={{mt: 2, width: "100%"}}>
                        <Controller
                            name="capacity"
                            control={control}
                            rules={{required: true, min: 1}}
                            defaultValue={1}//{product ? product.capacity : "100"}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField sx={{width: "35%", marginLeft: "10%"}}
                                           id="standard-number"
                                           label={t("products.AddProductForm.label_capacity")}
                                           type="number"
                                           value={value}
                                           onChange={onChange}
                                           error={!!error}
                                           helperText={error ? error.message : null}
                                           variant="standard"
                                />
                            )}
                        />
                        <Controller
                            name="unit"
                            control={control}
                            rules={{required: true}}
                            defaultValue={"kg"}//{product ? product.unit : "gr"}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField sx={{width: "35%", marginRight: "10%", marginLeft: "10%"}}
                                           id="standard-select-currency"
                                           select
                                           label={t("products.AddProductForm.label_unit")}
                                           onChange={onChange}
                                           value={value}
                                           error={!!error}
                                           helperText={error ? error.message : null}
                                           variant="standard"
                                           type="text"
                                >
                                    {units.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Box>
                    {errors.capacity && (<p className="text-xs text-red ml-10">{t("products.AddProductForm.validationCapacity")}</p>)}
                    <Box>
                        <Controller
                            name="expireDate"
                            control={control}
                            defaultValue={null}
                            render={({field: {onChange, value}}) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns} locale={plLocale}>
                                    <DatePicker
                                        mask={'__.__.____'}
                                        label={t("products.AddProductForm.label_expireDate")}
                                        value={value}
                                        onChange={onChange}
                                        renderInput={(params) => <TextField {...params}
                                                                            sx={{width: "80%", marginLeft: "10%", marginTop:"5%"}}/>}/>
                                </LocalizationProvider>
                            )}
                        />
                    </Box>

                    <Box id="modal-modal-description" sx={{mt: 2}}>
                        <Controller
                            name="quantity"
                            control={control}
                            rules={{required: true, min: 1}}
                            defaultValue={1}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    sx={{width: "80%", marginLeft: "10%"}}
                                    //id="outlined-number"
                                    label={t("products.AddProductForm.label_quantity")}
                                    type="number"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                        />
                    </Box>
                    {errors.quantity && (<p className="text-xs text-red ml-10">{t("products.AddProductForm.validationQuantity")}</p>)}

                    {errorMessage !== '' ? <Alert severity="error">{errorMessage}</Alert> : null}
                    <Box sx={{marginLeft: "10%"}}><button className="mt-4 text-sm bg-purple  text-white uppercase font-bold py-4 px-4 border-purple rounded shadow-xs leading-6" type={"submit"}>{t("buttons.addProduct")}</button></Box>
                </Box>
            </form>
        </>
    )
}
export default AddProductForm;