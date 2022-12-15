import React from "react";
import {useAppSelector, useAppDispatch} from "../app/store";
import {selectCurrentStorage, selectUser, setCurrentStorage} from "../slices/usersSlice";
import {selectAcceptedIncomingInvites} from "../slices/sharesSlice";
import {fetchUserProducts, removeProducts} from "../slices/userProductsSlice";
import {fetchCategories, removeCategories} from "../slices/categoriesSlice";
import {fetchUserImages} from "../slices/imagesSlice";
import {StorageList, StorageItem, ArrowRight} from "../styles/StoragesList.components";
import { ChevronRightIcon} from "@heroicons/react/solid";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";


const StoragesUsersList = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const allAcceptedIncomingInvites = useAppSelector(selectAcceptedIncomingInvites)
    let user = useAppSelector(selectUser);
    const userId = user?.uid;
    const currentStorageId = useAppSelector(selectCurrentStorage)
    const location = useLocation().pathname
    console.log(location)

    const changeStorage = (userId: string) => {

        dispatch(setCurrentStorage(userId))
        dispatch(removeProducts())
        dispatch(removeCategories())
        dispatch(fetchCategories(userId))
        dispatch(fetchUserProducts(userId))
        dispatch(fetchUserImages(userId))
    }


    return (
        <>

                <StorageList>
                    <StorageItem key={userId} primary={currentStorageId === userId}
                                 onClick={() => changeStorage(userId!!)}>{t("my_storage")}<ArrowRight><ChevronRightIcon/></ArrowRight></StorageItem>

                    {allAcceptedIncomingInvites.map(invite => {
                        return (
                            <>
                                <StorageItem key={invite.user_id}
                                             primary={currentStorageId === invite.user_id}
                                             onClick={() => changeStorage(invite.user_id)}>{invite.user_email}<ArrowRight><ChevronRightIcon/></ArrowRight></StorageItem>

                            </>
                        )

                    })}
                </StorageList>


        </>
    )
}

export default StoragesUsersList;