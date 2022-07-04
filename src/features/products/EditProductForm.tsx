import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {selectUser} from "../users/usersSlice";
import {Category, selectAllCategories} from "../categories/categoriesSlice"
import {useAppDispatch, useAppSelector} from "../../app/store";
import 'react-toastify/dist/ReactToastify.css';
import plLocale from "date-fns/locale/pl";
import {Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {MenuItem} from "@mui/material";

import AutocompleteWithCategoriesTitle from "../categories/AutocompleteWithCategoriesTitle";
import {editUserProduct, UserProduct} from "./userProductsSlice";
import {useLocation, useNavigate} from "react-router-dom";

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
        reset
    } = useForm<EditFormValues>();
    const currentCategory = useAppSelector<Category | null>((state) => state.categories.currentCategory)


    const editProduct = useAppSelector(state=>state.userProducts.editProduct)
    console.log('editProduct')
    console.log(editProduct)
    const allCategories = useAppSelector(selectAllCategories)
    const editProductCategory = allCategories.find(category=>category.id === editProduct?.categoryId)
    console.log('editProductCategory')
    console.log(editProductCategory)
    const user = useSelector(selectUser)
    const uid = user? user.uid: ""
    const dispatch = useAppDispatch()
    const navigate= useNavigate()
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
    console.log(editProductCategory)
    const closeModal = () => {
        reset();
        handleClose();
    }


    const onSubmit: SubmitHandler<EditFormValues> = data => {
        console.log(data)
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
        console.log(updatedProduct)
        dispatch(editUserProduct(updatedProduct))
        closeModal()
    }
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
<Box>
                <Box id="modal-modal-description"  sx={{mt: 2, mb: 3, width: "80%", marginLeft: "10%"}}>
        <Controller
            name="newCategory"
            control={control}
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
    <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
        <Controller
            name="newProductName"
            control={control}
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
    <Box id="modal-modal-description"  sx={{mt: 2, mb: 3, width: "100%"}}>
        <Controller
            name="newCapacity"
            control={control}
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
                        renderInput={(params) => <TextField {...params}  sx={{width: "80%", marginLeft: "10%"}}/>}
                    />
                </LocalizationProvider>
            )}
        />
    </Box>
    <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
        <Controller
            name="newQuantity"
            control={control}
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
    <Button sx={{ marginLeft: "10%"}} type="submit" variant="contained" color="primary" >Edytuj produkt</Button>
</Box>
            </form>
        </>
    )
}

export default EditProductForm;