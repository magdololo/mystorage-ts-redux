import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/store";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {auth, signOut} from "../firebase";
import {deleteUserAccount, logout, selectUser} from "../slices/usersSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faUser, faHandPointRight, faUserGroup, faUserPlus, faUserSlash, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import Divider from "@mui/material/Divider";
import {Accordion} from "react-accordion-ts";
import {Modal} from "../component/Modal/Modal";
import {useModal} from "../component/Modal/UseModal";

import AddCoUserForm from "../component/AddCoUserForm";
import AddProductForm from "../features/products/AddProductForm";
import {AddProductButton} from "../styles/Products.components";
import {useMediaQuery} from "usehooks-ts";

//import AddMedicineForm from "../features/medicines/AddMedicineForm";

interface SidebarProps{
    toggleDrawer: null | (()=> void);
}

const Sidebar = ({toggleDrawer}: SidebarProps) => {
    const dispatch = useAppDispatch();
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    let user = useAppSelector(selectUser);
    //const currentStorageId = useAppSelector(selectCurrentStorage)
    const [isEnglish, setIsEnglish] = useState<boolean>(false);
    const {
        isShown: isShownAddProductModal,
        handleClose: handleCloseAddProduct,
        handleShown: handleShownAddProductModal
    } = useModal()
    const {
        isShown: isShownAddCoUserModal,
        handleClose: handleCloseAddCoUser,
        handleShown: handleShownAddCoUserModal
    } = useModal()
    const {
        isShown: isShownDeleteAccountModal,
        handleClose: handleCloseDeleteAccount,
        handleShown: handleShownDeleteAccountModal
    } = useModal()
    const {
        isShown: isShownAfterDeleteAccountModal,
        handleClose: handleCloseAfterDeleteAccount,
        handleShown: handleShownAfterDeleteAccountModal
    } = useModal()
    const modalHeader = ""
    const addProductModalHeader = t("products.AddProductForm.formAddProductTitle")
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')
    const isBiggerThan1280 = useMediaQuery('(min-width: 1280px)')
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (toggleDrawer !== null) {
            toggleDrawer()
        }
    };
    const handleToggle = () => {
        setIsEnglish(!isEnglish);
    };
    useEffect(()=>{
        if(isEnglish){
            i18n.changeLanguage("en");
        } else {
            i18n.changeLanguage("pl");
        }
    },[isEnglish])// eslint-disable-line react-hooks/exhaustive-deps
    const refreshPage = ()=>{
        window.location.reload(); }
    const logoutOfApp = () => {
        signOut(auth);
        dispatch(logout())
        navigate('/')
        refreshPage()

    };
    const deleteAccount = (userId: string) => {
        console.log(userId)
        dispatch(deleteUserAccount(userId));
        handleCloseDeleteAccount()
        handleShownAfterDeleteAccountModal()
    }
    const onCloseAfterDeleteAccount =()=>{
        handleCloseAfterDeleteAccount();
        logoutOfApp()
    }
    const myAccordion = [
        {title: <span><FontAwesomeIcon className="text-xl text-purple px-4" icon={faUser} />{t("BottomHamburgerMenu.myAccount")}</span>,
            content:
            <>
                <ul className="text-gray-light text-lg pt-2 relative">
                    <li className="text-sm pt-1 pl-2" onClick={() => navigate('/choose')}><FontAwesomeIcon
                        className="text-sm text-purple px-4" icon={faEnvelope}/>Choose type
                    </li>
                    <li className="text-sm pt-1 pl-2"><FontAwesomeIcon className="text-sm text-purple px-4"
                                                                       icon={faEnvelope}/>{user?.email}</li>
                    <li className="text-sm cursor-pointer pt-2 pl-2" onClick={() => handleShownDeleteAccountModal()}>
                        <FontAwesomeIcon className="text-sm text-purple px-4"
                                         icon={faUserSlash}/>{t("BottomHamburgerMenu.deleteAccount")}</li>
                </ul>
            </>
        }
    ]

    const dividerStyle = {
        marginLeft: '1rem',
        marginRight: '1rem'
    }
    let contentModalDeleteAccount =
        <>
            <h3 className="text-center">{t("sidebar.contentModalDeleteAccount_h3")}</h3>
            <p className={"text-center mb-2"}>{t("sidebar.contentModalDeleteAccount_p")}</p>
            <button className=" block mx-auto px-2 py-2 text-white font-bold bg-purple text-xsm leading-tight uppercase rounded shadow-md tracking-wider
                                 hover:shadow-l focus:shadow-lg focus:outline-none focus:ring-0"
                    onClick={() => deleteAccount(user!!.uid)}>{t("buttons.confirm")}</button>
        </>
    let contentModalAfterDeleteAccount =
        <>
            <h3 className="text-center">{t("sidebar.contentModalAfterDeleteAccount_h3")}</h3>
            <p className={"text-center mb-2 mt-2"}>{t("sidebar.contentModalAfterDeleteAccount_h3")}</p>
        </>
    // let modalContent;
    // if(currentStorageId === user?.uid){
    //     modalContent=
    //         <>
    //             <Modal isShown={isShownAddProductModal} hide={()=> handleCloseAddProduct()} modalHeaderText={addProductModalHeader}  modalContent={AddProductForm({handleCloseAddProduct, isShownAddProductModal})}/>
    //         </>
    // } else if(currentStorageId === user?.uid+"pharmacy"){
    //     modalContent=
    //         <>
    //             <Modal isShown={isShownAddProductModal} hide={()=> handleCloseAddProduct()} modalHeaderText={addProductModalHeader}  modalContent={AddMedicineForm({handleCloseAddProduct, isShownAddProductModal})}></Modal>
    //         </>
    // }

    return (
        <>
            <div className="flex justify-center">
                <ul className="bg-white rounded-lg w-96 text-gray text-lg pt-10 relative">

                    <li key='5' className="flex flex-row justify-end cursor-pointer ">
                        <span className={isEnglish ? "fi fi-pl p-4 mr-4" : "fi fi-gb p-4 mr-4"} onClick={handleToggle}/>
                    </li>
                    <Divider style={isSmallerThan1280 ? dividerStyle : {}}/>
                    <li key='1' className="px-6 py-2  w-full rounded-t-lg" onClick={handleClick}><Link
                        to={'/categories'}> <FontAwesomeIcon className="text-xl text-purple px-4"
                                                             icon={faHandPointRight}/>{t("BottomHamburgerMenu.categoryList")}
                    </Link></li>
                    <li key='2' className="px-6 py-2  w-full" onClick={handleClick}><Link
                        to={'/products'}><FontAwesomeIcon className="text-xl text-purple px-4"
                                                          icon={faHandPointRight}/>{t("BottomHamburgerMenu.productList")}
                    </Link></li>
                    <Divider style={isSmallerThan1280 ? dividerStyle : {}}/>
                    <li key='3' className="px-6 py-2  w-full cursor-pointer -toggle-down">
                        <Accordion items={myAccordion} duration={300} multiple={false}/>
                    </li>
                    <li key='6' className="px-6 py-2  w-full cursor-pointer" onClick={handleClick}><FontAwesomeIcon
                        className="text-xl text-purple px-4 " icon={faUserGroup}/><Link
                        to={'/shares/'}>{t("BottomHamburgerMenu.coUsers")}</Link></li>
                    <li key='7' className="pl-6 py-2  w-full cursor-pointer"
                        onClick={() => handleShownAddCoUserModal()}><FontAwesomeIcon
                        className="text-xl text-purple px-4 " icon={faUserPlus}/>{t("BottomHamburgerMenu.addCoUser")}
                    </li>
                    <li key='4' className="px-6 py-2  w-full cursor-pointer" onClick={logoutOfApp}><FontAwesomeIcon
                        className="text-xl text-purple px-4"
                        icon={faArrowRightFromBracket}/>{t("BottomHamburgerMenu.signOut")}</li>

                </ul>
            </div>
            {isBiggerThan1280 ?
                <div className="flex justify-center py-10 pl-6">
                    <AddProductButton
                        onClick={() => handleShownAddProductModal()}>{t("buttons.addProduct")}</AddProductButton>
                </div> : null}
            <Modal isShown={isShownAddCoUserModal} hide={() => handleCloseAddCoUser()} modalHeaderText={modalHeader}
                   modalContent={AddCoUserForm({handleCloseAddCoUser, isShownAddCoUserModal, handleClick})}/>
            <Modal isShown={isShownAddProductModal} hide={() => handleCloseAddProduct()}
                   modalHeaderText={addProductModalHeader}
                   modalContent={AddProductForm({handleCloseAddProduct, isShownAddProductModal})}/>
            <Modal isShown={isShownDeleteAccountModal} hide={() => handleCloseDeleteAccount()} modalHeaderText={""}
                   modalContent={contentModalDeleteAccount}/>
            <Modal isShown={isShownAfterDeleteAccountModal} hide={() => onCloseAfterDeleteAccount()}
                   modalHeaderText={""} modalContent={contentModalAfterDeleteAccount}/>
        </>
    )
}
export default Sidebar