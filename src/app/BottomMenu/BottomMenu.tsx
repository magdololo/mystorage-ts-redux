import Hamburger from "./Hamburger";
import {Modal} from "../../component/Modal/Modal";
import React from "react";
import AddProductForm from "../../features/products/AddProductForm";
import {useModal} from "../../component/Modal/UseModal";
import SearchInput from "./SearchInput";
import {useTranslation} from "react-i18next";
import ButtonAddProduct from "./ButtonAddProduct";

const BottomMenu = () => {
    const { t, i18n } = useTranslation();
    console.log(i18n.language)
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = t("products.AddProductForm.formAddProductTitle")

    return(
        <>
            <div className='w-screen fixed top-auto bottom-0 bg-white z-100 '>
                <div className="w-11/12 flex flex-row flex-1 max-w-lg py-8 mx-auto ">
                    <Hamburger/>
                    <SearchInput/>
                    <ButtonAddProduct handleOpen={handleShown}/>
                    <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}  modalContent={AddProductForm({handleClose, isShown})}/>

                </div>
            </div>
        </>
    )

};
export default BottomMenu;

// <button
//     className="flex flex-1 w-24 text-sm bg-purple  text-white uppercase font-bold py-2 px-4 border-purple rounded shadow-xs hover:shadow-lg hover:bg-purple-500 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
//     onClick={handleOpen}>{t("buttons.addProduct")}
// </button>