import React from 'react';
import {useAppSelector} from "../../app/store";
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import {MedicineFromDictionary, selectAllMedicines} from "../../slices/allMedicinesSlice";
import {AutocompleteWithUserMedicinesProps} from "../../component/AddProductAndMedicineForm";
import {UserMedicine} from "../../slices/userMedicineSlice";

const filter = createFilterOptions<MedicineFromDictionary>();

const AutocompleteWithUserMedicines = ({
                                           onChange,
                                           value,
                                           setSelectedMedicineFromAutocomplete
                                       }: AutocompleteWithUserMedicinesProps) => {
    const {t} = useTranslation();
    const optionsStorage = useAppSelector(selectAllMedicines)


    //let optionsStorage = allMedicines

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
                return filtered as MedicineFromDictionary[];
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