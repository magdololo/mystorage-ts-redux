import {useAppDispatch, useAppSelector} from "../app/store";
import {
    changeUnreadNotificationsToRead,
    selectUnReadNotifications
} from "../slices/notificationsSlice";
import React from "react";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular} from '@fortawesome/fontawesome-svg-core/import.macro'
import {
    Message, MessageBody, MessageBodyText, MessageIcon, MessageTitle, MessageBodyDate, MenuInviteList, MenuInviteItem
} from "../styles/Notifications.components";
import {useTranslation} from "react-i18next";

import {selectUser} from "../slices/usersSlice";

export interface NotificationsListProps{
    handleClose:() => void
}
const NotificationsList = ({handleClose}: NotificationsListProps)=>{
    const {t} = useTranslation()
    const user = useAppSelector(selectUser)
    const unReadNotifications = useAppSelector(selectUnReadNotifications)
    const dispatch = useAppDispatch()
    let navigate = useNavigate()

    const handleClickNotify = () =>{
        navigate("/shares")
        handleClose()
        dispatch(changeUnreadNotificationsToRead(user!.uid))
    }
    return(
       <>
               <MenuInviteList >
                   {unReadNotifications.length > 0 ?
                       unReadNotifications.map(notification => (
                           <MenuInviteItem className={"h-32 relative border-b border-gray-extraLight w-full rounded-t-lg py-2"}
                               key={notification?.id} onClick={handleClickNotify}>

                               <MessageTitle>{notification.type === "invite" ? t("notifications.notificationTypeInvite") : t("notifications.notificationTypeInfo")}</MessageTitle>
                               <Message>
                                   <MessageIcon>
                                       {notification.type === "invite" ?
                                           <FontAwesomeIcon icon={regular('envelope')}
                                                            className={"w-6 h-6 text-purple2 justify-center items-center"}/> :
                                           <FontAwesomeIcon icon={regular('comment')}
                                                            className={"w-6 h-6 text-blue-400 justify-center items-center"}/>
                                       }
                                   </MessageIcon>
                                   <MessageBody >
                                       <MessageBodyText>{notification.cta + " " + t("notifications." + notification.change)}</MessageBodyText>
                                       <MessageBodyDate>{notification.date?.toLocaleString()}</MessageBodyDate>
                                   </MessageBody>

                               </Message>

                           </MenuInviteItem>))
                       : <h3>{t("notifications.noNotifications")}</h3>
                   }
               </MenuInviteList>
       </>
    )
}

export default NotificationsList;