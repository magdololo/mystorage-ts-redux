import React, {useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from "../app/store";
import {
    selectAllShares,
    selectIncomingInvites,
    selectOutgoingInvites,
    acceptIncomingShares,
    cancelAcceptedShare,
    restorationAccount, addShare, modifyShare
} from "../slices/sharesSlice";
import {Invite} from "../slices/sharesSlice";

import BottomMenu from "../layouts/BottomMenu";
import ReturnToCategoryList from "../component/ReturnToCategoryList";
import {useMediaQuery} from "usehooks-ts";

import {MainContent, SectionIncoming, SectionOutgoing, Button, SingleInvite} from "../styles/Shares.components";
import {useSelector} from "react-redux";
import {selectUser} from "../slices/usersSlice";
import {collection, onSnapshot, query, Timestamp} from "firebase/firestore";
import {db} from "../firebase";

const SharesPage = ()=>{
    const dispatch = useAppDispatch();
    const all = useAppSelector(selectAllShares)
    let user = useSelector(selectUser);
    const userId = user?.uid;
    console.log(all)
    const outgoingInvites = useAppSelector(selectOutgoingInvites)
    console.log(outgoingInvites)
    const incomingInvites = useAppSelector(selectIncomingInvites)
    console.log(incomingInvites)
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')

    const handleAcceptedInvite=(invite: Invite)=>{
        dispatch(acceptIncomingShares({userId: userId!!, shareId: invite.id}))
    }
    const handleCancelShare=(invite: Invite)=>{
        dispatch(cancelAcceptedShare({userId: userId!!, shareId: invite.id}))
    }
    const handleRestoration= (invite: Invite)=>{
        dispatch(restorationAccount({userId: userId!!, shareId: invite.id}))
    }
    useEffect(()=>{
        const q = query(collection(db, "users/" + userId +"/shares"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        console.log("New city: ", change.doc.data());
                        dispatch(addShare({...change.doc.data(), id: change.doc.id} as Invite))
                    }
                    if (change.type === "modified") {
                        console.log("Modified share: ", change.doc.data());
                        dispatch(modifyShare({...change.doc.data(), id: change.doc.id} as Invite))
                    }
                    if (change.type === "removed") {
                        console.log("Removed share" +
                            ": ", change.doc.data());
                    }
                });
            },
            (error) => {
                console.log(error)
            });

        return ()=>{
            unsubscribe()
        }

    },[])
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
                        <h2 className="text-xl font-bold my-6 text-center text-gray-light  xl:text-2xl">Zaproszenia przychodzące!</h2>
                        <div className="p-2 mx-6 ">
                            <div className="w-full flex flex-col divide-y divide-gray-extraLight">
                                {incomingInvites.map((invite: Invite) =>
                                    <SingleInvite>
                                        <div className={"h-2/3 "}>
                                            <h2 className="text-md xmd:text-lg text-gray-light pb-3 md:text-lg">Od <span className="font-bold">{invite.user_email}</span></h2>
                                            <h3 className="text-md xmd:text-md text-gray-light pb-3 xl:pb-2.5">
                                                <span className="font-bold font-varela ml-1 text-green">{(invite.status === "accepted") && "Przyjete"}</span>
                                                <span className="font-bold font-varela ml-1 text-red">{(invite.status === "rejected") && "Odrzucone"}</span>
                                                <span className="font-bold font-varela ml-1">{(invite.status === "pending") && "Oczekuje na decyzję"}</span>
                                            </h3>
                                            <div className="flex flex-col  xmd:flex-row xmd:justify-between  xmd:h-10  xl:h-12">
                                                <span className="text-xs pb-3.5 xmd:text-md md:text-xs text-gray-mediumLight xmd:pt-3 xmd:pb-0">{date.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className={"h-1/3"}>
                                            {(invite.status === "accepted") ?
                                                <div className={"max-w-screen-sm mx-auto"}>
                                                    <div className=" pb-5 flex flex-row justify-start xmd:mb-0">
                                                       <Button className={"marginLeft"} onClick={()=>handleCancelShare(invite)}>Anuluj</Button>
                                                    </div>
                                                </div>
                                                : null
                                            }
                                            {(invite.status === "pending") ?
                                                <div className={"max-w-screen-sm mx-auto"}>
                                                   <div className=" pb-5 flex flex-row justify-start xmd:mb-0">
                                                       <Button onClick={()=>handleAcceptedInvite(invite)}>Akceptuj</Button>
                                                       <Button onClick={()=>handleCancelShare(invite)}>Odrzuć</Button>
                                                   </div>
                                                </div>
                                                : null
                                            }
                                            {(invite.status === "rejected") ?
                                                <div className={"max-w-screen-sm mx-auto"}>
                                                    <div className=" pb-5 flex flex-row justify-start xmd:mb-0">
                                                        <Button onClick={()=>handleRestoration(invite)}>Przywróć</Button>
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
                        <h2 className="text-xl font-bold my-6 text-center text-gray-light xl:text-2xl ">Zaproszenia wychodzące!</h2>
                        <div className="p-2 mx-6">
                            <div className="w-full flex flex-col divide-y divide-gray-extraLight">
                                {outgoingInvites.map((invite: Invite) =>
                                    <SingleInvite key={invite.id} >
                                        <div className={"h-2/3 "}>
                                            <h2 className="text-md text-gray-light pb-3 md:text-lg">Do <span className="font-bold">{invite.user_email}</span></h2>
                                            <h3 className="text-md xmd:text-md text-gray-light pb-3 xl:pb-2.5">
                                                <span className="font-bold font-varela ml-1 text-green">{(invite.status === "accepted") && "Przyjete"}</span>
                                                <span className="font-bold font-varela ml-1 text-red">{(invite.status === "rejected") && "Odrzucone"}</span>
                                                <span className="font-bold font-varela ml-1">{(invite.status === "pending") && "Oczekuje na decyzję"}</span>
                                            </h3>
                                            <div className="flex flex-col  xmd:flex-row xmd:justify-between  xmd:h-10  xl:h-12">
                                                <span className="text-xs pb-3.5 xmd:text-md md:text-xs text-gray-mediumLight xmd:pt-3 xmd:pb-0">{date.toLocaleString()}</span>
                                            </div>

                                            <div className={"h-1/3"}>
                                                {(invite.status === "accepted") ?
                                                    <div className={"max-w-screen-sm mx-auto"}>
                                                        <div className=" pb-5 flex flex-row justify-start xmd:mb-0">
                                                            <Button className={"marginLeft"} onClick={()=>handleCancelShare(invite)}>Anuluj</Button>
                                                        </div>
                                                    </div>
                                                    : null
                                                }
                                                {(invite.status === "pending") ?
                                                    <div className={"max-w-screen-sm mx-auto"}>
                                                        <div className=" pb-5 flex flex-row justify-start xmd:mb-0">
                                                            {/*<Button onClick={()=>handleAcceptedInvite(invite)}>Akceptuj</Button>*/}
                                                            {/*<Button onClick={()=>handleCancelShare(invite)}>Odrzuć</Button>*/}
                                                        </div>
                                                    </div>
                                                    : null
                                                }
                                                {(invite.status === "rejected") ?
                                                    <div className={"max-w-screen-sm mx-auto"}>
                                                        <div className=" pb-5 flex flex-row justify-start xmd:mb-0">
                                                            {/*<Button onClick={()=>handleRestoration(invite)}>Przywróć</Button>*/}
                                                        </div>
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