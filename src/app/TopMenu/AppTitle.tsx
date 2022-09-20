import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useAppSelector} from "../store";
import {selectUnReadNotifications} from "../../features/notifications/notificationsSlice";
import {useModal} from "../../component/Modal/UseModal";
import EditProductForm from "../../features/products/EditProductForm";
import {Modal} from "../../component/Modal/Modal";

const AppTitle = () => {
    const { t, i18n } = useTranslation();
    console.log(i18n.language)
    const unReadNotifications = useAppSelector(selectUnReadNotifications)
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = t("categories.CategoryPage.editProduct")

    const modalContent =
        <>
            {unReadNotifications.map(notification => (
                <li className={"inline-block py-4 text-gray"} key={notification?.id}>{notification.text} {notification.date.toLocaleString()}</li>


            ))}
        </>

    return(
        <>
            <div className="w-screen-xs mx-auto max-w-screen-lg relative text-center bg-gray-50 text-gray pt-10 pb-4 px-6 ">
                <h1 className="text-2xl font-bold mt-0 mb-6 sm:text-3xl md:text-4xl">{t("app_title")}</h1>
                {unReadNotifications.length > 0 ?
                <div className={"absolute top-8 right-4 md:right-12" } onClick={handleShown}><FontAwesomeIcon className={"text-xl md:text-2xl text-red px-4 pt-4" } icon={faBell}/><span className={"absolute top-0 right-0 text-dark-red"}>{unReadNotifications.length}</span></div>
                : null}
            </div>
            <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}  modalContent={modalContent}/>
        </>
    )

}
export default AppTitle;
//