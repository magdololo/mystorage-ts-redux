import Select from "react-select";
import React, { useState} from "react";
import {useAppDispatch,useAppSelector} from "../store";
import {searchByString, searchProduct, selectUserProducts} from "../../features/products/userProductsSlice";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "usehooks-ts";


const SearchInput =()=>{
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    let userProducts = useAppSelector(selectUserProducts)
    const [textFromInput, setTextFromInput] = useState("")
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')
    const options =userProducts.map(userProduct => {
        return{label: userProduct.name + " " +userProduct.capacity + userProduct.unit, value: userProduct.id}})

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

            <div className={isSmallerThan1280 ? "flex flex-1 pr-1" : "flex flex-1 pr-1 mr-6"}>
                <Select options={options} menuPlacement={"top"}
                        isClearable
                        className={isSmallerThan1280 ? "react-select-container-onMobile" : "react-select-container"}
                        classNamePrefix="react-select"
                        onChange={onChange}
                        onInputChange={onInputChange}
                        onKeyDown={onKeyDown}
                    />
                {/*styles={singleSelectStyle(variant)}*/}
            </div>

        </>
    )
}
export default SearchInput