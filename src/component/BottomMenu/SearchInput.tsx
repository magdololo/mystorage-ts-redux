import Select, {ActionMeta} from "react-select";
import React, { useState} from "react";
import {useAppDispatch,useAppSelector} from "../../app/store";
import {searchByString, searchProduct, selectUserProducts} from "../../slices/userProductsSlice";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "usehooks-ts";
import {useTranslation} from "react-i18next";

type Option ={
    label: string,
    value: string
}
const SearchInput =()=>{
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation();
    let userProducts = useAppSelector(selectUserProducts)
    const [textFromInput, setTextFromInput] = useState("")
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')
    const options =userProducts.map(userProduct => {
        return{label: userProduct.name + " " +userProduct.capacity + userProduct.unit, value: userProduct.id}})

    let searchFromOnChange = true;
    // const onChange=(e: any)=>{
    //     if(searchFromOnChange){
    //         dispatch(searchProduct(e.value))
    //         navigate('/search')
    //     }
    // }

    const onChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {
        if (actionMeta.action === "clear") return;
        if(searchFromOnChange){
                     dispatch(searchProduct(option!.value))
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
                        isClearable={true}
                        placeholder={<div>{t("BottomHamburgerMenu.searchProduct")}</div>}
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