import {
    ChangeMedicineQuantity,
    changeMedicineQuantity, deleteUserMedicine,
    editMedicine,
    selectUserMedicines,
    UserMedicine
} from "../slices/userMedicineSlice";
import {useAppSelector, useAppDispatch} from "../app/store";
import React, {useState} from "react";
import {useModal} from "../component/Modal/UseModal";
import {useMediaQuery} from "@mui/material";
import ReturnToCategoryList from "../component/ReturnToCategoryList";
import {ProductNameBox, ProductsBox, ProductsListBox, SingleProductBox} from "../styles/Products.components";
import {SinglePageTitle} from "../styles/Root.components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Modal} from "../component/Modal/Modal";
import EditMedicineForm from "../features/medicines/EditMedicineForm";
import {useTranslation} from "react-i18next";


const MedicinesList = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const userMedicines = useAppSelector(selectUserMedicines)
    let [todayDate] = useState(new Date());
    const {
        isShown: isShownEditMedicineModal,
        handleShown: handleShownEditMedicineModal,
        handleClose: handleCloseEditMedicineModal
    } = useModal()
    const modalHeader = "Edytuj lek"
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')

    const chooseEditMedicine = (userMedicine: UserMedicine) => {
        handleShownEditMedicineModal()
        dispatch(editMedicine(userMedicine))
    }

    const increment = (userMedicine: UserMedicine) => {
        const changeQuantityMedicine: ChangeMedicineQuantity = {
            userMedicine: userMedicine,
            changeQuantity: "increment"
        }
        dispatch(changeMedicineQuantity(changeQuantityMedicine))
    }
    const decrement = (userMedicine: UserMedicine) => {
        if (userMedicine.quantity === 1)
            return
        const changeQuantityMedicine: ChangeMedicineQuantity = {
            userMedicine: userMedicine,
            changeQuantity: "decrement"
        }
        dispatch(changeMedicineQuantity(changeQuantityMedicine))
    }
    const deleteUserOneMedicine = (userMedicine: UserMedicine) => {
        dispatch(deleteUserMedicine(userMedicine))

    }

    return (
        <>
            {isSmallerThan1280 ? <ReturnToCategoryList/> : null}
            <ProductsBox>
                <SinglePageTitle>{t('medicines.MedicinesList.title')}</SinglePageTitle>
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
                                        {product.expireDate ?
                                            <span>Data ważności&#58; {product.expireDate.toISOString().substring(0, 10)} </span> : ""} &nbsp;
                                    </div>
                                    {product.openDate !== null ?
                                        <div
                                            className={"text-sm md:text-md text-gray-dark"}>
                                            {product.openDate ?
                                                <span>Data otwarcia&#58; {product.openDate.toISOString().substring(0, 10)} </span> : ""} &nbsp;
                                        </div> : <span></span>}
                                </div>
                                <div className={"h-1/3 md:flex md:justify-end md:items-end"}>
                                    <div className={"md:flex md:justify-end"}>
                                        <div
                                            className="flex flex-row flex-nowrap  relative items-center pt-4 justify-end items-end">
                                            <FontAwesomeIcon className="text-md text-blue-500  px-4 sm:text-lg"
                                                             icon={faMinus} onClick={() => decrement(product)}/>
                                            <span
                                                className="text-md text-blue-800 px-2 sm:text-lg">{product.quantity}</span>
                                            <FontAwesomeIcon
                                                className="text-md text-blue-500 border-blue-400 border-solid border-r px-4 sm:text-lg"
                                                icon={faPlus} onClick={() => increment(product)}/>
                                            <FontAwesomeIcon
                                                className="text-md text-blue-800 border-blue-400 border-solid border-r px-4 sm:text-xl"
                                                icon={faTrash} onClick={() => deleteUserOneMedicine(product)}/>
                                            <FontAwesomeIcon className="text-md text-blue-800 px-4 sm:text-lg"
                                                             icon={faPen} onClick={() => chooseEditMedicine(product)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SingleProductBox>
                    )}
                </ProductsListBox>
            </ProductsBox>
            <Modal isShown={isShownEditMedicineModal} hide={handleCloseEditMedicineModal} modalHeaderText={modalHeader}
                   modalContent={<EditMedicineForm handleClose={handleCloseEditMedicineModal}
                                                   isShown={isShownEditMedicineModal}/>}/>


        </>
    )
}
export default MedicinesList