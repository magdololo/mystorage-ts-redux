import * as React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';

import {useEffect} from "react";
import {useAppSelector} from "../../app/store";
import {Category, selectAllCategories} from "./categoriesSlice";
import {AutocompleteWithCategoriesTitleProps} from "../products/AddProductForm";
import {UserProduct} from "../products/userProductsSlice";
const filter = createFilterOptions<Category>();

export default function AutocompleteWithCategoriesTitle({ value, onChange, setSelectedNewCategory, disabled}:AutocompleteWithCategoriesTitleProps) {
    // let categoryList = useStore(state => state.categories);
    // const requiredCategory = useStore(state=>state.requiredCategory);
    // const requiredCategoryId = useStore(state=>state.requiredCategoryId);
    const categories = useAppSelector(selectAllCategories)
    //categoryList = [requiredCategory,...categoryList];


    return (
        <Autocomplete
            value={value}
            onChange={(_, data) => {
                console.log(data)
                onChange(data);
            }
            }
            filterOptions={(options, params) => {


                const filtered = filter(options, params);
                return filtered as Category[];
            }}
            isOptionEqualToValue={(option, value) => {
                return option.title === value.title
            }}
            autoSelect//dołacza wpisany tekst w jedna z opcji select z ktorej popbierze wartość
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={categories}
            getOptionLabel={option => typeof option === "object" ? option.title : option}
            renderOption={(props, option) => <li {...props} key={option.id}>{option.title}</li>}
            freeSolo
            disabled={disabled}
            renderInput={(params) => (
                <TextField  {...params} label= "Nazwa kategorii" />
            )}

        />

    );
}