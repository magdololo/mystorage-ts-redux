//import { UserMedicine} from "../slices/allMedicinesSlice";
import {selectUserMedicines} from "../slices/userMedicineSlice";
import {useAppSelector} from "../app/store";
import {selectAllCategories} from "../slices/categoriesSlice";
import React, {useState} from "react";
import {useModal} from "../component/Modal/UseModal";
import {useMediaQuery} from "@mui/material";
import ReturnToCategoryList from "../component/ReturnToCategoryList";
import {ProductNameBox, ProductsBox, ProductsListBox, SingleProductBox} from "../styles/Products.components";
import {SinglePageTitle} from "../styles/Root.components";
// import {Link} from "react-router-dom";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faMinus, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Modal} from "../component/Modal/Modal";
import EditProductForm from "../features/products/EditProductForm";
import {useTranslation} from "react-i18next";

const MedicinesList = () => {
    const {t} = useTranslation()
    //const dispatch = useAppDispatch()
    const categories = useAppSelector(selectAllCategories)
    const userMedicines = useAppSelector(selectUserMedicines)
    let [todayDate] = useState(new Date());
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = "Edytuj lek"
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')
    // const chooseEditMedicine = (userMedicine: UserMedicine) => {
    //     handleShown()
    //     dispatch(editMedicine(userMedicine))
    // }

    console.log(userMedicines)
    console.log(categories)
    return (
        <>
            {isSmallerThan1280 ? <ReturnToCategoryList/> : null}
            <ProductsBox>
                <SinglePageTitle>{t('products.ProductsList.title')}</SinglePageTitle>
                <ProductsListBox justifyContent="space-between">
                    {userMedicines.map((product) =>
                        <SingleProductBox primary={true} key={product.id}>
                            <div className="flex flex-col relative px-2 pt-2 pb-2 cursor-pointer md:pb-4 h-full">
                                <ProductNameBox>
                                    {product.name}
                                </ProductNameBox>
                                <div className={'h-auto mt-auto flex flex-col'}>
                                    <div className="text-md text-gray-light  pb-1.5 sm:text-sm md:text-base">
                                        {product.capacity}{product.unit}
                                    </div>
                                    {product.expireDate === null && <span></span>}
                                    <div
                                        className={"text-sm md:text-md " + ((product.expireDate !== null && product?.expireDate > todayDate) ? "text-gray-light" : "text-red font-bold")}>
                                        {product.expireDate ? product.expireDate.toISOString().substring(0, 10) : ""} &nbsp;
                                    </div>
                                    {/*<div className="text-gray-light text-md capitalize">{t("products.ProductsList.productCategory")}:*/}
                                    {/*    <Link to={"/categories/" + product.categoryPath}>*/}
                                    {/*        <span className="capitalize text-md align-baseline text-gray font-bold ml-1">{product.categoryTitle}</span>*/}
                                    {/*    </Link>*/}
                                    {/*</div>*/}
                                </div>
                                {/*<div className={"h-1/3 md:flex md:justify-end md:items-end"}>*/}
                                {/*    <div className={"md:flex md:justify-end"}>*/}
                                {/*        <div className="flex flex-row flex-nowrap  relative items-center pt-4 justify-end items-end">*/}
                                {/*            <FontAwesomeIcon className="text-md text-blue-500  px-4 sm:text-lg" icon={faMinus} onClick={() => decrement(product)}/>*/}
                                {/*            <span className="text-md text-blue-800 px-2 sm:text-lg">{product.quantity}</span>*/}
                                {/*            <FontAwesomeIcon className="text-md text-blue-500 border-blue-400 border-solid border-r px-4 sm:text-lg" icon={faPlus} onClick={()=>increment(product)}/>*/}
                                {/*            <FontAwesomeIcon className="text-md text-blue-800 border-blue-400 border-solid border-r px-4 sm:text-xl" icon={faTrash} onClick={()=>deleteUserOneProduct(product)}/>*/}
                                {/*            <FontAwesomeIcon className="text-md text-blue-800 px-4 sm:text-lg" icon={faPen}  onClick={()=>chooseEditProduct(product)}/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </SingleProductBox>
                    )}
                </ProductsListBox>
            </ProductsBox>
            <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}
                   modalContent={<EditProductForm handleClose={handleClose} isShown={isShown}/>}/>


        </>
    )
}
export default MedicinesList