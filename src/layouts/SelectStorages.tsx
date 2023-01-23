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
                        {/*<optgroup label={t("my_pharmacy")}>*/}
                        {allAcceptedIncomingInvites.map(invite => {
                            return (
                                <>
                                    <option value={invite.user_id}
                                            onClick={() => changeStorage(invite.user_id)}>{invite.user_email}</option>
                                </>
                            )

                            // options.push({value: invite.user_id, label: invite.user_email, padding: "40px", class: "optionInvites"})
                            // <option value={userId!!}>Option 1</option>
                            // <option value={2}>Option 2</option>
                            /*</optgroup>*/
                        })}
                        <option aria-label={t("my_pharmacy")} value="" onClick={() => onClickChangePharmacy(userId!!)}/>
                        {/*<optgroup label="Category 2">*/}
                        {allAcceptedIncomingInvites.map(invite => {
                            return (
                                <>
                                    <option value={invite.user_id}
                                            onClick={() => changeStorage(invite.user_id)}>{invite.user_email}</option>
                                </>
                            )
                        })}
                        {/*// <option value={3}>Option 3</option>*/}
                        {/*// <option value={4}>Option 4</option>*/}
                        {/*</optgroup>*/}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default SelectStorages;