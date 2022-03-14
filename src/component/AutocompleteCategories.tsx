import {categories, Category} from "./CategoriesList";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

type AutocompleteProps = {
    onChange: (data: Category| string | null) => void,
    value: Category
}

const AutocompleteCategories = ({onChange, value}: AutocompleteProps) => {


    return(
      <>
          <Autocomplete

              value={value}
              onChange={(_, data) => {
                  console.log(data)
                  onChange(data);
              }}

              id="controllable-states-demo"
              options={categories}
              getOptionLabel={option => option.title ? option.title : ""}
              isOptionEqualToValue={(option, value) => {
                  return option.title === value.title
              }}
              freeSolo
              selectOnFocus={true}
              renderInput={(params) =><FormControl className="block w-full" ><TextField {...params} label="Nazwa kategorii" /></FormControl>}
          />
      </>
    );

};
export default AutocompleteCategories;