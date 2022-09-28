import {useAppSelector} from "../../app/store";
import {selectAllShares, selectIncomingInvites, selectOutgoingInvites} from "./sharesSlice";
import {Invite} from "./sharesSlice";
import {Divider} from "@mui/material";
import AppTitle from "../../app/TopMenu/AppTitle";

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
            <div className="w-screen-xs  max-w-screen-xl mx-auto bgSharePage bg-cover bg-center w-full h-max" style={{backgroundImage: 'url("/images/domowa_spizarnia.jpg")'}}>
                  <div className=" flex flex-nowrap flex-row bg-white z-50 justify-between ">

                      <div className="incoming ml-14">
                          <h2 className="text-xl md:text-2xl font-bold my-6 text-center text-gray-light">Zaproszenia przychodzące!</h2>
                          <div className="w-full ml-12 p-2 ">
                              <div className="w-full flex flex-col divide-y divide-gray-extraLight">
                                  {incomingInvites.map((invite: Invite) =>
                                      <div key={invite.id} className="pb-2 ">
                                          <h2 className="text-lg text-gray-light py-4">Otrzymales zaproszenie od <span className="font-bold">{invite.user_email}</span></h2>
                                           <div className="flex flex-row justify-between">
                                                <span className="text-md text-gray-mediumLight">{invite.date.toLocaleString()}</span>
                                               {(invite.status === "accepted") ?
                                                <span className="px-4 py-1.5 border border-purple rounded-md text-purple-900 uppercase text-xs font-bold tracking-wide font-varela">Przyjęte</span> : null}
                                               {(invite.status === "rejected") ?
                                                   <span className="px-4 py-1.5 border border-purple rounded-md text-purple-900 uppercase text-xs font-bold tracking-wide font-varela">Odrzucone</span> : null}
                                               {(invite.status === "") ?
                                                   <span className="">
                                                       <button className="px-4 py-1.5 border border-purple rounded-md text-purple-900 uppercase text-xs font-bold tracking-wide font-varela">Akceptuj</button>
                                                       <button className="px-4 py-1.5 border border-purple rounded-md text-purple-900 uppercase text-xs font-bold tracking-wide font-varela">Odrzuć</button></span>
                                                   : null}
                                           </div>
                                      </div>
                              )}
                              </div>
                          </div>
                      </div>

                      <div className="outgoing mr-14">
                          <h2 className="text-xl md:text-2xl font-bold my-6 text-center text-gray-light">Zaproszenia wychodzące!</h2>
                          <div className="w-full ml-12 p-2 ">
                              <div className="w-full flex flex-col divide-y divide-gray-extraLight">
                                  {outgoingInvites.map((invite: Invite) =>
                                      <div key={invite.id} className="pb-2 ">
                                          <h2 className="text-lg text-gray-light py-4">Wysłałeś zaproszenie do <span className="font-bold">{invite.user_email}</span></h2>
                                          <span className="text-md text-gray-mediumLight">{invite.date.toLocaleString()}</span>
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
            </div>
        </>
    )
}
export default SharesPage