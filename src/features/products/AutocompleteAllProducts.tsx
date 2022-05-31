import {useState} from "react";
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {ProductFromDictionary, selectAllProducts} from "./allProductsSlice";
import {useSelector} from "react-redux";


export let products: ProductFromDictionary[];

type options = Array<string>;
type AutocompleteProps = {
    onChange: (data: ProductFromDictionary| string | null) => void,
    value: ProductFromDictionary | string | null,
    setCapacity: (name: "unit" | "capacity", value: string | number) => void
    setNewProductName: (data: (string | ProductFromDictionary | null)) => void
    newProductName: ProductFromDictionary | string | null
}

const AutocompleteAllProducts = ({onChange, value, setCapacity, setNewProductName, newProductName}: AutocompleteProps) => {
    const [inputValue, setInputValue] = useState('');
   console.log(inputValue);
  console.log(value);

    return(
        <>

            <Autocomplete
                value={value}
                onChange={(event, data) => {
                    console.log(data)
                    if(typeof data === "object"){
                        console.log(data?.capacity as number)
                        setCapacity("capacity",data?.capacity as number)
                        setCapacity("unit", data?.unit as string)
                    }

                    onChange(data);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue)
                    onChange(newInputValue)
                }}
                id="controllable-states-demo"
                options={products}
                getOptionLabel={option => option.name ? option.name : ""}
                isOptionEqualToValue={(option, value) => {
                    return option.name === value.name
                }}
                renderOption={(props, option) => <li {...props}>{option.name} {option.capacity} {option.unit}</li>}
                freeSolo
                disableListWrap
                openOnFocus
                selectOnFocus={true}
                renderInput={(params) =><FormControl className="block w-full " ><TextField {...params} label="Nazwa produktu" /></FormControl>}
            />
        </>

    )
}
export default AutocompleteAllProducts;



