import React from 'react';
import {useAppSelector} from "../../app/store";

import {AutocompleteWithUserProductsProps} from "../../component/AddProductAndMedicineForm";

import {UserProduct} from "../../slices/userProductsSlice";
import {ProductFromDictionary, selectAllProducts} from "../../slices/allProductsSlice";

import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";
import {useTranslation} from "react-i18next";


const filter = createFilterOptions<ProductFromDictionary>();


export const AutocompleteWithUserProducts = ({
                                                 onChange,
                                                 value,
                                                 setSelectedProductFromAutocomplete
                                             }: AutocompleteWithUserProductsProps) => {
    const {t} = useTranslation();
    const optionsStorage = useAppSelector(selectAllProducts)

    return (

        <Autocomplete
            value={value}
            onChange={(_, data) => {

                onChange(data);
                if (data && typeof data === "object") {
                    setSelectedProductFromAutocomplete(data as UserProduct);
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
            options={optionsStorage}
            getOptionLabel={option => typeof option === "object" ? option.name : option}
            renderOption={(props, option) => <li {...props} key={option.id}>{option.name} {option.capacity} {option.unit}</li>}
            freeSolo
            renderInput={(params) => (
                <TextField  {...params} label={t("products.AddProductForm.label_productName")}/>
            )}

        />


    );
}
export default AutocompleteWithUserProducts
