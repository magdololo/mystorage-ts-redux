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


const PharmaciesUsersList = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const allAcceptedIncomingInvites = useAppSelector(selectAcceptedIncomingInvites)
    let user = useAppSelector(selectUser);
    const userId = user?.uid;
    const currentStorageId = useAppSelector(selectCurrentStorage)
    const isBiggerThan960 = useMediaQuery('(min-width: 960px)')
    const changeStorage = (userId: string) => {

        dispatch(setCurrentStorage(userId + "pharmacy"))
        dispatch(removeProducts())
        dispatch(removeCategories())

        // dispatch(fetchCategoriesPharmacy(userId+"pharmacy"))
        // dispatch(fetchUserMedicines(userId+"pharmacy"))
        // dispatch(fetchUserPharmacyImages(userId+"pharmacy"))
    }

    const options: { value: string, label: string }[] = []

    allAcceptedIncomingInvites.map((invite) => (
        options.push({value: invite.user_id, label: invite.user_email})
    ))
    options.push({value: userId!!, label: t("my_pharmacy")})

    // const handleChange =(e: any)=>{
    //     console.log(e.value)
    //     changeStorage(e.value)
    // }

    // type Option = {
    //     value: string
    //     label: string
    // }
    // const customStyles: StylesConfig<Option> = {
    //     option: (provided, state) => ({
    //
    //         borderBottom: '1px dotted pink',
    //         color: state.isSelected ? '#4C1D95' : '#7C3AED',
    //         padding: 20,
    //         "&:hover": {
    //             color: '#4C1D95'
    //         }
    //     }),
    //     control: (styles) => ({
    //         ...styles,
    //         width: 280,
    //         border: 'none',
    //         margin: '0 auto',
    //         "&:active": {
    //             border: 'none',
    //             boxShadow: "none"
    //         },
    //         "&:hover":{
    //             border: 'none',
    //             boxShadow: "none"
    //         },
    //         "&:focus":{
    //             border: 'none',
    //             boxShadow: "none"
    //         }
    //     }),
    //
    // }
    return (
        <>
            {isBiggerThan960 ?
                <StorageList>
                    <StorageItem key={userId} primary={currentStorageId === userId + "pharmacy"}
                                 onClick={() => changeStorage(userId!!)}>{t("my_pharmacy")}<ArrowRight><ChevronRightIcon/></ArrowRight></StorageItem>

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
                :
                null

            }
        </>
    )
}
export default PharmaciesUsersList