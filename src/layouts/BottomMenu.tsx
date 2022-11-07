import Hamburger from "../component/BottomMenu/Hamburger";
import {Modal} from "../component/Modal/Modal";
import React from "react";
import AddProductForm from "../features/products/AddProductForm";
import {useModal} from "../component/Modal/UseModal";
import SearchInput from "../component/BottomMenu/SearchInput";
import {useTranslation} from "react-i18next";
import ButtonAddProduct from "../component/BottomMenu/ButtonAddProduct";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../app/store";
import {Category, selectCategoryByPath} from "../slices/categoriesSlice";

const BottomMenu = () => {
    const { t, i18n } = useTranslation();
    console.log(i18n.language)
    const {isShown: isShownAddProductModal, handleShown, handleClose: handleCloseAddProduct} = useModal()
    const {categoryPath} = useParams();
    const categoryFromPath = useAppSelector(selectCategoryByPath(categoryPath ?? "")) as Category

    console.log(categoryFromPath)
    const modalHeader = t("products.AddProductForm.formAddProductTitle")

    return(
        <>
            <div className='w-screen fixed top-auto bottom-0 bg-white z-100 '>
                <div className="w-11/12 flex flex-row flex-1 max-w-lg py-8 mx-auto ">
                    <Hamburger/>
                    <SearchInput/>
                    <ButtonAddProduct handleOpen={handleShown}/>
                    <Modal isShown={isShownAddProductModal} hide={handleCloseAddProduct} modalHeaderText={modalHeader}  modalContent={AddProductForm({handleCloseAddProduct, isShownAddProductModal})}/>

                </div>
            </div>
        </>
    )

};
export default BottomMenu;
