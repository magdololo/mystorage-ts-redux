import React from 'react';
import { Modal } from '../Modal/Modal';
import { useModal } from '../Modal/UseModal';
import FormAddProduct from "../FormAddProduct";

const ButtonAddProduct = () => {
    const { isShown, handleShown, handleClose} = useModal();
    const content = FormAddProduct();
    return(
        <>
            <div className="xs:absolute xs:flex xs:bottom-16 xs:right-10
                            sm:relative sm:inline-block sm:inset-0 sm:flex ">
                        <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalCenteredScrollable"
                            onClick={handleShown}
                            className="
                            py-5 px-3 max-w-min rounded-full text-center text-xs font-bold leading-5 bg-purple text-white uppercase shadow-md transition duration-150 ease-in-out
                            hover:bg-blue-700 hover:shadow-lg
                            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-blue-800 active:shadow-lg
                            sm:py-2 sm:px-6 sm:rounded sm:text-sm"
                        >dodaj product
                        </button>

            </div>
                <Modal isShown={isShown} hide={handleClose} modalContent={content} modalHeaderText={"Dodaj product"} />


        </>
    )

}
export default ButtonAddProduct;
