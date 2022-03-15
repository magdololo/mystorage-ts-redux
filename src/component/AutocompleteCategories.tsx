import {categories, Category, myDefaultOption} from "./CategoriesList";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {FilterOptionsState} from "@mui/material";
const _filterOptions = createFilterOptions<Category>();
const filterOptions = (categories: Category[], state: FilterOptionsState<Category>) => {
    const results = _filterOptions(categories, state);

    if (!results.includes(myDefaultOption)) {
        results.unshift(myDefaultOption);
    }

    return results;
};

type AutocompleteProps = {
    onChange: (data: Category| string | null ) => void,
    value: Category
}

const AutocompleteCategories = ({onChange, value}: AutocompleteProps) => {

    return(
      <>
          <Autocomplete
              filterOptions={filterOptions}
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
              selectOnFocus={true}
              disableListWrap
              openOnFocus
              renderInput={(params) =>
                  <FormControl className="block w-full" >
                      <TextField {...params} label="Nazwa kategorii"/>
                  </FormControl>}
          />
      </>
    );

};
export default AutocompleteCategories;