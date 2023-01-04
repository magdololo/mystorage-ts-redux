import Select, {ActionMeta} from "react-select";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {searchByString, searchProduct, selectUserProducts} from "../../slices/userProductsSlice";
import {searchMedicine, searchMedicineByString} from "../../slices/userMedicineSlice";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "usehooks-ts";
import {useTranslation} from "react-i18next";
import {selectTypeStorage} from "../../slices/usersSlice";
import {selectUserMedicines} from "../../slices/userMedicineSlice";

type Option = {
    label: string,
    value: string
}
const SearchInput = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation();
    const typeStorage = useAppSelector(selectTypeStorage)
    let userProducts = useAppSelector(selectUserProducts)
    let userMedicines = useAppSelector(selectUserMedicines)
    const [textFromInput, setTextFromInput] = useState("")
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')

    const options = userProducts.map(userProduct => {
        return {label: userProduct.name + " " + userProduct.capacity + userProduct.unit, value: userProduct.id}
    })
    const optionsMedicine = userMedicines.map(userMedicine => {
        return {label: userMedicine.name + " " + userMedicine.capacity + userMedicine.unit, value: userMedicine.id}
    })


    let searchFromOnChange = true;

    const onChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {
        if (actionMeta.action === "clear") return;
        if (searchFromOnChange) {
            if (typeStorage === "product") {
                dispatch(searchProduct(option!.value))
            } else if (typeStorage === "medicine") {
                dispatch(searchMedicine(option!.value))
            }
            navigate('/search')
        }
    }
    // const onChangeMedicine = (option: Option| null, actionMeta: ActionMeta<Option>) => {
    //     if (actionMeta.action === "clear") return;
    //     if(searchFromOnChange){
    //         dispatch(searchProduct(option!.value))
    //         navigate('/search')
    //     }
    // }
    const onInputChange = (e: string) => {
        setTextFromInput(e)
    }

    const onKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            searchFromOnChange = false
            if (typeStorage === "product") {
                dispatch(searchByString(textFromInput))
            } else if (typeStorage === "medicine") {
                dispatch(searchMedicineByString(textFromInput))
            }

            navigate('/search')
        }
    }


    return(
        <>

            <div className={isSmallerThan1280 ? "flex flex-1 pr-1" : "flex flex-1 pr-1 mr-6"}>
                <Select options={typeStorage === "product" ? options : optionsMedicine} menuPlacement={"top"}
                        isClearable={true}
                        placeholder={
                            <div>{typeStorage === "product" ? t("BottomHamburgerMenu.searchProduct") : t("BottomHamburgerMenu.searchMedicine")}</div>}
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