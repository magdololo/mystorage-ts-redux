
import React, {useEffect} from "react";
import {useAppDispatch} from "../app/store";
import {Outlet} from "react-router-dom";

import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import FooterBox from "./FooterBox";
import BottomMenu from "./BottomMenu";
import {useMediaQuery} from "usehooks-ts";

import {MainPageLayout,Header, Main, SideBar, FooterBar} from "../styles/Root.components";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase";
import {useSelector} from "react-redux";
import {selectUser} from "../slices/usersSlice";
import {addNotification,modifyNotification, Notification} from "../slices/notificationsSlice";
import {addOutgoingToShares} from "../slices/sharesSlice";
import {addShare,modifyShare, Invite} from"../slices/sharesSlice";
const Root = ()=>{
    const user = useSelector(selectUser);
    const userId = user?.uid;
    const dispatch = useAppDispatch()
    useEffect(()=>{
        const q = query(collection(db, "users/" + userId +"/notifications"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const data = change.doc.data();
                    if (change.type === "added") {
                        console.log("New city: ", change.doc.data());
                        dispatch(addNotification({...change.doc.data(), id: change.doc.id} as Notification))
                    }
                    if (change.type === "modified") {
                        console.log("Modified city: ", change.doc.data());
                        // dispatch(modifyNotification({...change.doc.data(), id: change.doc.id} as Notification))
                    }
                    if (change.type === "removed") {
                        console.log("Removed city: ", change.doc.data());
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


    const isLargerThan1280 = useMediaQuery('(min-width: 1280px)')

    return (
        <>
        <MainPageLayout>
                <Header><AppHeader/></Header>
                <Main>
                    <Outlet/>
                </Main>
                {isLargerThan1280 ?
                <>
                <SideBar><Sidebar toggleDrawer={null}/></SideBar>
                <FooterBar><FooterBox/></FooterBar>
                </>
                : <BottomMenu/> }
        </MainPageLayout>
        </>
    )
}

export default Root;