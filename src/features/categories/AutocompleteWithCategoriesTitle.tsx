import * as React from 'react';
import {useAppSelector} from "../../app/store";

import {AutocompleteWithCategoriesTitleProps} from "../products/AddProductForm";

import {Category, selectAllCategoriesSortedByRequired} from "./categoriesSlice";

import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
const filter = createFilterOptions<Category>();

export default function AutocompleteWithCategoriesTitle({ value, onChange, disabled}:AutocompleteWithCategoriesTitleProps) {

    const categories = useAppSelector(selectAllCategoriesSortedByRequired) as Category[]

    return (
        <Autocomplete
            value={value}
            onChange={(_, data) => {
                console.log(data)
                onChange(data);}
            }
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                return filtered as Category[];
            }}
            isOptionEqualToValue={(option, value) => {
                return option.id === value.id
            }}
            autoSelect//dołacza wpisany tekst w jedna z opcji select z ktorej popbierze wartość
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={categories}
            getOptionLabel={option => typeof option === "object" ? option.title : option}
            renderOption={(props, option) => <li {...props} key={option.id} className="capitalize">{option.title}</li>}
            // freeSolo bo tu chcemy tylko z listy wybierac
            disabled={disabled}
            renderInput={(params) => (
                <TextField  {...params} label= "Nazwa kategorii" />
            )}

        />

    );
}