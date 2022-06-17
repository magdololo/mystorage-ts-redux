import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../users/usersSlice";
import React, {useEffect, useState} from "react";
import {useForm, SubmitHandler} from 'react-hook-form';
import {addUserProduct, UserProduct} from "./userProductsSlice";
import 'react-datepicker/dist/react-datepicker.css';
import {Controller, useFormContext} from 'react-hook-form';
import {AutocompleteWithUserProducts} from "./AutocompleteWithUserProducts";
import {Alert, Button, Modal, TextField, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import plLocale from 'date-fns/locale/pl';
import {MenuItem} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Category} from "../categories/categoriesSlice";
import AutocompleteWithCategoriesTitle from "../categories/AutocompleteWithCategoriesTitle";


export type FormValues = {
    expireDate: Date | null
    productName: string
    category: Category | null
    capacity: number | null
    unit: string
    quantity: number | null
};

type AddProductFormProps = {
    handleClose: () => void
    isShown: boolean
}
export type AutocompleteWithUserProductsProps = {
    onChange: (data: any) => void
    value: string
    setSelectedProductFromAutocomplete: (userProduct: UserProduct) => void;
    setNewProductName: (data: string) => void
}
export type AutocompleteWithCategoriesTitleProps = {
    onChange: (data: any) => void
    value: Category | null
    disabled: boolean


}
const AddProductForm = ({handleClose, isShown}: AddProductFormProps) => {
    const dispatch = useAppDispatch();
    const [selectedProductFromAutocomplete, setSelectedProductFromAutocomplete] = useState<UserProduct | null>(null);
    const [newProductName, setNewProductName] = useState<string | null>(null);
    const user = useSelector(selectUser)
    const uid = user ? user.uid : ""
    const currentCategory = useAppSelector<Category | null>((state) => state.categories.currentCategory)
    const {
        handleSubmit,
        control,
        setValue,
        reset
    } = useForm<FormValues>();
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (!isShown) {
            reset()
            setSelectedProductFromAutocomplete(null)
        }
    }, [isShown])
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
        handleClose();
    }
    const onSubmit: SubmitHandler<FormValues> = data => {

        let userProduct: UserProduct = {
            productId: "",
            name: data.productName,
            categoryId: data.category ? data.category.id ?? "" : "",
            capacity: data.capacity ?? 0,
            unit: data.unit,
            quantity: data.quantity ?? 0,
            expireDate: data.expireDate,
            userId: uid,
            id: ""


        }
        dispatch(addUserProduct(userProduct))
        console.log(data);
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



    return (
        <>

            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Box>
                    <Box id="modal-modal-description" sx={{mt: 2, mb: 3, width: "80%", marginLeft: "10%"}}>
                        <Controller
                            name="category"
                            control={control}
                            defaultValue={currentCategory ? currentCategory : null}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <AutocompleteWithCategoriesTitle
                                    value={value}
                                    onChange={onChange}
                                    disabled={!!currentCategory}
                                />
                            )}
                        />
                    </Box>

                    <Box id="modal-modal-description" sx={{mt: 2, mb: 3, width: "80%", marginLeft: "10%"}}>
                        <Controller
                            name="productName"
                            control={control}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <AutocompleteWithUserProducts
                                    value={value ?? ""}
                                    onChange={onChange}
                                    setSelectedProductFromAutocomplete={setSelectedProductFromAutocomplete}
                                    setNewProductName={setNewProductName}

                                />

                            )}
                        />
                    </Box>
                    <Box id="modal-modal-description" sx={{mt: 2, mb: 3, width: "100%"}}>
                        <Controller
                            name="capacity"
                            control={control}
                            defaultValue={1}//{product ? product.capacity : "100"}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField sx={{width: "35%", marginLeft: "10%"}}
                                           id="standard-number"
                                           label="Pojemność"
                                           value={value}
                                           onChange={onChange}
                                           error={!!error}
                                           helperText={error ? error.message : null}
                                           type="number"
                                           variant="standard"
                                />
                            )}
                        />
                        <Controller
                            name="unit"
                            control={control}
                            defaultValue={"kg"}//{product ? product.unit : "gr"}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField sx={{width: "35%", marginRight: "10%", marginLeft: "5%"}}
                                           id="standard-select-currency"
                                           select
                                           label="Jednostka"
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
                    <Box>
                        <Controller
                            name="expireDate"
                            control={control}
                            defaultValue={null}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns} locale={plLocale}>
                                    <DatePicker
                                        mask={'__.__.____'}
                                        label="Data ważności"
                                        value={value}
                                        onChange={onChange}
                                        renderInput={(params) => <TextField {...params}
                                                                            sx={{width: "80%", marginLeft: "10%"}}/>}/>
                                </LocalizationProvider>
                            )}
                        />
                    </Box>

                    <Box id="modal-modal-description" sx={{mt: 2, mb: 3}}>
                        <Controller
                            name="quantity"
                            control={control}
                            defaultValue={1}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    sx={{width: "80%", marginLeft: "10%"}}
                                    //id="outlined-number"
                                    label="ilość"
                                    type="number"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}

                                />
                            )}
                        />
                    </Box>

                    {errorMessage !== '' ? <Alert severity="error">{errorMessage}</Alert> : null}
                    <Button sx={{marginLeft: "10%"}} type="submit" variant="contained" color="primary">Dodaj
                        produkt</Button>
                </Box>
            </form>
        </>
    )
}
export default AddProductForm;