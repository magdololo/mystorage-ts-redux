import React from 'react';
import { Modal } from '../Modal/Modal';
import { useModal } from '../Modal/UseModal';
import FormAddProduct from "../FormAddProduct";

const ButtonAddProduct = () => {
    const { isShown, handleShown, handleClose} = useModal();
    const content = FormAddProduct();
    return(
        <>

            <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenteredScrollable"
                onClick={handleShown}
                className=" text-center font-bold bg-purple text-white uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out xs:rounded-full xs:py-2 sm:rounded"
            >dodaj product
            </button>

                <Modal isShown={isShown} hide={handleClose} modalContent={content} modalHeaderText={"Dodaj product"} />


        </>
    )

}
export default ButtonAddProduct;
