import {useAppDispatch, useAppSelector} from "../app/store";
import {
    changeUnreadNotificationsToRead,
    selectAllNotifications,
    selectUnReadNotifications
} from "../slices/notificationsSlice";
import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular} from '@fortawesome/fontawesome-svg-core/import.macro'
import {
    Message, MessageBody, MessageBodyText, MessageIcon, MessageTitle, MessageBodyDate, MenuInviteList, MenuInviteItem
} from "../styles/Notifications.components";
import {useTranslation} from "react-i18next";
import {Timestamp} from "firebase/firestore";
import {selectUser} from "../slices/usersSlice";

export interface NotificationsListProps{
    handleClose:() => void
}

const NotificationsList = ({handleClose}: NotificationsListProps)=>{
    const {t} = useTranslation()
    const user = useAppSelector(selectUser)
    const allNotifications = useAppSelector(selectAllNotifications)
    const unReadNotifications = useAppSelector(selectUnReadNotifications)
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLUListElement>(null);
    let navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
         const checkIfClickedOutside =(e:any) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (dropdownOpen && !!ref.current && !ref.current?.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [dropdownOpen])

    const [date, setDate] = useState( new Date())
    useEffect(()=>{

        allNotifications.forEach((notification)=> {
            let notificationDateFromFirebase = notification.date
            let notificationTimestamp = Timestamp.fromMillis(notificationDateFromFirebase!!.seconds * 1000);
            //
            setDate(notificationTimestamp.toDate())

        })
    }, [allNotifications])
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
                                       <MessageBodyDate>{date.toLocaleString()}</MessageBodyDate>
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