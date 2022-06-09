import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../users/usersSlice";
import React, {useEffect, useState} from "react";
import {useForm, SubmitHandler} from 'react-hook-form';
import {UserProduct} from "./userProductsSlice";
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
import {useAppSelector} from "../../app/store";
import {Category} from "../categories/categoriesSlice";
import AutocompleteWithCategoriesTitle from "../categories/AutocompleteWithCategoriesTitle";


type FormValues = {
    expireDate: Date | null
    productName: string
    categoryName: string
    capacity: number | null
    unit: string
    quantity: number | null
};

type AddProductFormProps = {
    handleClose: () => void
    open: boolean
}
export type AutocompleteWithUserProductsProps = {
    onChange: (data: any) => void
    value: string
    setSelectedProductFromAutocomplete: (userProduct: UserProduct) => void;
    setNewProductName: (data: string) => void
}
export type AutocompleteWithCategoriesTitleProps = {
    onChange: (data: any) => void
    value: string
    setSelectedNewCategory: (data: Category) => void
    disabled: boolean
}
const AddProductForm = ({handleClose, open}: AddProductFormProps) => {
    const [selectedProductFromAutocomplete, setSelectedProductFromAutocomplete] = useState<UserProduct | null>(null);
    const [newProductName, setNewProductName] = useState<string | null>(null);
    const [selectedNewCategory, setSelectedNewCategory] = useState<Category | null>(null);
    const user = useSelector(selectUser)
    const uid = user ? user.uid : ""
    const currentCategory = useAppSelector<Category | null>((state) => state.categories.currentCategory)
    const categoryTitle = currentCategory?.title
    const {
        handleSubmit,
        control,
        setValue,
        reset
    } = useForm<FormValues>();
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit: SubmitHandler<FormValues> = data => {
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
    const closeModal = () => {
        setErrorMessage('');
        setSelectedProductFromAutocomplete(null)
        reset();
        handleClose();
    }
    console.log(currentCategory)
    useEffect(() => {
        if (selectedProductFromAutocomplete) {
            setValue('capacity', selectedProductFromAutocomplete.capacity);
            setValue('unit', selectedProductFromAutocomplete.unit);
        }
    }, [selectedProductFromAutocomplete, setValue]);
    useEffect(() => {
        if (!open) {
            reset()
            setSelectedProductFromAutocomplete(null)
        }
    }, [open])

    return (
        <>

            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Box>
                    <Box id="modal-modal-description" sx={{mt: 2, mb: 3, width: "80%", marginLeft: "10%"}}>
                        <Controller
                            name="categoryName"
                            control={control}
                            defaultValue={currentCategory ? categoryTitle : ""}
                            render={({field: {onChange,value}, fieldState: {error}}) => (
                                <AutocompleteWithCategoriesTitle
                                    value={value}
                                    onChange={onChange}
                                    disabled={!!currentCategory}
                                    setSelectedNewCategory={setSelectedNewCategory}
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