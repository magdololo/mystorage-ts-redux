import {categories} from "./CategoriesList";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const AutocompleteCategories = (onChange: any, value: any) => {


    return(
      <>
          <Autocomplete

              value={value}
              onChange={(_, data) => {
                  console.log(data)
                  onChange(data);
              }}
              // inputValue={inputValue}
              // onInputChange={(event, newInputValue) => {
              //     console.log(newInputValue);
              //     setInputValue(newInputValue);
              // }}
              id="controllable-states-demo"
              options={categories}
              getOptionLabel={option => option.title ? option.title : ""}
              isOptionEqualToValue={(option, value) => {
                  return option.title === value.title
              }}
              freeSolo
              autoSelect

              renderInput={(params) =><FormControl className="block w-full " ><TextField {...params} label="Nazwa kategorii" /></FormControl>}
          />
      </>
    );

};
export default AutocompleteCategories;