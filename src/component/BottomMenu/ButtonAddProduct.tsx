import React from 'react';
import {useTranslation} from "react-i18next";
import {AddProductButton} from "../../styles/Products.components";

interface ButtonAddProductProps{
    handleOpen: ()=>void;
}
const ButtonAddProduct = ({handleOpen}: ButtonAddProductProps)  => {
    const { t } = useTranslation();


    return(
        <>
            <AddProductButton onClick={handleOpen}>{t("buttons.addProduct")}</AddProductButton>
        </>
    )
}

export default ButtonAddProduct;
