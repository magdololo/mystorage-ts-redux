import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../app/store";
import {selectCurrentStorage, selectUser, setCurrentStorage} from "../slices/usersSlice";
import {useNavigate} from "react-router-dom";
import {removeProducts} from "../slices/userProductsSlice";
import {removeCategories} from "../slices/categoriesSlice";
import {useLocalStorage} from "usehooks-ts";
import {selectAcceptedIncomingInvites} from "../slices/sharesSlice";


const SelectStorages = () => {
    const {t} = useTranslation();
    let user = useAppSelector(selectUser);
    const userId = user?.uid;
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const currentStorageId = useAppSelector(selectCurrentStorage)
    const [, setLastUser] = useLocalStorage('lastStorage', userId)
    const allAcceptedIncomingInvites = useAppSelector(selectAcceptedIncomingInvites)
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

    const onClickChangePharmacy = (userId: string) => {
        changeStorage(userId!!);
        navigate("/categories")
    }
    return (
        <>
            <div>
                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
                    <Select native defaultValue="" id="grouped-native-select" label={currentStorageId}>
                        <option aria-label={t("my_storage")} value={userId}
                                onClick={() => onClickChangeStorage(userId!!)}/>
                        {allAcceptedIncomingInvites.map(invite => {
                            return (
                                <>
                                    <option value={invite.user_id}
                                            onClick={() => changeStorage(invite.user_id)}>{invite.user_email}</option>
                                </>
                            )
                        })}
                        <option aria-label={t("my_pharmacy")} value="" onClick={() => onClickChangePharmacy(userId!!)}/>
                        {allAcceptedIncomingInvites.map(invite => {
                            return (
                                <>
                                    <option value={invite.user_id}
                                            onClick={() => changeStorage(invite.user_id)}>{invite.user_email}</option>
                                </>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default SelectStorages;