import React from "react";
import {useAppSelector, useAppDispatch} from "../app/store";
import {selectCurrentStorage, selectUser, setCurrentStorage} from "../slices/usersSlice";
import {selectAcceptedIncomingInvites} from "../slices/sharesSlice";
import {removeProducts} from "../slices/userProductsSlice";
import {removeCategories} from "../slices/categoriesSlice";
import {StorageList, StorageItem, ArrowRight} from "../styles/StoragesList.components";
import {ChevronRightIcon} from "@heroicons/react/solid";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "usehooks-ts";


const StoragesUsersList = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const allAcceptedIncomingInvites = useAppSelector(selectAcceptedIncomingInvites)
    let user = useAppSelector(selectUser);
    const userId = user?.uid;
    const currentStorageId = useAppSelector(selectCurrentStorage)
    const [, setLastUser] = useLocalStorage('lastStorage', userId)

    const changeStorage = (userId: string) => {
        dispatch(setCurrentStorage(userId))
        dispatch(removeProducts())
        dispatch(removeCategories())
        setLastUser(userId)
    }
    const onClickChangeStorage = (userId: string) => {
        changeStorage(userId!!);
        navigate("/categories")
    }

    return (
        <>

            <StorageList>
                <StorageItem key={userId} primary={currentStorageId === userId}
                             onClick={() => onClickChangeStorage(userId!!)}>{t("my_storage")}<ArrowRight><ChevronRightIcon/></ArrowRight></StorageItem>

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