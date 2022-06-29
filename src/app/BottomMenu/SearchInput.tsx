import React, {useEffect,CSSProperties, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {useNavigate} from "react-router-dom";
import {
    searchProduct,
    selectUserProducts,
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
                <Select options={options} menuPlacement={"top"} isClearable className="react-select-container" classNamePrefix="react-select"  onKeyDown={onKeyDown} onInputChange={onInputTextChange}  onChange={onChange}/>
                {/*styles={singleSelectStyle(variant)}*/}
                    <div/>
                </div>

        </>
    )

};
export default SearchInput;

//npm install react-select