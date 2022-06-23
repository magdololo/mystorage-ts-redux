import React from 'react';
type ButtonAddProductProps = {
    handleOpen: ()=>void;
}

const ButtonAddProduct = ({handleOpen}: ButtonAddProductProps) => {


    return(
        <>
            <button
                className="flex flex-1 w-24 text-sm bg-purple hover:bg-purple-500 text-white uppercase font-bold py-2 px-4 border rounded-md shadow-xs hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                onClick={handleOpen}>
                dodaj product
            </button>
        </>
    )
}

export default ButtonAddProduct;
