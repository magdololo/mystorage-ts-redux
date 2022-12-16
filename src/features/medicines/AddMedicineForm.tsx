import {Category, selectCategoryByPath, selectDefaultCategory} from "../../slices/categoriesSlice";
import {UserProduct} from "../../slices/userProductsSlice";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../app/store";
import React, {useEffect, useState} from "react";
import {selectCurrentStorage} from "../../slices/usersSlice";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import AutocompleteWithCategoriesTitle from "../categories/AutocompleteWithCategoriesTitle";
import {AutocompleteWithUserProducts} from "../products/AutocompleteWithUserProducts";
import {Alert, MenuItem, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import plLocale from "date-fns/locale/pl";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {UserMedicine} from "../../slices/allMedicinesSlice";
import {addUserMedicine} from "../../slices/userMedicineSlice";

export type FormValues = {
    expireDate: Date | null
    openDate: Date | null
    productName: string
    category: Category | null
    capacity: number | null
    unit: string
    quantity: number | null
    validityDate: number
};

type AddProductFormProps = {
    handleCloseAddProduct: () => void
    isShownAddProductModal: boolean

}
export type AutocompleteWithUserMedicinesProps = {
    onChange: (data: any) => void
    value: string
    setSelectedProductFromAutocomplete: (userProduct: UserProduct) => void;

}
export type AutocompleteWithCategoriesTitleProps = {
    onChange: (data: any) => void
    value: Category | null
    disabled: boolean


}
const AddMedicineForm = ({handleCloseAddProduct, isShownAddProductModal}: AddProductFormProps,) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [selectedProductFromAutocomplete, setSelectedProductFromAutocomplete] = useState<UserProduct | null>(null);
    const currentStorageId = useAppSelector(selectCurrentStorage)

    const currentCategory = useAppSelector<Category | null>((state) => state.categories.currentCategory)
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
        let userMedicine: UserMedicine = {
            medicineId: "",
            name: data.productName,
            categoryId: data.category ? data.category.id ?? "" : "",
            capacity: data.capacity ?? 0,
            unit: data.unit,
            quantity: data.quantity ?? 0,
            expireDate: data.expireDate,
            openDate: data.openDate,
            validityDate: data.validityDate,
            userId: currentStorageId!!,
            id: ""
        }
        dispatch(addUserMedicine(userMedicine))
        closeModal();

    }
    const units = [
        {
            value: 'opak',
        },
        {
            value: 'ml',
        },
        {
            value: 'szt',
        },
        {
            value: 'blister',

        },
        {
            value: 'box'
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
                    {errors.category && (
                        <p className="text-xs text-red ml-10">{t("products.AddProductForm.validationCategoryName")}</p>)}
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

                                    />
                                </>
                            )}
                        />
                    </Box>
                    {errors.productName && (
                        <p className="text-xs text-red ml-10">{t("products.AddProductForm.validationProductName")}</p>)}
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
                            defaultValue={"opak"}//{product ? product.unit : "gr"}
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
                    {errors.capacity && (
                        <p className="text-xs text-red ml-10">{t("products.AddProductForm.validationCapacity")}</p>)}
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
                                                                            sx={{
                                                                                width: "80%",
                                                                                marginLeft: "10%",
                                                                                marginTop: "5%"
                                                                            }}/>}/>
                                </LocalizationProvider>
                            )}
                        />
                    </Box>
                    <Box>
                        <Controller
                            name="openDate"
                            control={control}
                            defaultValue={null}
                            render={({field: {onChange, value}}) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns} locale={plLocale}>
                                    <DatePicker
                                        mask={'__.__.____'}
                                        label={t("products.AddProductForm.label_openDate")}
                                        value={value}
                                        onChange={onChange}
                                        renderInput={(params) => <TextField {...params}
                                                                            sx={{
                                                                                width: "80%",
                                                                                marginLeft: "10%",
                                                                                marginTop: "5%"
                                                                            }}/>}/>
                                </LocalizationProvider>
                            )}
                        />
                    </Box>
                    <Box id="modal-modal-description" sx={{mt: 2}}>
                        <Controller
                            name="validityDate"
                            control={control}
                            rules={{required: true, min: 1}}
                            defaultValue={1}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    sx={{width: "80%", marginLeft: "10%"}}
                                    //id="outlined-number"
                                    label={t("products.AddProductForm.label_validity")}
                                    type="number"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
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
                    {errors.quantity && (
                        <p className="text-xs text-red ml-10">{t("products.AddProductForm.validationQuantity")}</p>)}

                    {errorMessage !== '' ? <Alert severity="error">{errorMessage}</Alert> : null}
                    <Box sx={{marginLeft: "10%"}}>
                        <button
                            className="mt-4 text-sm bg-purple  text-white uppercase font-bold py-4 px-4 border-purple rounded shadow-xs leading-6"
                            type={"submit"}>{t("buttons.addProduct")}</button>
                    </Box>
                </Box>
            </form>
        </>
    )
}
export default AddMedicineForm