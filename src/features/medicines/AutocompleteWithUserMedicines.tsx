import React from 'react';
import {useAppSelector} from "../../app/store";

import {AutocompleteWithUserMedicinesProps} from "./AddMedicineForm";

import {UserProduct} from "../../slices/userProductsSlice";
import {ProductFromDictionary, selectAllProducts} from "../../slices/allProductsSlice";

import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import {selectAllMedicines} from "../../slices/allMedicinesSlice";
import {selectCurrentStorage, selectUser} from "../../slices/usersSlice";

const filter = createFilterOptions<ProductFromDictionary>();


export const AutocompleteWithUserMedicines = ({
                                                  onChange,
                                                  value,
                                                  setSelectedProductFromAutocomplete
                                              }: AutocompleteWithUserMedicinesProps) => {
    const {t} = useTranslation();
    const allMedicines = useAppSelector(selectAllMedicines)
    const allProducts = useAppSelector(selectAllProducts)
    const user = useAppSelector(selectUser)
    const currentStorageId = useAppSelector(selectCurrentStorage)
    let optionsStorage = {} as ProductFromDictionary[];
    if (currentStorageId === user?.uid) {
        optionsStorage = allProducts
    } else if (currentStorageId === user?.uid + "pharmacy") {
        optionsStorage = allMedicines
    }

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
            renderOption={(props, option) => <li {...props}
                                                 key={option.id}>{option.name} {option.capacity} {option.unit}</li>}
            freeSolo
            renderInput={(params) => (
                <TextField  {...params} label={t("products.AddProductForm.label_productName")}/>
            )}

        />


    );
}