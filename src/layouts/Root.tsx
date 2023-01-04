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
import {selectCurrentStorage, selectUser} from "../slices/usersSlice";
import {addNotification, modifyNotification, Notification} from "../slices/notificationsSlice";
import {addShare, modifyShare, Invite} from "../slices/sharesSlice";
import {addCategory, modifyCategory, Category, removeCategory} from "../slices/categoriesSlice";
import {addImage, modifyImage, removeImage} from "../slices/imagesSlice";
import {
    UserProduct,
    addProduct,
    modifyProduct,
    removeProduct,

} from "../slices/userProductsSlice";
import {ToastContainer} from "react-toastify";
import ToggleSections from "./ToggleSections";
import SelectStorageOrPharmacy from "./SelectStorageOrPharmacy";
import {addMedicine, modifyMedicine, removeMedicine, UserMedicine} from "../slices/userMedicineSlice";
import {Image} from "../slices/imagesSlice";


const Root = () => {
    let user = useAppSelector(selectUser);
    const dispatch = useAppDispatch()
    const currentStorageId = useAppSelector(selectCurrentStorage)
    const isBiggerThan960 = useMediaQuery('(min-width: 960px)')

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

        return () => {
            unsubscribe()
        }

    }, [currentStorageId, dispatch])


    useEffect(() => {
        if (!currentStorageId) {
            return
        }
        const q = query(collection(db, "users/" + currentStorageId + "/images"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        dispatch(addImage({...change.doc.data(), id: change.doc.id, uid: currentStorageId} as Image))
                    }
                    if (change.type === "modified") {
                        dispatch(modifyImage({...change.doc.data(), id: change.doc.id} as Image))
                    }
                    if (change.type === "removed") {
                        dispatch(removeImage(change.doc.id))
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

    useEffect(() => {
        if (!currentStorageId) {
            return
        }
        const type: "medicine" | "product" = currentStorageId.startsWith("pharmacy") ? "medicine" : "product";
        const docRef = doc(db, "users", currentStorageId);
        let q = query(collectionGroup(db, "products"), orderBy(documentId()), startAt(docRef.path), endAt(docRef.path + "\uf8ff"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    let data = change.doc.data()
                    let productExpireDate = null;
                    if (data.expireDate != null) {
                        let expireDateTimestamp = Timestamp.fromMillis(data.expireDate.seconds * 1000);
                        productExpireDate = expireDateTimestamp.toDate();
                    }
                    let medicineOpenDate = null;
                    if (data.openDate != null) {
                        let openDateTimestamp = Timestamp.fromMillis(data.openDate.seconds * 1000);
                        medicineOpenDate = openDateTimestamp.toDate();
                    }
                    if (change.type === "added") {
                        if (type === "product") {
                            dispatch(addProduct({
                                ...data,
                                expireDate: productExpireDate,
                                id: change.doc.id
                            } as UserProduct))
                        } else if (type === "medicine") {

                            dispatch(addMedicine({
                                ...data,
                                expireDate: productExpireDate,
                                openDate: medicineOpenDate,
                                id: change.doc.id
                            } as UserMedicine))
                        }
                    }
                    if (change.type === "modified") {
                        if (type === "product") {
                            dispatch(modifyProduct({
                                ...data,
                                expireDate: productExpireDate,
                                id: change.doc.id
                            } as UserProduct))
                        } else if (type === "medicine") {
                            dispatch(modifyMedicine({
                                ...data,
                                expireDate: productExpireDate,
                                openDate: medicineOpenDate,
                                id: change.doc.id
                            } as UserMedicine))
                        }
                    }

                    if (change.type === "removed") {
                        if (type === "product") {
                            dispatch(removeProduct(change.doc.id))
                        } else if (type === "medicine") {
                            dispatch(removeMedicine(change.doc.id))
                        }
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

    // useEffect(()=>{
    //     if(!currentStorageId){
    //         return
    //     }
    //     const docRef = doc(db, "users", user?.uid+"pharmacy");
    //     let q = query(collectionGroup(db, "products"), orderBy(documentId()) ,startAt(docRef.path), endAt(docRef.path + "\uf8ff"));
    //
    //     const unsubscribe = onSnapshot(q, (snapshot) => {
    //             snapshot.docChanges().forEach((change) => {
    //                 let data = change.doc.data()
    //                 let productExpireDate = null;
    //                 if( data.expireDate != null){
    //                     let expireDateTimestamp = Timestamp.fromMillis(data.expireDate.seconds*1000);
    //                     productExpireDate = expireDateTimestamp.toDate();
    //                 }
    //                 if (change.type === "added") {
    //                     dispatch(addMedicine({...data, expireDate: productExpireDate, id: change.doc.id} as UserMedicine))
    //                 }
    //                 if (change.type === "modified") {
    //                     dispatch(modifyMedicine({...data, expireDate: productExpireDate, id: change.doc.id} as UserMedicine))
    //                 }
    //
    //                 if (change.type === "removed") {
    //                     dispatch(removeMedicine(change.doc.id))
    //                 }
    //             });
    //         },
    //         (error) => {
    //             console.log(error)
    //         });
    //
    //     return () => {
    //         unsubscribe()
    //     }
    //
    //
    // }, [currentStorageId, dispatch])

    const isLargerThan1280 = useMediaQuery('(min-width: 1280px)')


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