import {useEffect, useState} from "react";
import { useForm, NestedValue } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {Product} from "./FormAddProduct";

const products:Array<Product> = [
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

const AutocompleteProducts = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{
        autocomplete: NestedValue<Product[]>;
        select: NestedValue<number[]>;
    }>({
        defaultValues: { autocomplete: [], select: [] },
    });
    const [value] = useState(products[0].name);
    const [inputValue, setInputValue] = useState('');



    return(
        <>

            <Autocomplete

                value={value}
                onChange={(event, newValue) => {
                    console.log(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={products.map((option) => option.name)}
                freeSolo
                sx={{ width: 300 }}
                renderInput={(params) =><FormControl className="block w-full " ><TextField {...params} label="Nazwa produktu" /></FormControl>}
            />
        </>

    )
}
export default AutocompleteProducts;



