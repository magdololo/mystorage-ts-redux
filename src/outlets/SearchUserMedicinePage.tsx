import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../app/store";
import {
    changeMedicineQuantity,
    ChangeMedicineQuantity, deleteUserMedicine,
    editMedicine,
    selectUserMedicineById,
    selectUserMedicines,
    UserMedicine
} from "../slices/userMedicineSlice";
import {useModal} from "../component/Modal/UseModal";
import {useMediaQuery} from "@mui/material";
import {selectAllCategories} from "../slices/categoriesSlice";
import {ProductNameBox, ProductsBox, ProductsListBox, SingleProductBox} from "../styles/Products.components";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import ReturnToCategoryList from "../component/ReturnToCategoryList";
import {Modal} from "../component/Modal/Modal";
import EditProductForm from "../features/products/EditProductForm";

const SearchUserMedicinePage = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    let [todayDate] = useState(new Date());
    const userMedicines = useAppSelector(selectUserMedicines);
    let searchMedicineId = useAppSelector(state => state.userMedicines.searchMedicine);
    let searchUserMedicineFromSelect = useAppSelector((state) => selectUserMedicineById(state, searchMedicineId ?? "")) ?? {} as UserMedicine
    const searchInputMedicineValue = useAppSelector(state => state.userMedicines.searchMedicineByString)
    const categories = useAppSelector(selectAllCategories)
    const {
        isShown: isShownEditMedicineModal,
        handleShown: handleShownEditMedicineModal,
        handleClose: handleCloseEditMedicineModal
    } = useModal()
    const modalEditMedicineHeader = t("categories.CategoryPage.editMedicine")
    const isSmallerThan1280 = useMediaQuery('(max-width: 1280px)')

    let searchMedicines: Array<UserMedicine> = []

    if (searchInputMedicineValue) {
        const searchUserMedicineFromInput = userMedicines.filter(userMedicine => userMedicine.name.startsWith(searchInputMedicineValue ?? ""))
        searchUserMedicineFromInput.forEach((searchUserMedicine) => searchMedicines.push(searchUserMedicine))
    } else {
        searchMedicines.push(searchUserMedicineFromSelect)
    }

    const chooseEditMedicine = (userMedicine: UserMedicine) => {
        handleShownEditMedicineModal()
        console.log("choose medicine")
        dispatch(editMedicine(userMedicine))

    }
    const incrementMedicine = (userMedicine: UserMedicine) => {
        const changeQuantityMedicine: ChangeMedicineQuantity = {
            userMedicine: userMedicine,
            changeQuantity: "increment"
        }
        dispatch(changeMedicineQuantity(changeQuantityMedicine))
    }
    const decrementMedicine = (userMedicine: UserMedicine) => {
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

    let content;

    type SearchMedicine = UserMedicine & { categoryPath: string, categoryTitle: string }
    const searchMedicinesWithCategory: SearchMedicine[] = searchMedicines.map(searchMedicine => {
        const searchMedicineCategory = categories.find(category => category.id === searchMedicine.categoryId)!
        return {
            ...searchMedicine,
            categoryPath: searchMedicineCategory.path,
            categoryTitle: searchMedicineCategory.title
        }
    })

    if (searchMedicinesWithCategory.length > 0) {
        content =
            <ProductsListBox justifyContent={"none"}>
                {searchMedicinesWithCategory.map((product: SearchMedicine) =>
                    <SingleProductBox primary={true}>
                        <div key={product.id}
                             className="flex flex-col relative px-2 pt-2 pb-2 cursor-pointer md:pb-4 h-full">
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
                                <div className="text-gray-light text-md">{t("products.ProductsList.productCategory")}:
                                    <Link to={"/categories/" + product.categoryPath}>
                                        <span
                                            className="capitalize text-md align-baseline text-gray font-bold ml-1">{product.categoryTitle}</span>
                                    </Link>
                                </div>
                            </div>
                            <>
                                <div className={"h-1/3 md:flex md:justify-end md:items-end"}>
                                    <div className={"md:flex md:justify-end"}>
                                        <div
                                            className="flex flex-row flex-nowrap  relative items-center pt-4 justify-end items-end">
                                            <FontAwesomeIcon className="text-md text-blue-500  px-4 sm:text-lg"
                                                             icon={faMinus} onClick={() => decrementMedicine(product)}/>
                                            <span
                                                className="text-md text-blue-800 px-2 sm:text-lg">{product.quantity}</span>
                                            <FontAwesomeIcon
                                                className="text-md text-blue-500 border-blue-400 border-solid border-r px-4 sm:text-lg"
                                                icon={faPlus} onClick={() => incrementMedicine(product)}/>
                                            <FontAwesomeIcon
                                                className="text-md text-blue-800 border-blue-400 border-solid border-r px-4 sm:text-xl"
                                                icon={faTrash} onClick={() => deleteUserOneMedicine(product)}/>
                                            <FontAwesomeIcon className="text-md text-blue-800 px-4 sm:text-lg"
                                                             icon={faPen} onClick={() => chooseEditMedicine(product)}/>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    </SingleProductBox>
                )}
            </ProductsListBox>
    } else {
        content =
            <h2 className={"text-xl font-bolder text-gray-light mt-10 ml-10 "}>{t("products.SearchUserProductPage.noSearchResult")}.</h2>
    }
    return (
        <>
            {isSmallerThan1280 ? <ReturnToCategoryList/> : null}
            <ProductsBox>
                <div className="text-center text-gray-dark pt-2 pb-2px-6">
                    <h1 className="text-2xl font-bold text-gray-light mt-0 mb-6 capitalize">{t("products.SearchUserProductPage.searchResult")}</h1>
                </div>
                {content}
            </ProductsBox>
            <Modal isShown={isShownEditMedicineModal} hide={handleCloseEditMedicineModal}
                   modalHeaderText={modalEditMedicineHeader}
                   modalContent={<EditProductForm handleClose={handleCloseEditMedicineModal}
                                                  isShown={isShownEditMedicineModal}/>}/>
        </>
    )
}
export default SearchUserMedicinePage;