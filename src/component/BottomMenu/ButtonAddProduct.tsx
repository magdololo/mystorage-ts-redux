import {useState} from 'react';


const ButtonAddProduct = () => {

    const [showModal, setShowModal] = useState(false);
    return(
        <>
            <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenteredScrollable"
                onClick={() => setShowModal(true)}
                className="inline-block px-6 py-2.5 bg-purple text-white font-medium text-xs font-extra-bold leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >Dodaj product
            </button>

        </>
    )

}
export  default ButtonAddProduct;