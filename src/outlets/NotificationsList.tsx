import {useAppSelector} from "../app/store";
import {selectAllNotifications, selectUnReadNotifications} from "../slices/notificationsSlice";
import React, {useState, useEffect, useRef} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular} from '@fortawesome/fontawesome-svg-core/import.macro'
import {
    Message, MessageBody, MessageBodyText, MessageIcon, MessageBodyDate, MessageTitle, MenuInviteList, MenuInviteItem
} from "../styles/Notifications.components";


const NotificationsList = ()=>{
    const allNotifications = useAppSelector(selectAllNotifications)
    const unReadNotifications = useAppSelector(selectUnReadNotifications)
    const ref = useRef<HTMLUListElement>(null);
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
    const dropdownContent =
        <>
            <MenuInviteList className="list" ref={ref}>
                <MenuInviteItem className="list-item borderBottom">Akceptuj</MenuInviteItem>
                <MenuInviteItem className="list-item borderBottom">Odrzuć</MenuInviteItem>
                <MenuInviteItem className="list-item">Nie teraz</MenuInviteItem>
            </MenuInviteList>
        </>
    return(
       <>
           <div className="flex justify-center flex-nowrap">
               <ul className="bg-white rounded-lg w-full">
                   {unReadNotifications.length > 0 ?
                       unReadNotifications.map(notification => (
                           <li className={"h-32 relative border-b border-gray-extraLight w-full rounded-t-lg py-2"}
                               key={notification?.id}>
                               <Message>
                                   <MessageIcon>
                                       {notification.type === "invite" ?
                                           <FontAwesomeIcon icon={regular('envelope')}
                                                            className={"w-6 h-6 text-purple2 justify-center items-center"}/> :
                                           <FontAwesomeIcon icon={regular('comment')}
                                                            className={"w-6 h-6 text-blue-400 justify-center items-center"}/>}
                                   </MessageIcon>
                                   <MessageBody>
                                       <MessageTitle>{notification.type === "invite" ? "Zaproszenie!" : "Informacja!"}</MessageTitle>
                                       {notification.type === "invite" ?
                                           <>
                                               {/*<div className="dropdown" >*/}
                                               <button onClick={() => {
                                                   setDropdownOpen(prevState => !prevState)
                                                   console.log(notification.id)
                                               }}>
                                                   <FontAwesomeIcon icon={solid('ellipsis')}
                                                                    className={(dropdownOpen ? "text-white bg-purple-800 w-5 h-5 absolute top-5 right-8" : " w-5 h-5 text-purple-800 absolute top-5 right-8")}/>{/*+}*/}
                                               </button>
                                               {dropdownOpen && (dropdownContent)}
                                               {/*</div>*/}
                                           </>
                                           : null}
                                       <MessageBodyText>{notification.text}</MessageBodyText>
                                       <MessageBodyDate>{notification.date.toLocaleString()}</MessageBodyDate>
                                   </MessageBody>

                               </Message>
                           </li>))
                       : allNotifications.map(notification => (
                           <li className={"h-32 relative border-b border-gray-extraLight w-full rounded-t-lg py-2"}
                               key={notification?.id}>
                               <Message>
                                   <MessageIcon>
                                       {notification.type === "invite" ?
                                           <FontAwesomeIcon icon={regular('envelope')}
                                                            className={"w-6 h-6 text-purple2 justify-center items-center"}/> :
                                           <FontAwesomeIcon icon={regular('comment')}
                                                            className={"w-6 h-6 text-blue-400 justify-center items-center"}/>}
                                   </MessageIcon>
                                   <MessageBody>
                                       <MessageTitle>{notification.type === "invite" ? "Zaproszenie!" : "Informacja!"}</MessageTitle>
                                       {notification.type === "invite" ?
                                           <>
                                               {/*<div className="dropdown" >*/}
                                               <button onClick={() => {
                                                   setDropdownOpen(prevState => !prevState)
                                                   console.log(dropdownOpen)
                                               }}>
                                                   <FontAwesomeIcon icon={solid('ellipsis')}
                                                                    className={(dropdownOpen ? "text-white bg-purple-800 w-5 h-5 absolute top-5 right-8" : " w-5 h-5 text-purple-800 absolute top-5 right-8")}/>{/*+}*/}
                                               </button>
                                               {dropdownOpen && (dropdownContent)}
                                               {/*</div>*/}
                                           </>
                                           : null}
                                       <MessageBodyText>{notification.text}</MessageBodyText>
                                       <MessageBodyDate>{notification.date.toLocaleString()}</MessageBodyDate>
                                   </MessageBody>

                               </Message>
                           </li>))
                   }
               </ul>
           </div>

       </>
    )
}

export default NotificationsList