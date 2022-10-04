import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {
    changeUnreadNotificationsToRead,
    selectUnReadNotifications
} from "../../features/notifications/notificationsSlice";
import {useModal} from "../../component/Modal/UseModal";
import {Modal} from "../../component/Modal/Modal";
import NotificationsList from "../../features/notifications/NotificationsList";
import { regular} from '@fortawesome/fontawesome-svg-core/import.macro'
const AppTitle = () => {
    const dispatch = useAppDispatch()
    const { t, i18n } = useTranslation();
    console.log(i18n.language)
    const unReadNotifications = useAppSelector(selectUnReadNotifications)
    const {isShown, handleShown, handleClose} = useModal()
    const onCloseModalWithNotifications = ()=>{
        handleClose()
        dispatch(changeUnreadNotificationsToRead(null))
    }

    return(
        <>
            <div className="mx-auto max-w-screen-lg relative text-left  bg-gray-50 text-gray pt-10 pb-4 px-6 sm:text-center">
                <h1 className="text-2xl font-bold mt-0 mb-6 sm:text-3xl md:text-4xl">{t("app_title")}</h1>

                <div className={"absolute top-8 right-4 md:right-12" } onClick={handleShown}><FontAwesomeIcon className={(unReadNotifications.length > 0 ? "text-2xl md:text-3xl text-red px-4 pt-4" : "text-2xl md:text-3xl text-gray-extraLight px-4 pt-4")} icon={regular('bell')} />
                    {unReadNotifications.length > 0 ?
                    <span className={"absolute top-0 right-0.5 bg-red px-2 rounded-full text-white"}>{unReadNotifications.length}</span> : null}</div>
            </div>

            <Modal isShown={isShown} hide={onCloseModalWithNotifications} modalHeaderText={""}  modalContent={<NotificationsList/>}/>

        </>
    )

}
export default AppTitle;
//