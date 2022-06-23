import SearchInput from "./SearchInput";
import Hamburger from "./Hamburger";
import {Modal} from "../../component/Modal/Modal";
import React from "react";
import AddProductForm from "../../features/products/AddProductForm";
import {useModal} from "../../component/Modal/UseModal";

const BottomMenu = () => {

    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = "Dodaj produkt"
    console.log("czesc bottom menu")
    return(
        <>
                <div className='w-screen fixed top-auto bottom-0 bg-white z-40  '>
                    <div className="flex flex-1 max-w-lg mx-auto py-8 ">
                        <Hamburger/>
                        <SearchInput/>
                        {/*variant="secondary"*/}
                        <button
                            className="text-sm bg-purple hover:bg-purple-500 text-white uppercase font-bold py-2 px-4 border rounded-md shadow-xs hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                            onClick={handleShown}>
                            dodaj product
                        </button>


                        <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}  modalContent={AddProductForm({handleClose, isShown})}/>
                    </div>
                </div>



        </>
    )

};
export default BottomMenu;