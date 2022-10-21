import React from 'react';
import {useTranslation} from "react-i18next";
import {AddProductButton} from "../../styles/Products.components";

interface ButtonAddProductProps{
    handleOpen: ()=>void;
}
const ButtonAddProduct = ({handleOpen}: ButtonAddProductProps)  => {
    const { t, i18n } = useTranslation();
    console.log(i18n.language)

    return(
        <>
            <AddProductButton onClick={handleOpen}>{t("buttons.addProduct")}</AddProductButton>
        </>
    )
}

export default ButtonAddProduct;
