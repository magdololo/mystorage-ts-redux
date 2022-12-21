import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {selectCurrentStorage, selectUser} from "../../slices/usersSlice";
import {Category, selectAllCategories} from "../../slices/categoriesSlice"

import 'react-toastify/dist/ReactToastify.css';
import plLocale from "date-fns/locale/pl";
import {TextField, MenuItem} from "@mui/material";
import Box from "@mui/material/Box";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import AutocompleteWithCategoriesTitle from "../categories/AutocompleteWithCategoriesTitle";
import {editUserProduct, UserProduct} from "../../slices/userProductsSlice";
import {useTranslation} from "react-i18next";
import {editUserMedicine, UserMedicine} from "../../slices/userMedicineSlice";


type EditProductFormProps = {
    handleClose: () => void
    isShown: boolean
}
type EditFormValues = {

    newExpireDate: Date | null
    newProductName: string
    newCategory: Category | null
    newCapacity: number | null
    newUnit: string
    newQuantity: number | null
    newOpenDate: Date | null
    newValidityDate: number
}
const EditProductForm = ({handleClose}: EditProductFormProps) => {
    const {t} = useTranslation()
    const user = useAppSelector(selectUser)
    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: {errors}
    } = useForm<EditFormValues>();
    const currentStorageId = useAppSelector(selectCurrentStorage)
    const editProduct = useAppSelector(state => state.userProducts.editProduct)
    const editMedicine = useAppSelector(state => state.userMedicines.editMedicine)
    const allCategories = useAppSelector(selectAllCategories)
    const editProductCategory = allCategories.find(category => category.id === editProduct?.categoryId)

    const dispatch = useAppDispatch()

    // const notify = () => toast.success('🦄 Zmiany zostały dodane!', {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //
    // });

    const units = [
        {value: 'gr'},
        {value: 'ml'},
        {value: 'kg'},
        {value: 'szt'},
        {value: 'l'}];

    const unitsMedicines = [
        {value: 'szt'},
        {value: 'opak'},
        {value: 'blister'},
        {value: 'box'},
        {value: 'ml'}
    ];

    useEffect(() => {
        if (editProductCategory) {
            setValue('newCategory', editProductCategory);
        }
    }, [editProductCategory, setValue]);

    const closeModal = () => {
        reset();
        handleClose();
    }


    const onSubmit: SubmitHandler<EditFormValues> = data => {
        if (currentStorageId === user?.uid) {
            console.log(data)
            let updatedProduct: UserProduct = {
                productId: editProduct?.productId ?? "",
                name: data.newProductName,
                categoryId: data.newCategory?.id ?? "",
                capacity: data.newCapacity ?? 0,
                unit: data.newUnit,
                quantity: data.newQuantity ?? 1,
                expireDate: data.newExpireDate,
                userId: currentStorageId!!,
                id: editProduct?.id ?? ""

            }
            dispatch(editUserProduct(updatedProduct))
            closeModal()
        } else if (currentStorageId === "pharmacy" + user?.uid) {
            console.log(data)
            let updatedMedicine: UserMedicine = {
                medicineId: editMedicine?.medicineId ?? "",
                name: data.newProductName,
                categoryId: data.newCategory?.id ?? "",
                capacity: data.newCapacity ?? 0,
                unit: data.newUnit,
                quantity: data.newQuantity ?? 1,
                expireDate: data.newExpireDate,
                openDate: data.newOpenDate,
                validityDate: data.newValidityDate,
                userId: currentStorageId!!,
                id: editProduct?.id ?? ""

            }
            dispatch(editUserMedicine(updatedMedicine))
            closeModal()
        }

    }
    console.log(editProduct)
    console.log(editMedicine)
    console.log(currentStorageId)
    console.log(user!!.uid)
    console.log(allCategories)
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box>
                    <Box id="modal-modal-description" sx={{mt: 2, width: "80%", marginLeft: "10%"}}>
                        <Controller
                            name="newCategory"
                            control={control}
                            rules={{required: true}}
                            defaultValue={editProductCategory}
                            render={({field: {onChange, value}}) => (
                                <AutocompleteWithCategoriesTitle
                                    onChange={onChange}
                                    value={value}
                                    disabled={false}
                            />
                            )}
                    />
                    </Box>
                    {errors.newCategory && (<p className="text-xs text-red ml-10">{t("products.EditProductForm.validationCategoryName")}</p>)}
                    <Box id="modal-modal-description" sx={{mt: 2}}>
                        <Controller
                            name="newProductName"
                            control={control}
                            rules={{required: true}}
                            defaultValue={editProduct ? editProduct.name : ''}
                            render={({field: {onChange, value}}) => (
                                <TextField sx={{width: "80%", marginLeft: "10%"}}
                                           id="standard-basic"
                                           label={t("products.EditProductForm.labelProductName")}
                                           variant="outlined"
                                           value={value}
                                           onChange={onChange}
                                           type="text"
                                />
                            )}/>
                    </Box>
                    {errors.newProductName && (<p className="text-xs text-red ml-10">{t("products.EditProductForm.validationProductName")}</p>)}
                    <Box id="modal-modal-description"  sx={{mt: 2, width: "100%"}}>
                        <Controller
                            name="newCapacity"
                            control={control}
                            rules={{required: true, min: 1}}
                            defaultValue={editProduct ? editProduct.capacity : null}
                            render={({field: {onChange, value}}) => (
                                <TextField sx={{width: "35%", marginLeft: "10%"}}
                                           id="standard-basic"
                                           label={t("products.EditProductForm.labelCapacity")}
                                           variant="standard"
                                           value={value}
                                           onChange={onChange}
                                />
                            )}/>
                        <Controller
                            name="newUnit"
                            control={control}
                            defaultValue={editProduct ? editProduct.unit: ""}
                            render={({field: {onChange, value}}) => (
                                <TextField sx={{width: "35%", marginRight: "10%", marginLeft: "5%"}}
                                           id="standard-select-currency"
                                           select
                                           label={t("products.EditProductForm.labelUnit")}
                                           value={value}
                                           onChange={onChange}
                                           variant="standard"
                                >
                                    {currentStorageId === user!!.uid ?
                                        units.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))
                                        :
                                        unitsMedicines.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            )}/>
                    </Box>
                    {errors.newCapacity && (<p className="text-xs text-red ml-10">{t("products.EditProductForm.validationCapacity")}</p>)}
                    <Box>
                        <Controller
                            name="newExpireDate"
                            control={control}
                            defaultValue={editProduct ? editProduct.expireDate : null}
                            render={({field: {onChange, value}}) => (
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
                                    <DatePicker
                                        mask={'__.__.____'}
                                        label={t("products.EditProductForm.labelExpireDate")}
                                        value={value}
                                        onChange={onChange}
                                        renderInput={(params) => <TextField {...params} sx={{
                                            width: "80%",
                                            marginLeft: "10%",
                                            marginTop: "5%"
                                        }}/>}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Box>
                    {currentStorageId === "pharmacy" + user!!.uid ?
                        <>
                            <Box>
                                <Controller
                                    name="newOpenDate"
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
                                    name="newValidityDate"
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
                        </> : null}
                    <Box id="modal-modal-description" sx={{mt: 2}}>
                        <Controller
                            name="newQuantity"
                            control={control}
                            rules={{required: true, min: 1}}
                            defaultValue={editProduct ? editProduct.quantity : null}
                            render={({field: {onChange, value}}) => (
                                <TextField sx={{width: "80%", marginLeft: "10%"}}
                                           id="outlined-number"
                                           label={t("products.EditProductForm.labelQuantity")}
                                           value={value}
                                           type="number"
                                           onChange={onChange}
                                />
                            )}
                        />
                    </Box>
                    {errors.newQuantity && (<p className="text-xs text-red ml-10">{t("products.EditProductForm.validationQuantity")}</p>)}
                <Box sx={{marginLeft: "10%"}}><button className="mt-4 text-sm bg-purple  text-white uppercase font-bold py-4 px-4 border-purple rounded shadow-xs leading-6" type={"submit"}>{t("buttons.editProduct")}</button></Box>
                </Box>
            </form>
        </>
    )
}

export default EditProductForm;