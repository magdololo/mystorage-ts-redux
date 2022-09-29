import {useAppSelector} from "../../app/store";
import {selectAllShares, selectIncomingInvites, selectOutgoingInvites} from "./sharesSlice";
import {Invite} from "./sharesSlice";
import AppTitle from "../../app/TopMenu/AppTitle";
import BottomMenu from "../../app/BottomMenu/BottomMenu";
import React from "react";

const SharesPage = ()=>{
    const all = useAppSelector(selectAllShares)
    console.log(all)
    const outgoingInvites = useAppSelector(selectOutgoingInvites)
    console.log(outgoingInvites)
    const incomingInvites = useAppSelector(selectIncomingInvites)
    console.log(incomingInvites)
    return (
        <>
            <AppTitle/>
            <div className="w-screen-xs  max-w-screen-xl mx-auto bgSharePage bg-cover bg-center w-full h-max mb-32" style={{backgroundImage: 'url("/images/domowa_spizarnia.jpg")'}}>
                  <div className=" flex flex-nowrap flex-col bg-white z-50  lg:flex-row xl:justify-center ">

                      <div className="incoming w-full mx-2 xmd:w-11/12 xmd:mx-auto lg:w-1/2 xl:w-2/5">
                          <h2 className="text-xl xl:text-2xl font-bold my-6 text-center text-gray-light">Zaproszenia przychodzące!</h2>
                          <div className="p-2 mx-6">
                              <div className="w-full flex flex-col divide-y divide-gray-extraLight">
                                  {incomingInvites.map((invite: Invite) =>
                                      <div key={invite.id} className="p-3.5">
                                          <h2 className="text-lg xmd:text-lg text-gray-light pb-3 ">Od <span className="font-bold">{invite.user_email}</span></h2>
                                          <h3 className="text-md xmd:text-md text-gray-light pb-3 xl:pb-2.5">Status:
                                              <span className="font-bold font-varela ml-1 text-green">{(invite.status === "accepted") && "Przyjete"}</span>
                                              <span className="font-bold font-varela ml-1 text-red">{(invite.status === "rejected") && "Odrzucone"}</span>
                                              <span className="font-bold font-varela ml-1">{(invite.status === "") && "Oczekuje na decyzję"}</span>
                                          </h3>
                                           <div className="flex flex-col  xmd:flex-row xmd:justify-between  xmd:h-10  xl:h-12">
                                                <span className="text-xs pb-3.5 xmd:text-md md:text-xs text-gray-mediumLight xmd:pt-3 xmd:pb-0">{invite.date.toLocaleString()}</span>
                                               {(invite.status === "accepted") ?
                                                   <>
                                                       <span className="flex flex-row justify-between ">
                                                            <button className="px-3 py-1 text-xs border border-purple rounded-md text-purple-900 uppercase  font-bold  font-varela hover:bg-purple hover:text-white xl:px-4 xl:py-1 xl:text-xs">Anuluj</button>
                                                       </span>
                                                   </>
                                                : null}

                                               {(invite.status === "") ?
                                                   <span className="block pb-5 flex flex-row justify-start xmd:justify-between xmd:mb-0">
                                                       <button className="mr-2 px-4 py-2 xmd:py-1 border border-purple rounded-md text-purple-900 uppercase text-xs font-bold tracking-wide font-varela hover:bg-purple hover:text-white">Akceptuj</button>
                                                       <button className="px-4 py-2 xmd:py-1 border border-purple rounded-md text-purple-900 uppercase text-xs font-bold tracking-wide font-varela hover:bg-purple hover:text-white">Odrzuć</button></span>
                                                   : null}
                                           </div>
                                      </div>
                              )}
                              </div>
                          </div>
                      </div>

                      <div className="outgoing w-11/12 mx-auto lg:w-1/2 xl:w-2/5">
                          <h2 className="text-xl xl:text-2xl font-bold my-6 text-center text-gray-light">Zaproszenia wychodzące!</h2>
                          <div className="p-2 mx-6">
                              <div className="w-full flex flex-col divide-y divide-gray-extraLight">
                                  {outgoingInvites.map((invite: Invite) =>
                                      <div key={invite.id} className="p-3.5">
                                          <h2 className="text-md text-gray-light pb-3 md:text-lg">Do <span className="font-bold">{invite.user_email}</span></h2>
                                          <h3 className="text-xs text-gray-light pb-2.5 md:text-md xl:pb-2.5">Status:
                                              <span className="font-bold font-varela ml-1 text-green">{(invite.status === "accepted") && "Przyjete"}</span>
                                              <span className="font-bold font-varela ml-1 text-red">{(invite.status === "rejected") && "Odrzucone"}</span>
                                              <span className="font-bold font-varela ml-1">{(invite.status === "") && "Oczekuje na decyzję"}</span>
                                          </h3>
                                          <div className="flex flex-row justify-between h-6 sm:h-10 md:h-8 xl:h-12">
                                          <span className="block text-xs text-gray-mediumLight pt-3">{invite.date.toLocaleString()}</span>
                                          {(invite.status === "accepted") ?
                                              <>
                                                       <span className="flex flex-row justify-between">
                                                            <button className="px-4 py-1 border border-purple rounded-md text-purple-900 uppercase text-xs font-bold tracking-wide font-varela hover:bg-purple hover:text-white">Anuluj</button>
                                                       </span>
                                              </>
                                              : null}
                                          </div>
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
            </div>
            <BottomMenu/>
        </>
    )
}
export default SharesPage