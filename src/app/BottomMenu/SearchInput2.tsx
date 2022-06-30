import Select from "react-select";
import React, {useEffect, useState} from "react";
import {useAppDispatch,useAppSelector} from "../store";
import {searchByString, searchProduct, selectUserProducts} from "../../features/products/userProductsSlice";
import {useNavigate} from "react-router-dom";

const SearchInput2 =()=>{
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    let userProducts = useAppSelector(selectUserProducts)
    const [textFromInput, setTextFromInput] = useState("")

    const options =userProducts.map(userProduct => {
        return{label: userProduct.name + userProduct.capacity + userProduct.unit, value: userProduct.id}})

    let searchFromOnChange = true;
    const onChange=(e: any)=>{
        if(searchFromOnChange){
            dispatch(searchProduct(e.value))
            navigate('/search')
        }
    }

    const onInputChange=(e:string)=>{
        setTextFromInput(e)
    }

    const onKeyDown=(e: any)=>{
        if(e.keyCode === 13){
           searchFromOnChange = false
            dispatch(searchByString(textFromInput))
            navigate('/search')
        }
    }


    return(
        <>
            <div className="flex flex-1 pr-1">
                <Select options={options} menuPlacement={"top"} isClearable className="react-select-container" classNamePrefix="react-select"  onChange={onChange} onInputChange={onInputChange} onKeyDown={onKeyDown}/>
                {/*styles={singleSelectStyle(variant)}*/}
                <div/>
            </div>
        </>
    )
}
export default SearchInput2