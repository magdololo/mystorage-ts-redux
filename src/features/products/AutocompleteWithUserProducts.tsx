import React from 'react';
import { useForm, NestedValue } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {selectUserProducts, UserProduct} from "./userProductsSlice";
import {useAppSelector} from "../../app/store";


// const UserProducts: Array<UserProduct> = [
//     { label: 'Chocolate', value: 'chocolate' },
//     { label: 'Strawberry', value: 'strawberry' },
//     { label: 'Vanilla', value: 'vanilla' },
// ];


export const AutocompleteWithUserProducts =()=> {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<{
        autocomplete: NestedValue<UserProduct[]>;
        select: NestedValue<number[]>;
    }>({
        defaultValues: { autocomplete: [], select: [] },
    });
    const onSubmit = handleSubmit((data) => console.log(data));
    const userProducts = useAppSelector(selectUserProducts)
    // React.useEffect(() => {
    //     register('autocomplete', {
    //         validate: (value) =>  !!value.length || 'This is required.',
    //     });
    //     register('select', {
    //         validate: (value)=> !!value.length || 'This is required.',
    //     });
    // }, [register]);

    return (
        // <form onSubmit={onSubmit}>
            <Autocomplete
                options={userProducts}
                getOptionLabel={(userProduct: UserProduct) => userProduct.name}
                onChange={(_, data) => {

                    // setNewProductName(data);
                    // setUserProduct(data);
                    // onChange(data);

                }
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        error={Boolean(errors?.autocomplete)}
                        helperText={errors?.autocomplete?.message}
                    />
                )}
            />


           // <input type="submit" />
        // </form>
    );
}