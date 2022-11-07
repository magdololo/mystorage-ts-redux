
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/store";
import {Outlet} from "react-router-dom";

import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import FooterBox from "./FooterBox";
import BottomMenu from "./BottomMenu";
import {useMediaQuery} from "usehooks-ts";

import {MainPageLayout, Header, Main, SideBar, FooterBar, Section} from "../styles/Root.components";
import {
    collection,
    collectionGroup,
    doc,
    documentId,
    endAt,
    onSnapshot,
    orderBy,
    query,
    startAt, Timestamp
} from "firebase/firestore";
import {db} from "../firebase";
import {useSelector} from "react-redux";
import {selectCurrentStorage, selectUser} from "../slices/usersSlice";
import {addNotification,modifyNotification, Notification} from "../slices/notificationsSlice";
import {addShare,modifyShare, Invite} from"../slices/sharesSlice";
import {addCategory, modifyCategory, Category, deleteCategory} from "../slices/categoriesSlice";
import StoragesList from "./StoragesList";
import {
    UserProduct,
    addProduct,
    modifyProduct,
    deleteUserProduct,

} from "../slices/userProductsSlice";

const Root = ()=>{
    const user = useSelector(selectUser);
    const userId = user?.uid;
    const dispatch = useAppDispatch()
    const currentStorageId = useAppSelector(selectCurrentStorage)

    useEffect(()=>{
        const q = query(collection(db, "users/" + currentStorageId +"/notifications"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const data = change.doc.data();
                    if (change.type === "added") {
                        console.log("New notifications: ", data);
                        dispatch(addNotification({...change.doc.data(), id: change.doc.id} as Notification))
                    }
                    if (change.type === "modified") {
                        console.log("Modified notifications: ", change.doc.data());
                        dispatch(modifyNotification({...change.doc.data(), id: change.doc.id} as Notification))
                    }
                    if (change.type === "removed") {
                        console.log("Removed notifications: ", change.doc.data());
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

    useEffect(()=>{
        const q = query(collection(db, "users/" + currentStorageId +"/shares"));
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
    useEffect(()=>{
        const q = query(collection(db, "users/" + currentStorageId +"/categories"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        console.log("New category: ", change.doc.data());
                        dispatch(addCategory({...change.doc.data(), id: change.doc.id} as Category))
                    }
                    if (change.type === "modified") {
                        console.log("Modified category: ", change.doc.data());
                        dispatch(modifyCategory({...change.doc.data(), id: change.doc.id} as Category))
                    }
                    if (change.type === "removed") {
                        console.log("Removed category" +
                            ": ", change.doc.data());
                        dispatch(deleteCategory({...change.doc.data(), id: change.doc.id} as Category))
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
    useEffect(()=>{

        const docRef = doc(db, "users", currentStorageId!!);
        let q = query(collectionGroup(db, "products"), orderBy(documentId()) ,startAt(docRef.path), endAt(docRef.path + "\uf8ff"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    let data = change.doc.data()
                    let productExpireDate = null;
                    if( data.date != null){
                        let notificationTimestamp = Timestamp.fromMillis(data.date.seconds*1000);
                        //
                        productExpireDate = notificationTimestamp.toDate();
                    }
                    if (change.type === "added") {
                        console.log("New product: ", change.doc.data());
                        dispatch(addProduct({...data, expireDate: productExpireDate, id: change.doc.id} as UserProduct))
                    }
                    if (change.type === "modified") {
                        console.log("Modified product: ", change.doc.data());
                        dispatch(modifyProduct({...data, expireDate: productExpireDate, id: change.doc.id} as UserProduct))
                        //dispatch(changeProductQuantity{...change.doc.data(), id: change.doc.id} as UserProduct))
                    }

                    if (change.type === "removed") {
                        console.log("Removed product" +
                            ": ", change.doc.data());
                        dispatch(deleteUserProduct({...data, expireDate: productExpireDate, id: change.doc.id} as UserProduct))
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
            <Section><StoragesList/></Section>
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