import React from 'react';
import {useTranslation} from "react-i18next";

interface ButtonAddProductProps{
    handleOpen: ()=>void;
}
const ButtonAddProduct = ({handleOpen}: ButtonAddProductProps)  => {
    const { t, i18n } = useTranslation();
    console.log(i18n.language)

    return(
        <>
            <button className={"bg-purple text-sm text-white uppercase font-bold py-2 px-2 rounded shadow-xs hover:shadow-lg  hover:bg-purple-500 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"}
                onClick={handleOpen}>{t("buttons.addProduct")}
            </button>

        </>
    )
}

export default ButtonAddProduct;
