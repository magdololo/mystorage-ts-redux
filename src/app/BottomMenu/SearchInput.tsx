import React, {useEffect,CSSProperties, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {useNavigate} from "react-router-dom";
import {
    searchProduct,
    selectUserProductById,
    selectUserProducts,
    UserProduct,
    searchByString
} from "../../features/products/userProductsSlice";
import Select, {ActionMeta} from "react-select";

type Option= {
    label: string
    value: string
}
//{ Props as ReactSelectProps }
// import { Variants, singleSelectStyle } from "../../searchStyle";
// export type SelectProps = ReactSelectProps<unknown, false> & {
//     variant?: Variants;
// };
//({ variant, ...props }:SelectProps)
const SearchInput =()  => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userProducts = useAppSelector(selectUserProducts);
    const [inputString, setInputString] = useState("");
    const [preventOnChange, setPreventOnChange] = useState(false)
    //const [searchUserProductId, setSearchUserProductId] = useState<string>("");
    const [searchOption, setSearchOption] = useState("")
    const [doSearchByString, setDoSearchByString] = useState(false)
    const [doSearchByOption, setDoSearchByOption] = useState(false)
    useEffect(()=>{
        console.log("use effect")
        console.log(preventOnChange)
        console.log(inputString)
console.log(doSearchByOption)
        console.log(doSearchByString)
        console.log(searchOption)

        if(doSearchByOption && !doSearchByString){
            dispatch(searchProduct(searchOption))
            navigate("/search")
        }
        if(doSearchByString){
            setPreventOnChange(true)
            dispatch(searchByString(inputString))
            navigate("/search")
            console.log("dosearchByString")
        }
        setDoSearchByOption(false)
        setDoSearchByString(false)
        setSearchOption("")
        setPreventOnChange(false)

    }, [doSearchByOption, doSearchByString ])
    const searchOptions = userProducts?.map(userProduct => {
        return {name: userProduct.name, value: userProduct.name}
    })
    const options = userProducts?.map(userProduct => {

        return {label: userProduct.name + userProduct.capacity + userProduct.unit, value: userProduct.id}
    })
console.log("render search input")
    console.log(preventOnChange)


    let preventInputOverwrite = false
    const onChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {

        if(!preventOnChange){
            setSearchOption(option?.value??"")
            setDoSearchByOption(true)
        }
    }

    const onInputTextChange=(e: string)=>{
        console.log(e)
if(!preventInputOverwrite)
        setInputString(e);
    }

    console.log(inputString)
    const onKeyDown=(e: any)=>{


        if(e.keyCode === 13){
            console.log("onKeyDown")
            preventInputOverwrite=true
            setPreventOnChange(true)
            setDoSearchByString(true)
        }

    }

    return(
        <>

            <div className="flex flex-1 pr-1">
                <Select options={options} menuPlacement={"top"} isClearable className="react-select-container" classNamePrefix="react-select" onKeyDown={onKeyDown} onInputChange={onInputTextChange}  onChange={onChange} />
                {/*styles={singleSelectStyle(variant)}*/}
                    {/*<button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light"*/}
                    {/*        className="flex flex-row items-center justify-between px-4 py-1.5 border border-solid text-gray-light text-lg rounded  shadow-xs hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"*/}
                    {/*        onClick={() => setDisplayOptions(!displayOptions)}>*/}
                    {/*    {!displayOptions ? 'Display options' : 'Hide options'}*/}
                        {/*<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4 text-gray-light text-lg"*/}
                        {/*         role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">*/}
                        {/*        <path fill="#9CA3AF"*/}
                        {/*              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>*/}
                        {/*    </svg>*/}
                        {/*<span className="px-2">Wyszukaj&nbsp;produkt</span>*/}

                    <div/>
                </div>

        </>
    )

};
export default SearchInput;

//npm install react-select