import {useAppSelector} from "../../app/store";
import {selectUnReadNotifications} from "./notificationsSlice";
import React, {useState, useEffect, useRef} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLightbulb, faEnvelope, faXmark, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import { solid, regular, brands, light} from '@fortawesome/fontawesome-svg-core/import.macro'
import {
    Message, MessageBody, MessageBodyText, MessageButton, MessageCloseButton, MessageIcon, MessageBodyDate, MessageTitle
} from "./Notofications.components";
interface HtmlUListEvent extends Event {
    target: HTMLUListElement & EventTarget | null;
}

const NotificationsList = ()=>{
    const unReadNotifications = useAppSelector(selectUnReadNotifications)
    const ref = useRef<HTMLUListElement>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [toggleVisible, setToggleVisible] = useState(false)

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
    }, [toggleVisible])
    const dropdownContent =
        <>
            <ul className="list" ref={ref}>
                <li className="list-item">dropdown option 1</li>
                <li className="list-item">dropdown option 2</li>
                <li className="list-item">dropdown option 3</li>
                <li className="list-item">dropdown option 4</li>
            </ul>
        {/*    <div id="myDropdown" ref={ref} className={"dropdown-content" + (dropdownOpen ? "block" : "none")}>*/}
        {/*        <ul*/}
        {/*            className="*/}
        {/*  dropdown-menu*/}
        {/*  /!*min-w-max*!/*/}
        {/*  /!*absolute*!/*/}
        {/*  /!*bg-white*!/*/}
        {/*  /!*text-base*!/*/}
        {/*  /!*z-50*!/*/}
        {/*  /!*float-left*!/*/}
        {/*  /!*py-2*!/*/}
        {/*  /!*list-none*!/*/}
        {/*  /!*text-left*!/*/}
        {/*  /!*rounded-lg*!/*/}
        {/*  /!*shadow-lg*!/*/}
        {/*  /!*mt-1*!/*/}
        {/*  /!*hidden*!/*/}
        {/*  /!*m-0*!/*/}
        {/*  /!*bg-clip-padding*!/*/}
        {/*  /!*border-none*!/*/}
        {/*"*/}
        {/*            aria-labelledby="dropdownMenuButton1"*/}
        {/*        >*/}
        {/*            <li>*/}
        {/*                <a*/}
        {/*                    className="*/}
        {/*      dropdown-item*/}
        {/*      text-sm*/}
        {/*      py-2*/}
        {/*      px-4*/}
        {/*      font-normal*/}
        {/*      block*/}
        {/*      w-full*/}
        {/*      whitespace-nowrap*/}
        {/*      bg-transparent*/}
        {/*      text-gray-700*/}
        {/*      hover:bg-gray-100*/}
        {/*    "*/}
        {/*                    href="#"*/}
        {/*                >Action</a*/}
        {/*                >*/}
        {/*            </li>*/}
        {/*            <li>*/}
        {/*                <a*/}
        {/*                    className="*/}
        {/*      dropdown-item*/}
        {/*      text-sm*/}
        {/*      py-2*/}
        {/*      px-4*/}
        {/*      font-normal*/}
        {/*      block*/}
        {/*      w-full*/}
        {/*      whitespace-nowrap*/}
        {/*      bg-transparent*/}
        {/*      text-gray-700*/}
        {/*      hover:bg-gray-100*/}
        {/*    "*/}
        {/*                    href="#"*/}
        {/*                >Another action</a*/}
        {/*                >*/}
        {/*            </li>*/}
        {/*            <li>*/}
        {/*                <a*/}
        {/*                    className="*/}
        {/*      dropdown-item*/}
        {/*      text-sm*/}
        {/*      py-2*/}
        {/*      px-4*/}
        {/*      font-normal*/}
        {/*      block*/}
        {/*      w-full*/}
        {/*      whitespace-nowrap*/}
        {/*      bg-transparent*/}
        {/*      text-gray-700*/}
        {/*      hover:bg-gray-100*/}
        {/*    "*/}
        {/*                    href="#"*/}
        {/*                >Something else here</a*/}
        {/*                >*/}
        {/*            </li>*/}
        {/*        </ul>*/}
        {/*    </div>*/}
        </>
    return(
       <>
           <div className="flex justify-center flex-nowrap">
               <ul className="bg-white rounded-lg w-full">
                   {unReadNotifications.map(notification => (
                       <li className={"h-36 relative border-b border-gray-extraLight w-full rounded-t-lg py-2 overflow-y-auto"} key={notification?.id}>

                           {/*<div className="w-full flex ">*/}
                           {/*    <div*/}
                           {/*        className=" lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">*/}
                           {/*        {notification.type === "invite" ?*/}
                           {/*            <FontAwesomeIcon icon={regular('envelope')} className={"w-6 h-6 text-purple-400"}/> :*/}
                           {/*            <FontAwesomeIcon icon={regular('comment')} className={"w-6 h-6 text-blue-400"}/>*/}
                           {/*        }*/}
                           {/*    </div>*/}
                           {/*    <div*/}
                           {/*        className=" p-4 flex flex-col leading-normal">*/}
                           {/*        <div className="mb-8">*/}

                           {/*            <div className="text-gray-900 font-bold text-lg mb-2">{notification.text}*/}
                           {/*            </div>*/}

                           {/*        </div>*/}
                           {/*        <div className="flex items-end justify-end">*/}
                           {/*                <div className="text-sm">*/}

                           {/*                    <p className="text-gray-400 text-md"> {notification.date.toLocaleString()}</p>*/}
                           {/*                </div>*/}
                           {/*        </div>*/}
                           {/*    </div>*/}
                           {/*</div>*/}
                          <Message>
                              <MessageIcon>
                                  {notification.type === "invite" ?
                                          <FontAwesomeIcon icon={regular('envelope')} className={"w-6 h-6 text-purple2 justify-center items-center"}/> :
                                          <FontAwesomeIcon icon={regular('comment')} className={"w-6 h-6 text-blue-400 justify-center items-center"}/>}
                              </MessageIcon>
                              <MessageBody>
                                  <MessageTitle>{notification.type === "invite" ? "Zaproszenie!" : "Informacja!"}</MessageTitle>
                                  {notification.type === "invite" ?
                                        <>
                                        <div className="dropdown" >
                                            <button className={'dropbtn'} onClick={() => {
                                                setDropdownOpen(prevState => !prevState)
                                                console.log(dropdownOpen)
                                                setToggleVisible(prevState => !prevState)
                                            }}>
                                                <FontAwesomeIcon icon={solid('ellipsis')}  className={" w-5 h-5 text-purple-800 absolute top-5 right-8"}/>
                                            </button>
                                            {dropdownOpen && (dropdownContent)}
                                        </div>
                                        </>
                                      : null}
                                  <MessageBodyText>{notification.text}</MessageBodyText>
                                  <MessageBodyDate>{notification.date.toLocaleString()}</MessageBodyDate>
                                  {/*{notification.type === "invite" ?*/}
                                  {/*// <MessageButton>hej</MessageButton>: null}*/}
                              </MessageBody>

                          </Message>
                           </li>))}

               </ul>
           </div>

       </>
    )
}

export default NotificationsList