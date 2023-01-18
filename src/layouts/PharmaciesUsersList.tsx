import {ArrowRight, StorageItem, StorageList} from "../styles/StoragesList.components";
import {ChevronRightIcon} from "@heroicons/react/solid";
//import {StylesConfig} from "react-select";
import React from "react";
import {useMediaQuery} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/store";
import {selectAcceptedIncomingInvites} from "../slices/sharesSlice";
import {selectCurrentStorage, selectUser, setCurrentStorage} from "../slices/usersSlice";
import {removeProducts} from "../slices/userProductsSlice";
import {removeCategories} from "../slices/categoriesSlice";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {removeMedicines} from "../slices/userMedicineSlice";


const PharmaciesUsersList = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const allAcceptedIncomingInvites = useAppSelector(selectAcceptedIncomingInvites)
    let user = useAppSelector(selectUser);
    const userId = user?.uid;
    const currentStorageId = useAppSelector(selectCurrentStorage)
    const isBiggerThan960 = useMediaQuery('(min-width: 960px)')
    const changeStorage = (userId: string) => {

        dispatch(setCurrentStorage("pharmacy" + userId))
        dispatch(removeProducts())
        dispatch(removeMedicines())
        dispatch(removeCategories())

        // dispatch(fetchCategoriesPharmacy(userId+"pharmacy"))
        // dispatch(fetchUserMedicines(userId+"pharmacy"))
        // dispatch(fetchUserPharmacyImages(userId+"pharmacy"))
    }



    const onClickChangeStorage = (userId: string) => {
        changeStorage(userId!!);
        navigate("/categories")
    }
    return (
        <>
            {isBiggerThan960 ?
                <StorageList>
                    <StorageItem key={userId + "pharmacy"} primary={currentStorageId === "pharmacy" + userId}
                                 onClick={() => onClickChangeStorage(userId!!)}>{t("my_pharmacy")}<ArrowRight><ChevronRightIcon/></ArrowRight></StorageItem>

                    {allAcceptedIncomingInvites.map(invite => {
                        return (
                            <>
                                <StorageItem key={invite.user_email}
                                             primary={currentStorageId === "pharmacy" + invite.user_id}
                                             onClick={() => changeStorage(invite.user_id)}>{invite.user_email}<ArrowRight><ChevronRightIcon/></ArrowRight></StorageItem>

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