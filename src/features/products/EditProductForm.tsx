import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {selectUser} from "../users/usersSlice";
import {Category, selectAllCategories} from "../categories/categoriesSlice"

import 'react-toastify/dist/ReactToastify.css';
import plLocale from "date-fns/locale/pl";
import {Button, TextField, MenuItem} from "@mui/material";
import Box from "@mui/material/Box";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';


import AutocompleteWithCategoriesTitle from "../categories/AutocompleteWithCategoriesTitle";
import {editUserProduct, UserProduct} from "./userProductsSlice";


type EditProductFormProps = {
    handleClose: () => void
    isShown: boolean
}
type EditFormValues= {

    newExpireDate: Date | null
    newProductName: string
    newCategory: Category | null
    newCapacity: number | null
    newUnit: string
    newQuantity: number | null
}
const EditProductForm = ({handleClose, isShown}: EditProductFormProps) => {
    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: {errors}
    } = useForm<EditFormValues>();



    const editProduct = useAppSelector(state=>state.userProducts.editProduct)
    const allCategories = useAppSelector(selectAllCategories)
    const editProductCategory = allCategories.find(category=>category.id === editProduct?.categoryId)

    const user = useSelector(selectUser)
    const uid = user? user.uid: ""
    const dispatch = useAppDispatch()

    const units = [
        {value: 'gr'},
        {value: 'ml'},
        {value: 'kg'},
        {value: 'szt'},
        {value: 'l'}];
    useEffect(() => {
        if (editProductCategory ){
            setValue('newCategory', editProductCategory);
        }
    }, [editProductCategory, setValue]);

    const closeModal = () => {
        reset();
        handleClose();
    }


    const onSubmit: SubmitHandler<EditFormValues> = data => {

        let updatedProduct: UserProduct = {
            productId: editProduct?.productId??"",
            name: data.newProductName,
            categoryId: data.newCategory?.id ??"",
            capacity: data.newCapacity ?? 0,
            unit: data.newUnit,
            quantity: data.newQuantity ?? 1,
            expireDate: data.newExpireDate,
            userId: uid,
            id: editProduct?.id??""


        }
        dispatch(editUserProduct(updatedProduct))
        closeModal()
    }
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
<Box>
                <Box id="modal-modal-description"  sx={{mt: 2, width: "80%", marginLeft: "10%"}}>
        <Controller
            name="newCategory"
            control={control}
            rules={{required: true}}
            defaultValue={editProductCategory}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <AutocompleteWithCategoriesTitle
                    onChange= {onChange}
                    value={value}
                    disabled={false}

                />
            )}
        />
        </Box>
    {errors.newCategory && (<p className="text-xs text-red ml-10">{"Kategoria wymagana"}</p>)}
    <Box id="modal-modal-description" sx={{mt: 2}}>
        <Controller
            name="newProductName"
            control={control}
            rules={{required: true}}
            defaultValue={editProduct ? editProduct.name : ''}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField sx={{width: "80%", marginLeft: "10%"}}
                           id="standard-basic"
                           label="Nazwa produktu"
                           variant="outlined"
                           value={value}
                           onChange={onChange}
                           type="text"
                />
            )}/>
    </Box>
    {errors.newProductName && (<p className="text-xs text-red ml-10">Nazwa produktu wymagana</p>)}
    <Box id="modal-modal-description"  sx={{mt: 2, width: "100%"}}>
        <Controller
            name="newCapacity"
            control={control}
            rules={{required: true, min: 1}}
            defaultValue={editProduct ? editProduct.capacity : null}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField sx={{width: "35%", marginLeft: "10%"}}
                           id="standard-basic"
                           label="Pojemność"
                           variant="standard"
                           value={value}
                           onChange={onChange}
                />
            )}/>
        <Controller
            name="newUnit"
            control={control}
            defaultValue={editProduct ? editProduct.unit: ""}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField sx={{width: "35%", marginRight: "10%", marginLeft: "5%"}}
                           id="standard-select-currency"
                           select
                           label="Jednostka"
                           value={value}
                           onChange={onChange}
                           variant="standard"
                >
                    {units.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>
            )}/>
    </Box>
    {errors.newCapacity && (<p className="text-xs text-red ml-10">Pojemność wymagana i musi być więksa od 0.</p>)}
    <Box>
        <Controller
            name="newExpireDate"
            control={control}
            defaultValue={editProduct ? editProduct.expireDate : null}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
                    <DatePicker
                        mask={'__.__.____'}
                        label="Data ważności"
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => <TextField {...params}  sx={{width: "80%", marginLeft: "10%", marginTop: "5%"}}/>}
                    />
                </LocalizationProvider>
            )}
        />
    </Box>
    <Box id="modal-modal-description" sx={{mt: 2}}>
        <Controller
            name="newQuantity"
            control={control}
            rules={{required: true, min: 1}}
            defaultValue={editProduct ? editProduct.quantity : null}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField sx={{width: "80%", marginLeft: "10%"}}
                           id="outlined-number"
                           label="Ilość"
                           value={value}
                           type="number"
                           onChange={onChange}
                />
            )}
        />

    </Box>
    {errors.newQuantity && (<p className="text-xs text-red ml-10">Ilość wymagana i musi być więksa od 0.</p>)}
    <Button sx={{ marginLeft: "10%", marginTop: "5%"}} type="submit" variant="contained" color="primary" >Edytuj produkt</Button>
</Box>
            </form>
        </>
    )
}

export default EditProductForm;