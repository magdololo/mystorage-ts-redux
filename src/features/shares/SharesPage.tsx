import {useAppSelector} from "../../app/store";
import {selectAllShares, selectIncomingInvites, selectOutgoingInvites} from "./sharesSlice";
import {Invite} from "./sharesSlice";
import AppTitle from "../../app/TopMenu/AppTitle";
import BottomMenu from "../../app/BottomMenu/BottomMenu";
import React from "react";
import {MainContent, SectionIncoming, SectionOutgoing, Button, SingleInvite} from "./Shares.components";
import ReturnToCategoryList from "../../component/ReturnToCategoryList";
import {useMediaQuery} from "usehooks-ts";

const SharesPage = ()=>{
    const all = useAppSelector(selectAllShares)
    console.log(all)
    const outgoingInvites = useAppSelector(selectOutgoingInvites)
    console.log(outgoingInvites)
    const incomingInvites = useAppSelector(selectIncomingInvites)
    console.log(incomingInvites)
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')
    return (
        <>
            {/*<div className="pb-6 xs:max-w-xl md:max-w-2xl lg:max-w-screen-lg mx-auto">*/}
            {isSmallerThan1280 ? <ReturnToCategoryList/>: null}

                  <MainContent>

                      <SectionIncoming>
                          <h2 className="text-xl xl:text-2xl font-bold my-6  text-gray-light">Zaproszenia przychodzące!</h2>
                          <div className="p-2 mx-6 xmd:mx-0">
                              <div className="w-full flex flex-col divide-y divide-gray-extraLight">
                                  {incomingInvites.map((invite: Invite) =>
                                      <SingleInvite>
                                          <div className={"h-2/3 "}>
                                              <h2 className="text-md xmd:text-lg text-gray-light pb-3 md:text-lg">Od <span className="font-bold">{invite.user_email}</span></h2>
                                              <h3 className="text-md xmd:text-md text-gray-light pb-3 xl:pb-2.5">
                                                  <span className="font-bold font-varela ml-1 text-green">{(invite.status === "accepted") && "Przyjete"}</span>
                                                  <span className="font-bold font-varela ml-1 text-red">{(invite.status === "rejected") && "Odrzucone"}</span>
                                                  <span className="font-bold font-varela ml-1">{(invite.status === "") && "Oczekuje na decyzję"}</span>
                                              </h3>
                                               <div className="flex flex-col  xmd:flex-row xmd:justify-between  xmd:h-10  xl:h-12">
                                                    <span className="text-xs pb-3.5 xmd:text-md md:text-xs text-gray-mediumLight xmd:pt-3 xmd:pb-0">{invite.date.toLocaleString()}</span>
                                               </div>
                                          </div>
                                          <div className={"h-1/3"}>
                                               {(invite.status === "accepted") ?

                                                   <div className={"max-w-screen-sm mx-auto"}>
                                                       <div className=" pb-5 flex flex-row justify-start xmd:mb-0">
                                                       <Button className={"marginLeft"}>Anuluj</Button>
                                                       </div>
                                                   </div>
                                                : null}

                                               {(invite.status === "") ?

                                                   <div className={"max-w-screen-sm mx-auto"}>
                                                   <div className=" pb-5 flex flex-row justify-start xmd:mb-0">
                                                       <Button>Akceptuj</Button>
                                                       <Button>Odrzuć</Button>
                                                   </div>
                                                   </div>

                                                   : null}
                                           </div>
                                      </SingleInvite>
                              )}
                                      </div>
                          </div>
                      </SectionIncoming>


                      <SectionOutgoing>
                          <h2 className="text-xl xl:text-2xl font-bold my-6 text-gray-light">Zaproszenia wychodzące!</h2>
                          <div className="p-2 mx-6">
                              <div className="w-full flex flex-col divide-y divide-gray-extraLight">
                                  {outgoingInvites.map((invite: Invite) =>
                                      <SingleInvite key={invite.id} >
                                          <div className={"h-2/3 "}>
                                          <h2 className="text-md text-gray-light pb-3 md:text-lg">Do <span className="font-bold">{invite.user_email}</span></h2>
                                          <h3 className="text-md xmd:text-md text-gray-light pb-3 xl:pb-2.5">
                                              <span className="font-bold font-varela ml-1 text-green">{(invite.status === "accepted") && "Przyjete"}</span>
                                              <span className="font-bold font-varela ml-1 text-red">{(invite.status === "rejected") && "Odrzucone"}</span>
                                              <span className="font-bold font-varela ml-1">{(invite.status === "") && "Oczekuje na decyzję"}</span>
                                          </h3>
                                          <div className="flex flex-row justify-between h-6 sm:h-10 md:h-8 xl:h-12">
                                          <span className="block text-xs text-gray-mediumLight pt-3">{invite.date.toLocaleString()}</span>
                                          </div>
                                              <div className={"h-1/3"}>
                                          {(invite.status === "accepted") ?
                                              <>
                                                  <div className={"max-w-screen-sm mx-auto"}>
                                                      <div className=" pb-5 flex flex-row justify-start xmd:mb-0">
                                                          <Button className={"marginLeft"}>Anuluj</Button>

                                                      </div>
                                                  </div>
                                              </>
                                              :
                                             null
                                          }
                                              </div>
                                          </div>
                                      </SingleInvite>
                                  )}
                              </div>
                          </div>
                      </SectionOutgoing>


                      {/*<SectionOutgoing>*/}
                      {/*    <h2 className="text-xl xl:text-2xl font-bold my-6 text-center text-gray-light">Zaproszenia wychodzące!</h2>*/}
                      {/*    <div className="p-2 mx-6">*/}
                      {/*        <div className="grid gap-1 sm:grid-cols-2 sm:gap-1">*/}
                      {/*            {outgoingInvites.map((invite: Invite) =>*/}
                      {/*                <div key={invite.id} className="p-3.5 flex flex-col relative px-2 pt-2 pb-2 border border-gray-extraLight rounded-sm cursor-pointer md:pb-4">*/}
                      {/*                    <div className={"h-2/3 "}>*/}
                      {/*                    <h2 className="text-md text-gray-light pb-3 md:text-lg">Do <span className="font-bold">{invite.user_email}</span></h2>*/}
                      {/*                    <h3 className="text-xs text-gray-light pb-2.5 md:text-md xl:pb-2.5">Status:*/}
                      {/*                        <span className="font-bold font-varela ml-1 text-green">{(invite.status === "accepted") && "Przyjete"}</span>*/}
                      {/*                        <span className="font-bold font-varela ml-1 text-red">{(invite.status === "rejected") && "Odrzucone"}</span>*/}
                      {/*                        <span className="font-bold font-varela ml-1">{(invite.status === "") && "Oczekuje na decyzję"}</span>*/}
                      {/*                    </h3>*/}
                      {/*                    <div className="flex flex-row justify-between h-6 sm:h-10 md:h-8 xl:h-12">*/}
                      {/*                    <span className="block text-xs text-gray-mediumLight pt-3">{invite.date.toLocaleString()}</span>*/}
                      {/*                    </div>*/}
                      {/*                        <div className={"h-1/3"}>*/}
                      {/*                    {(invite.status === "accepted") ?*/}
                      {/*                        <>*/}
                      {/*                            <div className={"max-w-screen-sm mx-auto"}>*/}
                      {/*                                <div className=" pb-2 flex flex-row justify-start xmd:mb-0">*/}
                      {/*                                    <ButtonSingle>Anuluj</ButtonSingle>*/}

                      {/*                                </div>*/}
                      {/*                            </div>*/}
                      {/*                        </>*/}
                      {/*                        : null}*/}
                      {/*                        </div>*/}
                      {/*                    </div>*/}
                      {/*                </div>*/}
                      {/*            )}*/}
                      {/*        </div>*/}
                      {/*    </div>*/}
                      {/*</SectionOutgoing>*/}





                  </MainContent>
            {/*</div>*/}
            {isSmallerThan1280 ? <BottomMenu/> : null}

        </>
    )
}
export default SharesPage