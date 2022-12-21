import React from 'react';
import {useAppSelector} from "../../app/store";

// import {AutocompleteWithUserMedicinesProps} from "./AddMedicineForm";

//import {UserProduct} from "../../slices/userProductsSlice";
import {ProductFromDictionary, selectAllProducts} from "../../slices/allProductsSlice";

import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import {selectAllMedicines} from "../../slices/allMedicinesSlice";
import {selectCurrentStorage, selectUser} from "../../slices/usersSlice";
import {AutocompleteWithUserMedicinesProps} from "../products/AddProductForm";
import {UserMedicine} from "../../slices/userMedicineSlice";

const filter = createFilterOptions<ProductFromDictionary>();

const AutocompleteWithUserMedicines = ({
                                           onChange,
                                           value,
                                           setSelectedMedicineFromAutocomplete
                                       }: AutocompleteWithUserMedicinesProps) => {
    const {t} = useTranslation();
    const allMedicines = useAppSelector(selectAllMedicines)
    const allProducts = useAppSelector(selectAllProducts)
    const user = useAppSelector(selectUser)
    const currentStorageId = useAppSelector(selectCurrentStorage)
    let optionsStorage = {} as ProductFromDictionary[];
    if (currentStorageId === user?.uid) {
        optionsStorage = allProducts
    } else if (currentStorageId === "pharmacy" + user?.uid) {
        optionsStorage = allMedicines
    }

    return (

        <Autocomplete
            value={value}
            onChange={(_, data) => {

                onChange(data);
                if (data && typeof data === "object") {
                    setSelectedMedicineFromAutocomplete(data as UserMedicine);
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
};

export default AutocompleteWithUserMedicines;