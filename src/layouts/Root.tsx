import React, {useEffect, useState} from "react";
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
import {changeSeeGreetingToTrue, selectCurrentStorage, selectUser, User} from "../slices/usersSlice";
import {addNotification, modifyNotification, Notification} from "../slices/notificationsSlice";
import {addShare, modifyShare, Invite} from "../slices/sharesSlice";
import {addCategory, modifyCategory, Category, removeCategory} from "../slices/categoriesSlice";

import {
    UserProduct,
    addProduct,
    modifyProduct,
    removeProduct,

} from "../slices/userProductsSlice";
import {ToastContainer} from "react-toastify";
import ToggleSections from "./ToggleSections";
import SelectStorageOrPharmacy from "./SelectStorageOrPharmacy";
import {Modal} from "../component/Modal/Modal";
import {useTranslation} from "react-i18next";


const Root = () => {
    let user = useAppSelector(selectUser);
    const dispatch = useAppDispatch()
    const currentStorageId = useAppSelector(selectCurrentStorage)
    const isBiggerThan960 = useMediaQuery('(min-width: 960px)')
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    // const handleCloseGreeting = () => setIsOpen(false);
    // let didSee = user?.didSeeGreeting;
    const {t} = useTranslation();
    useEffect(() => {
        if (!currentStorageId) {
            return
        }
        const q = query(collection(db, "users/" + user?.uid + "/notifications"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const data = change.doc.data();
                    let notificationDate = null;
                    if (data.date != null) {
                        notificationDate = Timestamp.fromMillis(data.date.seconds * 1000).toDate();
                    }
                    if (change.type === "added") {
                        dispatch(addNotification({...data, date: notificationDate, id: change.doc.id} as Notification))
                    }
                    if (change.type === "modified") {
                        dispatch(modifyNotification({...data, date: notificationDate, id: change.doc.id} as Notification))
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

    },[currentStorageId, dispatch, user?.uid])

    useEffect(()=>{
        if(!currentStorageId){
            return
        }
        const q = query(collection(db, "users/" + user?.uid +"/shares"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        dispatch(addShare({...change.doc.data(), id: change.doc.id} as Invite))
                    }
                    if (change.type === "modified") {
                        dispatch(modifyShare({...change.doc.data(), id: change.doc.id} as Invite))
                    }
                    if (change.type === "removed") {
                        console.log("Removed share: ", change.doc.data());
                    }
                });
            },
            (error) => {
                console.log(error)
            });

        return ()=>{
            unsubscribe()
        }

    },[currentStorageId,dispatch,user?.uid])
    useEffect(()=>{
        if(!currentStorageId){
            return
        }
        const q = query(collection(db, "users/" + currentStorageId +"/categories"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        dispatch(addCategory({...change.doc.data(), id: change.doc.id} as Category))
                    }
                    if (change.type === "modified") {
                        dispatch(modifyCategory({...change.doc.data(), id: change.doc.id} as Category))
                    }
                    if (change.type === "removed") {
                        dispatch(removeCategory(change.doc.id))
                    }
                });
            },
            (error) => {
                console.log(error)
            });

        return ()=>{
            unsubscribe()
        }

    },[currentStorageId, dispatch])
    useEffect(()=>{
            if(!currentStorageId){
                return
            }
            const docRef = doc(db, "users", currentStorageId!!);
            let q = query(collectionGroup(db, "products"), orderBy(documentId()) ,startAt(docRef.path), endAt(docRef.path + "\uf8ff"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        let data = change.doc.data()
                        let productExpireDate = null;
                        if( data.expireDate != null){
                            let expireDateTimestamp = Timestamp.fromMillis(data.expireDate.seconds*1000);
                            productExpireDate = expireDateTimestamp.toDate();
                        }
                        if (change.type === "added") {
                            dispatch(addProduct({...data, expireDate: productExpireDate, id: change.doc.id} as UserProduct))
                        }
                        if (change.type === "modified") {
                            dispatch(modifyProduct({...data, expireDate: productExpireDate, id: change.doc.id} as UserProduct))
                        }

                        if (change.type === "removed") {
                            dispatch(removeProduct(change.doc.id))
                        }
                    });
                },
                (error) => {
                    console.log(error)
                });

        return () => {
            unsubscribe()
        }


    }, [currentStorageId, dispatch])


    const isLargerThan1280 = useMediaQuery('(min-width: 1280px)')
    // useEffect(() => {
    //     if (didSee === false) {
    //         setIsOpen(true)
    //     }
    // }, [user, didSee])
    //
    //
    // const closeModalWithGreeting = () => {
    //     handleCloseGreeting();
    //     dispatch(changeSeeGreetingToTrue(user as User))
    // }
    // let greeting = <>
    //     <Modal isShown={isOpen} hide={closeModalWithGreeting} modalHeaderText={""}
    //            modalContent={<><h1>{t("categories.CategoryList.modalWithGreeting_h1")}</h1>
    //                <h2> {t("categories.CategoryList.modalWithGreeting_h2")}</h2>
    //                <div
    //                    className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 rounded-b-md">
    //                    <button type="button" className="  px-6
    //                                                       py-2.5
    //                                                       bg-purple
    //                                                       text-white
    //                                                       font-medium
    //                                                       text-xs
    //                                                       leading-tight
    //                                                       uppercase
    //                                                       rounded
    //                                                       shadow-md
    //                                                       hover:bg-purple-700 hover:shadow-lg
    //                                                       focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
    //                                                       active:bg-purple-800 active:shadow-lg
    //                                                       transition
    //                                                       duration-150
    //                                                       ease-in-out"
    //                            data-bs-dismiss="modal" onClick={closeModalWithGreeting}>{t("buttons.close")}
    //                    </button>
    //                </div>
    //            </>}/>
    // </>;

    return (
        <>
            <MainPageLayout>
                <Header><AppHeader/></Header>
                <Section>
                    {isBiggerThan960 ? <ToggleSections/> : <SelectStorageOrPharmacy/>}
                </Section>
                <Main>
                    <Outlet/>
                </Main>
                {isLargerThan1280 ?
                    <>
                        <SideBar><Sidebar toggleDrawer={null}/></SideBar>
                        <FooterBar><FooterBox/></FooterBar>
                    </>
                    : <BottomMenu/>}
                <ToastContainer/>

            </MainPageLayout>
        </>
    )
}

export default Root;