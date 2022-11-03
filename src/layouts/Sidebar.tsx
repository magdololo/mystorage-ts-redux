import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/store";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {auth, signOut} from "../firebase";
import {logout, selectUser} from "../slices/usersSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faUser, faHandPointRight, faUserGroup, faUserPlus, faShareFromSquare} from "@fortawesome/free-solid-svg-icons";
import Divider from "@mui/material/Divider";
import {Accordion} from "react-accordion-ts";
import {Modal} from "../component/Modal/Modal";
import {useModal} from "../component/Modal/UseModal";

import AddCoUserForm from "../component/AddCoUserForm";
import AddProductForm from "../features/products/AddProductForm";
import {AddProductButton} from "../styles/Products.components";
import {selectAcceptedIncomingInvites, Invite} from "../slices/sharesSlice";
import {fetchUserProducts, removeProducts} from "../slices/userProductsSlice";
import {fetchCategories, removeCategories} from "../slices/categoriesSlice"
import {fetchImages} from "../slices/imagesSlice";
// import {MenuShares} from "../styles/Shares.components";

interface SidebarProps{
    toggleDrawer: null | (()=> void);
}
const Sidebar =({toggleDrawer}:SidebarProps)=>{
    const dispatch = useAppDispatch();
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    let user = useAppSelector(selectUser);
    const userId = user?.uid;
    const allAcceptedIncomingInvites = useAppSelector(selectAcceptedIncomingInvites)
    const [isEnglish, setIsEnglish]= useState<boolean>(false);
    const {isShown: isShownAddProductModal, handleClose: handleCloseAddProduct, handleShown: handleShownAddProductModal } = useModal()
    const {isShown: isShownAddCoUserModal, handleClose: handleCloseAddCoUser, handleShown: handleShownAddCoUserModal} = useModal()
    // const { handleClose, handleShown} = useModal()
    const modalHeader = ""
    const addProductModalHeader = t("products.AddProductForm.formAddProductTitle")
    const handleClick = (e: any) => {
        e.stopPropagation();
        if(toggleDrawer !== null){
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
    const myAccordion = [
        {title: <span><FontAwesomeIcon className="text-xl text-purple px-4" icon={faUser} />{t("BottomHamburgerMenu.myAccount")}</span>,
            content: <span className="text-sm font-bold">{user?.email}</span>}
    ]





    const [active, setActive] = useState(false)
    if(!active){
        console.log("user oryginal")
        dispatch(removeProducts())
        dispatch(removeCategories())
        dispatch(fetchCategories(userId!!))
        dispatch(fetchImages(userId!!))
        dispatch(fetchUserProducts(userId!!))

    }
    const myAccordionWithShares = [
        {
            title: <span><FontAwesomeIcon className="text-2.5xl text-purple px-4" icon={faShareFromSquare} onClick={()=> setActive((prevState) => !prevState)}/></span>,
            content:
                <>
                    <ul>
                        {allAcceptedIncomingInvites.map(invite => {
                            return <li onClick={() => changeStorage(invite.user_id)}>{invite.user_email}</li>
                        })}
                    </ul>
                </>
        }
    ]
    const handleOpenAddProductModal = ()=>{
        handleShownAddProductModal()
    }
    const handleCloseAddProductModal = ()=>{

        handleCloseAddProduct()
    }
    const handleOpenAddCoUserModal = ()=>{
        handleShownAddCoUserModal()
        console.log("open modal co user")
        console.log(isShownAddCoUserModal)
    }
    const handleCloseAddCoUserModal =()=>{

        handleCloseAddCoUser()
    }
    console.log(allAcceptedIncomingInvites)

    const changeStorage =(inviteUserId: string)=> {
        console.log("changeStorage")
        dispatch(removeProducts())
        dispatch(removeCategories())
        dispatch(fetchCategories(inviteUserId))
        dispatch(fetchImages(inviteUserId))
        dispatch(fetchUserProducts(inviteUserId))


    }

    return(
        <>
            <div className="flex justify-center">
                <ul className="bg-white rounded-lg w-96 text-gray text-lg pt-10 relative">

                    <li key='5' className="flex flex-row justify-end cursor-pointer ">
                        <span className={ isEnglish ? "fi fi-pl p-4" : "fi fi-gb p-4"} onClick={handleToggle}/>
                        {/*<MenuShares>*/}
                        <span className={"p-2"}>
                            <Accordion items={myAccordionWithShares} duration={300} multiple={false}/>
                            </span>
                        {/*</MenuShares>*/}
                    </li>
                    <Divider />
                    <li key='1' className="px-6 py-2  w-full rounded-t-lg" onClick={handleClick}><Link to={'/categories'}> <FontAwesomeIcon className="text-xl text-purple px-4" icon={faHandPointRight} />{t("BottomHamburgerMenu.categoryList")}</Link></li>
                    <li key='2' className="px-6 py-2  w-full" onClick={handleClick}><Link to={'/products'}><FontAwesomeIcon className="text-xl text-purple px-4" icon={faHandPointRight} />{t("BottomHamburgerMenu.productList")}</Link></li>
                    <Divider />
                    <li key='3' className="px-6 py-2  w-full cursor-pointer -toggle-down" >
                        <Accordion items={myAccordion} duration={300} multiple={false}/>
                    </li>
                    <li key='6' className="px-6 py-2  w-full cursor-pointer" onClick={handleClick}><FontAwesomeIcon className="text-xl text-purple px-4 " icon={faUserGroup} /><Link to={'/shares/'}>{t("BottomHamburgerMenu.coUsers")}</Link></li>
                    <li key='7' className="pl-6 py-2  w-full cursor-pointer" onClick={handleOpenAddCoUserModal}><FontAwesomeIcon className="text-xl text-purple px-4 " icon={faUserPlus} />{t("BottomHamburgerMenu.addCoUser")}</li>
                    <li key='4' className="px-6 py-2  w-full cursor-pointer" onClick={logoutOfApp}><FontAwesomeIcon className="text-xl text-purple px-4" icon={faArrowRightFromBracket} />{t("BottomHamburgerMenu.signOut")}</li>
                </ul>
            </div>
            <div className="flex justify-center py-10 pl-6">
                <AddProductButton onClick={handleOpenAddProductModal}>{t("buttons.addProduct")}</AddProductButton>
            </div>
            <Modal isShown={isShownAddCoUserModal} hide={handleCloseAddCoUserModal} modalHeaderText={modalHeader}  modalContent={AddCoUserForm({handleCloseAddCoUser, isShownAddCoUserModal})}/>
            <Modal isShown={isShownAddProductModal} hide={handleCloseAddProductModal} modalHeaderText={addProductModalHeader}  modalContent={AddProductForm({handleCloseAddProduct, isShownAddProductModal})}/>
        </>
    )
}
export default Sidebar