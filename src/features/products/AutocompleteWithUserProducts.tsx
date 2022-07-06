import React from 'react';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";
import { UserProduct} from "./userProductsSlice";
import {ProductFromDictionary, selectAllProducts} from "./allProductsSlice";
import {useAppSelector} from "../../app/store";
import {AutocompleteWithUserProductsProps} from "./AddProductForm";

const filter = createFilterOptions<ProductFromDictionary>();


export const AutocompleteWithUserProducts = ({onChange, value, setSelectedProductFromAutocomplete, setNewProductName}: AutocompleteWithUserProductsProps) => {

    const allProducts = useAppSelector(selectAllProducts)
console.log(allProducts)
    return (

        <Autocomplete
            value={value}
            onChange={(_, data) => {
                console.log(data)
                onChange(data);
                if(data && typeof data === "object" ){
                    setSelectedProductFromAutocomplete(data as UserProduct);
                }
                if(data && typeof data === "string"){
                    setNewProductName(data);
                }
            }
            }
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                return filtered as ProductFromDictionary[];
            }}
            isOptionEqualToValue={(option, value) => {
                return option.id === value.id
            }}
            autoSelect//dołacza wpisany tekst w jedna z opcji select z ktorej popbierze wartość
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={allProducts}
            getOptionLabel={option => typeof option === "object" ? option.name : option}
            renderOption={(props, option) => <li {...props} key={option.id}>{option.name} {option.capacity} {option.unit}</li>}
            freeSolo
            renderInput={(params) => (
                <TextField  {...params} label="Nazwa produktu"/>
            )}

        />


    );
}