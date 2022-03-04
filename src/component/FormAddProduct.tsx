import AutocompleteProducts from "./AutocompleteProducts";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export interface Product{
    id: Required<string>;
    name: Required<string>;
    categoryTitle: Required<string>;
    capacity: Required<number>;
    unit: Required<string>;
    quantity: Required<number>;
    expireDate: Date|null;

}
let products: Product[];
type OptionUnits = {
    label: string;
    value: string;
}
type OptionCapacity ={
    label: string;
    value: number;
}
const optionsUnits: Array<OptionUnits> = [
    {label: 'kg' , value: "kg"},
    {label: 'gr' , value: "gr"},
    {label: 'szt' , value: "szt"},
];
const optionsCapacity: Array<OptionCapacity> = [
    {label: "100" , value: 100},
    {label: "1" , value: 1},
    {label: "500" , value: 500},
]

const FormAddProduct = () => {
    const { register, handleSubmit, formState: {errors}, control, reset} = useForm<Product>();
    const onSubmit: SubmitHandler<Product> = data => console.log(data);
    return(
            <>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field py-4">
                        <input className="form-control block w-full p-3 text-xl font-bold bg-white bg-clip-padding border border-solid border-gray-700 rounded transition easy-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple focus:outline-none focus:border-2"
                            type="text"
                            placeholder="Nazwa kategorii"
                            id="categoryTitle"
                            aria-invalid={errors.categoryTitle ? "true" : "false"}
                            {...register("name",{ required: true, maxLength: 30 })}
                        />
                        {errors.categoryTitle && errors.categoryTitle.type === "required" && (
                            <div className="error">You must choose category title.</div>
                        )}
                    </div>
                    <div className="field py-4">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field: {onChange, value},fieldState: {error} }) => (
                                <AutocompleteProducts

                                     //placeholderText="Nazwa produktu"
                                    //value={value}
                                    //onChange={onChange}
                                    //error={!!error}
                                    //helperText={error ? error.message : null}
                                    //type= "text"
                                    aria-invalid={errors.name ? "true" : "false"}
                                    {...register("name",{ required: true, maxLength: 30 })}
                                />
                            )} />
                            {errors.name && errors.name.type === "required" && (
                            <div className="error">You must enter your name.</div>
                        )}
                    </div>
                    <div className="flex flex-row justify-between">
                    <div className="field py-4 w-5/12">
                    <Controller
                        name={"capacity"}
                        control={control}
                        render={({ field }) =>
                            <select className="form-select block w-full p-3 text-xl font-bold bg-white text-gray-700 border border-solid border-gray-500 rounded transition easy-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple focus:outline-none focus:border-2"
                                {...field}  {...register("capacity")}>
                                {optionsCapacity.map((option)=>(
                                    <option value={option.value} label={option.label}>option.value</option>
                                ))}
                            </select>
                        }
                    />
                    </div>
                    <div className="field py-4 w-5/12">
                    <Controller
                        name={"unit"}
                        control={control}
                        render={({ field }) =>
                            <select className="form-select block w-full p-3 text-xl font-bold bg-white text-gray-700 border border-solid border-gray-500 rounded transition easy-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple focus:outline-none focus:border-2"
                                {...field}  {...register("unit")}>
                                {optionsUnits.map((option)=>(
                                    <option value={option.value} label={option.label}>option.value</option>
                                ))}
                            </select>
                        }
                    />
                    </div>
                    </div>
                    <div className="field py-4">
                        <Controller
                            control={control}
                            name="expireDate"
                            render={({ field: {onChange, value} }) => (
                                    <ReactDatePicker
                                        dateFormat="d MMM yyyy"
                                        minDate={new Date()}
                                        className="form-select block w-full p-3 text-xl font-bold bg-white text-gray-700 border border-solid border-gray-500 rounded transition easy-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple focus:outline-none focus:border-2"
                                        placeholderText="Wybierz datę"
                                        selected={
                                            value
                                        }
                                        shouldCloseOnSelect
                                        onChange={onChange}
                                        showTimeSelect={false}
                                        todayButton="Today"
                                        dropdownMode="select"
                                    />
                            )}
                        />
                    </div>
                    <div className="field py-4">
                        <input className="form-control block w-full p-3 text-xl font-bold bg-white bg-clip-padding border border-solid border-gray-700 rounded transition easy-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple focus:outline-none focus:border-2"
                               type="number"
                               placeholder="Ilość"
                               id="quantity"
                               aria-invalid={errors.quantity ? "true" : "false"}
                               {...register("name",{ required: true, maxLength: 30 })}
                        />
                        {errors.quantity && errors.quantity.type === "required" && (
                            <div className="error">You must choose category title.</div>
                        )}
                    </div>
                    <div className="flex space-x-2 justify-center">
                        <button className="inline-block px-6 py-2.5 bg-purple text-white font-bold text-md leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Dodaj produkt</button>
                    </div>
                </form>
            </>

    )

}
export default FormAddProduct;