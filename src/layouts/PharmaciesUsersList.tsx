import {ArrowRight, StorageItem, StorageList} from "../styles/StoragesList.components";
import {ChevronRightIcon} from "@heroicons/react/solid";
import React from "react";
import {useMediaQuery} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/store";
import {selectAcceptedIncomingInvites} from "../slices/sharesSlice";
import {selectCurrentStorage, selectUser, setCurrentStorage} from "../slices/usersSlice";
import {removeProducts} from "../slices/userProductsSlice";
import {removeCategories} from "../slices/categoriesSlice";
import {useTranslation} from "react-i18next";
import {removeMedicines} from "../slices/userMedicineSlice";
import {useLocalStorage} from "usehooks-ts";

const PharmaciesUsersList = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const allAcceptedIncomingInvites = useAppSelector(selectAcceptedIncomingInvites)
    let user = useAppSelector(selectUser);
    const userId = user?.uid;

    const currentStorageId = useAppSelector(selectCurrentStorage)
    const isBiggerThan960 = useMediaQuery('(min-width: 960px)')
    const [, setLastUser] = useLocalStorage<string>('lastStorage', userId ?? "")
    const changeStorage = (userId: string) => {

        dispatch(setCurrentStorage(userId))
        dispatch(removeProducts())
        dispatch(removeMedicines())
        dispatch(removeCategories())
        setLastUser(userId)
    }

    return (
        <>
            {isBiggerThan960 ?
                <StorageList>
                    <StorageItem key={userId + "pharmacy"} primary={currentStorageId === "pharmacy" + userId}
                                 onClick={() => changeStorage(userId!!)}>{t("my_pharmacy")}<ArrowRight><ChevronRightIcon/></ArrowRight></StorageItem>

                    {allAcceptedIncomingInvites.map(invite => {
                        return (
                            <>
                                <StorageItem key={invite.user_email}
                                             primary={currentStorageId === "pharmacy" + invite.user_id}
                                             onClick={() => changeStorage("pharmacy" + invite.user_id)}>{invite.user_email}<ArrowRight><ChevronRightIcon/></ArrowRight></StorageItem>

                            </>
                        )

                    })}
                </StorageList>
                :
                null

            }
        </>
    )
}
export default PharmaciesUsersList