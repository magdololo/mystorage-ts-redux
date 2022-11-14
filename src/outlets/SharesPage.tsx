import React, {useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from "../app/store";
import {
    selectAllShares,
    selectIncomingInvites,
    selectOutgoingInvites,
    acceptIncomingShares,
    cancelAcceptedShare,
} from "../slices/sharesSlice";
import {Invite} from "../slices/sharesSlice";

import BottomMenu from "../layouts/BottomMenu";
import ReturnToCategoryList from "../component/ReturnToCategoryList";
import {useMediaQuery} from "usehooks-ts";

import {MainContent, SectionIncoming, SectionOutgoing, Button, SingleInvite} from "../styles/Shares.components";
import {useSelector} from "react-redux";
import {selectUser} from "../slices/usersSlice";
import {Timestamp} from "firebase/firestore";

import {useTranslation} from "react-i18next";

const SharesPage = ()=>{
    const dispatch = useAppDispatch();
    const all = useAppSelector(selectAllShares)
    let user = useSelector(selectUser);
    const userId = user?.uid;
    const {t} = useTranslation();

    const outgoingInvites = useAppSelector(selectOutgoingInvites)

    const incomingInvites = useAppSelector(selectIncomingInvites)

    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')

    const handleAcceptedInvite=(invite: Invite)=>{
        dispatch(acceptIncomingShares({userId: userId!!, shareId: invite.id}))
    }
    const handleCancelShare=(invite: Invite)=>{
        dispatch(cancelAcceptedShare({userId: userId!!, shareId: invite.id}))

    }


    const [date, setDate] = useState( new Date())
    useEffect(()=>{

        all.forEach((invite)=> {
            let inviteDateFromFirebase = invite.date
            let invitesTimestamp = Timestamp.fromMillis(inviteDateFromFirebase!!.seconds * 1000);
            //
            setDate(invitesTimestamp.toDate())

        })
    }, [all])


    return (
        <>
            {isSmallerThan1280 ? <ReturnToCategoryList/>: null}
                <MainContent>
                    <SectionIncoming>
                        <h2 className="text-xl font-bold my-6 text-center text-gray-light  xl:text-2xl">{t("shares.incoming")}</h2>
                        <div className="p-2 mx-6 ">
                            <div className="w-full flex flex-col divide-y divide-gray-extraLight">
                                {incomingInvites.map((invite: Invite) =>
                                    <SingleInvite>
                                        <div className={"h-2/3 "}>
                                            <h2 className="text-md xmd:text-lg text-gray-light pb-3 md:text-lg">Od <span className="font-bold">{invite.user_email}</span></h2>
                                            <h3 className="text-md xmd:text-md text-gray-light pb-3 xl:pb-2.5">
                                                <span className="font-bold font-varela ml-1 text-green">{(invite.status === "accepted") && t("shares.statusAccepted")}</span>
                                                <span className="font-bold font-varela ml-1 text-red">{(invite.status === "rejected") && t("shares.statusRejected")}</span>
                                                <span className="font-bold font-varela ml-1">{(invite.status === "pending") && t("shares.statusPending")}</span>
                                            </h3>
                                            <div className="flex flex-col  xmd:flex-row xmd:justify-between  xmd:h-10  xl:h-12">
                                                <span className="text-xs pb-3.5 xmd:text-md md:text-xs text-gray-mediumLight xmd:pt-3 xmd:pb-0">{date.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className={"h-1/3"}>
                                            {(invite.status === "accepted") ?
                                                <div className={"max-w-screen-sm mx-auto"}>
                                                    <div className={ "visible pb-5 flex flex-row justify-start xmd:mb-0"}>

                                                            <Button className={"marginLeft"}
                                                                    onClick={() => handleCancelShare(invite)}>{t("buttons.cancel")}</Button>

                                                    </div>
                                                </div>
                                                : null
                                            }
                                            {(invite.status === "pending") ?
                                                <div className={"max-w-screen-sm mx-auto"}>
                                                   <div className=" pb-5 flex flex-row justify-start xmd:mb-0">
                                                       <Button onClick={()=>handleAcceptedInvite(invite)}>{t("buttons.accept")}</Button>
                                                       <Button onClick={()=>handleCancelShare(invite)}>{t("buttons.reject")}</Button>
                                                   </div>
                                                </div>
                                                : null
                                            }
                                        </div>
                                    </SingleInvite>
                                )}
                            </div>
                        </div>
                    </SectionIncoming>

                    <SectionOutgoing>
                        <h2 className="text-xl font-bold my-6 text-center text-gray-light xl:text-2xl ">{t("shares.outgoing")}</h2>
                        <div className="p-2 mx-6">
                            <div className="w-full flex flex-col divide-y divide-gray-extraLight">
                                {outgoingInvites.map((invite: Invite) =>
                                    <SingleInvite key={invite.id} >
                                        <div className={"h-2/3 "}>
                                            <h2 className="text-md text-gray-light pb-3 md:text-lg">Do <span className="font-bold">{invite.user_email}</span></h2>
                                            <h3 className="text-md xmd:text-md text-gray-light pb-3 xl:pb-2.5">
                                                <span className="font-bold font-varela ml-1 text-green">{(invite.status === "accepted") && t("shares.statusAccepted")}</span>
                                                <span className="font-bold font-varela ml-1 text-red">{(invite.status === "rejected") && t("shares.statusRejected")}</span>
                                                <span className="font-bold font-varela ml-1">{(invite.status === "pending") && t("shares.statusPending")}</span>
                                            </h3>
                                            <div className="flex flex-col  xmd:flex-row xmd:justify-between  xmd:h-10  xl:h-12">
                                                <span className="text-xs pb-3.5 xmd:text-md md:text-xs text-gray-mediumLight xmd:pt-3 xmd:pb-0">{date.toLocaleString()}</span>
                                            </div>

                                            <div className={"h-1/3"}>
                                                {(invite.status === "accepted") ?
                                                    <div className={"max-w-screen-sm mx-auto"}>
                                                        <div className=" pb-5 flex flex-row justify-start xmd:mb-0">
                                                            <Button className={"marginLeft"} onClick={()=>handleCancelShare(invite)}>{t("buttons.cancel")}</Button>
                                                        </div>
                                                    </div>
                                                    : null
                                                }
                                                {(invite.status === "pending") ?
                                                    <div className={"max-w-screen-sm mx-auto"}>
                                                        <div className=" pb-5 flex flex-row justify-start xmd:mb-0"/>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </SingleInvite>
                                )}
                            </div>
                        </div>
                    </SectionOutgoing>
                </MainContent>
            {isSmallerThan1280 ? <BottomMenu/> : null}
        </>
    )
}
export default SharesPage