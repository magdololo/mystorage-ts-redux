import React from 'react';
import { useForm, NestedValue } from 'react-hook-form';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {FilterOptionsState, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {selectUserProducts, UserProduct} from "./userProductsSlice";
import {useAppSelector} from "../../app/store";
import {AutocompleteWithUserProductsProps} from "./AddProductForm";
const filter = createFilterOptions<UserProduct>();



export const AutocompleteWithUserProducts =({ onChange, value}: AutocompleteWithUserProductsProps)=> {

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
            value={value}
            onChange={(_, data) => {

                onChange(data);

            }
            }
            filterOptions={(options, params) => {


                const filtered = filter(options, params);

                return filtered as UserProduct[];
            }}
            isOptionEqualToValue={(option, value) => {
                return option.name === value.name
            }}
            autoSelect//dołacza wpisany tekst w jedna z opcji select z ktorej popbierze wartość
            handleHomeEndKeys
             id="free-solo-with-text-demo"
            options={userProducts}
            getOptionLabel={option =>  typeof option === "object"? option.name : option }
            renderOption={(props, option) => <li {...props}>{option.name} {option.capacity} {option.unit}</li>}
            freeSolo
            renderInput={(params) => (
                <TextField  {...params} label="Nazwa produktu"/>
            )}

        />


    );
}