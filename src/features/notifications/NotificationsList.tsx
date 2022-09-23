import {useAppSelector} from "../../app/store";
import {selectUnReadNotifications} from "./notificationsSlice";
import React from "react";
import {faLightbulb, faEnvelope, faXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, light} from '@fortawesome/fontawesome-svg-core/import.macro'
import {
    Message, MessageBody,MessageBodyText,MessageButton,MessageCloseButton,MessageIcon,MessageBodyDate
}from "./Notofications.components";


const NotificationsList = ()=>{
    const unReadNotifications = useAppSelector(selectUnReadNotifications)
    return(
       <>
           <div className="flex justify-center flex-nowrap">
               <ul className="bg-white rounded-lg w-full">
                   {unReadNotifications.map(notification => (
                       <li className={" border-b border-gray-extraLight w-full rounded-t-lg py-2 overflow-y-auto"} key={notification?.id}>

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
                                          <FontAwesomeIcon icon={regular('envelope')} className={"w-6 h-6 text-purple-400 justify-center items-center"}/> :
                                          <FontAwesomeIcon icon={regular('comment')} className={"w-6 h-6 text-blue-400 justify-center items-center"}/>}
                              </MessageIcon>
                              <MessageBody>
                                  <MessageBodyText>{notification.text}</MessageBodyText>
                                  <MessageBodyDate>{notification.date.toLocaleString()}</MessageBodyDate>
                                  {/*<MessageCloseButton/>*/}
                              </MessageBody>

                          </Message>
                           </li>))}

               </ul>
           </div>

       </>
    )
}

export default NotificationsList