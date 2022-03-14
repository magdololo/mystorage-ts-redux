import {useState} from "react";
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {Category} from "./CategoriesList";

export interface Product{
    id: Required<string>;
    name: Required<string>;
    categoryTitle: Required<string>;
    capacity: Required<number>;
    unit: Required<string>;
    quantity: Required<number>;
    expireDate: Date|null;

}
export let products: Product[];

 products = [
    {
        id: "1",
        name: "kawa pedros",
        categoryTitle: "kawa i herbata",
        capacity: 1,
        unit: "szt",
        quantity: 1,
        expireDate: null
    },
    {
        id: "2",
        name: "ryż pełnozuarnisty",
        categoryTitle: "ryże mąki majarony",
        capacity: 1,
        unit: "szt",
        quantity: 1,
        expireDate: null
    },
    {
        id: "3",
        name: "płatki owsiane",
        categoryTitle: "płatki śniadaniowe",
        capacity: 1,
        unit: "szt",
        quantity: 1,
        expireDate: null
    },
    {
        id: "4",
        name: "cukier",
        categoryTitle: "cukier i słodziki",
        capacity: 500,
        unit: "gr",
        quantity: 1,
        expireDate: null
    }, {
        id: "5",
        name: "cukierki",
        categoryTitle: "słodycze",
        capacity: 1,
        unit: "kg",
        quantity: 1,
        expireDate: null
    },


]
type options = Array<string>;
type AutocompleteProps = {
    onChange: (data: Product| string | null) => void,
    value: Product | string | null
}

const AutocompleteProducts = ({onChange, value}: AutocompleteProps) => {
    const [inputValue, setInputValue] = useState('');


    return(
        <>

            <Autocomplete
                value={value}
                onChange={(event, data) => {
                    console.log(data)
                    onChange(data);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={products}
                getOptionLabel={option => option.name ? option.name : ""}
                isOptionEqualToValue={(option, value) => {
                    return option.name === value.name
                }}
                renderOption={(props, option) => <li {...props}>{option.name} {option.capacity} {option.unit}</li>}
                freeSolo
                selectOnFocus={true}
                renderInput={(params) =><FormControl className="block w-full " ><TextField {...params} label="Nazwa produktu" /></FormControl>}
            />
        </>

    )
}
export default AutocompleteProducts;



