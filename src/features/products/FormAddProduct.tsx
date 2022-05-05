// import {useState} from "react";
// import AutocompleteProducts from "./AutocompleteProducts";
// import AutocompleteCategories from "../categories/AutocompleteCategories";
// import { useForm, Controller } from "react-hook-form";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import {Product} from "./productSlice";
// import {TextField, MenuItem} from "@mui/material";
//
// const optionsUnits: string[] = [
//     "kg",
//     "gr",
//     "szt",
// ];
//
// // type FormResult = {
// //     categoryTitle: Category;
// //     name: Required<Product | string >;
// //     capacity: Required<number | "">;
// //     unit: Required<string>;
// //     quantity: Required<number>;
// //     expireDate: Date|null;
// //
// // }
//
//
// const FormAddProduct = (closeModal: ()=> void) => {
//     const { handleSubmit, formState: {errors}, control, reset, setValue} = useForm<FormResult>();
//     const [nameNewProduct, setNameNewProduct] = useState<string | Product | null>(null);
//
//     // console.log(errors)
//     // const onSubmit= (data: FormResult)=> {
//     //     console.log(data);
//     //     let  result = data.categoryTitle;
//     //     console.log(result)
//     //     reset();
//     //     closeModal();
//     // }
//     // console.log(nameNewProduct);
//     //
//
//     return(
//             <>
//
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="field py-4">
//                         <Controller
//                             name="categoryTitle"
//                             control={control}
//                             rules={{ required:  true }}
//                             render={({ field: {onChange, value}}) => (
//                                 <AutocompleteCategories
//                                    // onChange={onChange}
//                                     value={value}
//                                     aria-invalid={errors.categoryTitle ? "true" : "false"}
//                                 />
//                                 )} />
//                             {errors?.categoryTitle && <p className="error text-purple">Pole kategoria jest wymagane.</p>}
//
//                     </div>
//                     <div className="field py-4">
//                         <Controller
//                             name="name"
//                             control={control}
//                             rules={{ required:  true }}
//                             render={({ field: {onChange, value},fieldState: {error} }) => (
//                                 <AutocompleteProducts
//                                     onChange={onChange}
//                                     value={value}
//                                     setCapacity={setValue}
//                                     setNewProductName={setNameNewProduct}
//                                     newProductName ={nameNewProduct}
//                                     aria-invalid={errors ? "true" : "false"}
//
//                                 />
//                             )} />
//                         {errors?.name && <p className="error text-purple">Nazwa produktu jest wymagana.</p>}
//                     </div>
//                     <div className="flex flex-row justify-between">
//                     <div className="field py-4 w-5/12">
//                     <Controller
//                         name="capacity"
//                         control={control}
//                         defaultValue=""
//                         rules={{ required:  true }}
//                         render={({field: {onChange, value}, fieldState: {error}}) => (
//                             <TextField sx={{width: "100%"}}
//                                        label="Pojemność"
//                                        onChange={onChange}
//                                        value={value}
//                                        variant="outlined"
//                                        type="number"
//                             />
//                         )}
//                     />
//                         {errors?.capacity && <p className="error text-purple">Pojemność wymagana.</p>}
//                     </div>
//                     <div className="field py-4 w-5/12">
//                     <Controller
//                         name="unit"
//                         control={control}
//                         defaultValue=""
//                         rules={{ required:  true }}
//                         render={({field: {onChange, value}, fieldState: {error}}) => (
//                             <TextField sx={{width: "100%"}}
//                             select
//                             label="Jednostka"
//                             onChange={onChange}
//                             value={value}
//                             variant="outlined"
//                             type="text"
//                             >
//                         {optionsUnits.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 {option}
//                             </MenuItem>
//                         ))}
//                             </TextField>
//                             )}
//
//                     />
//                         {errors?.unit && <p className="error text-purple">Jednostka wymagana. </p>}
//                     </div>
//                     </div>
//                     <div className="field py-4">
//                         <Controller
//                             control={control}
//                             name="expireDate"
//                             render={({ field: {onChange, value} }) => (
//                                     <ReactDatePicker
//
//                                         dateFormat="d MMM yyyy"
//                                         minDate={new Date()}
//                                         className="form-select block w-full p-3 text-xl font-bold bg-white text-gray-700 border border-solid border-gray-500 rounded transition easy-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple focus:outline-none focus:border-2"
//                                         placeholderText="Data ważności"
//                                         selected={
//                                             value
//                                         }
//                                         shouldCloseOnSelect
//                                         onChange={onChange}
//                                         showTimeSelect={false}
//                                         todayButton="Today"
//                                         dropdownMode="select"
//                                     />
//                             )}
//                         />
//                     </div>
//                     <div className="field py-4">
//                         <Controller
//                             control={control}
//                             name="quantity"
//                             rules={{ required: true, min: 1 }}
//                             render={({ field }) => (
//                                 <input  {...field}
//                                 className="form-control block w-full p-3 text-xl font-bold bg-white bg-clip-padding border border-solid border-gray-700 rounded transition easy-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple focus:outline-none focus:border-2"
//                                type="number"
//                                placeholder="Ilość"
//                                id="quantity"
//                                aria-invalid={errors.quantity ? "true" : "false"}
//                                  />
//                             )}
//                             />
//                         {errors.quantity && errors.quantity.type === "required" && (
//                             <p className="error text-purple" >Minimalna ilość to 1.</p>
//                         )}
//                         {errors.quantity && errors.quantity.type === "min" &&(
//                             <p className="error text-purple" >Minimalna ilość to 1.</p>
//                         )}
//                     </div>
//                     <div className="flex space-x-2 justify-center">
//                         <button className="inline-block px-6 py-2.5 bg-purple text-white font-bold text-md leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Dodaj produkt</button>
//                     </div>
//                 </form>
//             </>
//
//     )
//
// }
 const FormAddProduct = ()=>{
    return(
        <></>
    )
};
export default FormAddProduct;