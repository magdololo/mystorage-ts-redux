import React from "react";
import {useAppSelector, useAppDispatch} from "../app/store";
import {selectCurrentStorage, selectUser, setCurrentStorage} from "../slices/usersSlice";
import {selectAcceptedIncomingInvites} from "../slices/sharesSlice";
import {fetchUserProducts, removeProducts} from "../slices/userProductsSlice";
import {fetchCategories, removeCategories} from "../slices/categoriesSlice";
import {fetchUserImages} from "../slices/imagesSlice";
import {StorageList, StorageItem, ArrowRight} from "../styles/StoragesList.components";

import { ChevronRightIcon} from "@heroicons/react/solid";
import {useMediaQuery} from "@mui/material";
import {useTranslation} from "react-i18next";
import Select, {StylesConfig} from "react-select";

const StoragesList = ()=>{
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const allAcceptedIncomingInvites = useAppSelector(selectAcceptedIncomingInvites)
    let user = useAppSelector(selectUser);
    const userId = user?.uid;
    const currentStorageId = useAppSelector(selectCurrentStorage)
    console.log(currentStorageId)
    const isBiggerThan960 = useMediaQuery('(min-width: 960px)')
    const changeStorage =(userId: string)=> {
        console.log("changeStorage")
        dispatch(setCurrentStorage(userId))
        dispatch(removeProducts())
        dispatch(removeCategories())
        dispatch(fetchCategories(userId))
        dispatch(fetchUserProducts(userId))
        dispatch(fetchUserImages(userId))
    }

    const options:{value: string, label: string}[] = []

    allAcceptedIncomingInvites.map( (invite) => (
        options.push({ value: invite.user_id, label: invite.user_email })
    ))
    options.push({value: userId!!, label: t("my_storage")})

    const handleChange =(e: any)=>{
        console.log(e.value)
        changeStorage(e.value)
    }

    type Option = {
        value: string
        label: string
    }
    const customStyles: StylesConfig<Option> = {
        option: (provided, state) => ({

            borderBottom: '1px dotted pink',
            color: state.isSelected ? '#4C1D95' : '#7C3AED',
            padding: 20,
            "&:hover": {
                color: '#4C1D95'
            }
        }),
        control: (styles) => ({
            ...styles,
            width: 280,
            border: 'none',
            margin: '0 auto',
            "&:active": {
                border: 'none',
                boxShadow: "none"
            },
            "&:hover":{
                border: 'none',
                boxShadow: "none"
            },
            "&:focus":{
                border: 'none',
                boxShadow: "none"
            }
        }),

    }

    return (
        <>
            {isBiggerThan960 ?
                <StorageList>
                    <StorageItem primary={currentStorageId === userId} onClick={() => changeStorage(userId!!)}>{t("my_storage")}</StorageItem>
                    <ArrowRight><ChevronRightIcon/></ArrowRight>
                    {allAcceptedIncomingInvites.map(invite => {
                        return (
                            <>
                                <StorageItem primary={currentStorageId === invite.user_id}
                                             onClick={() => changeStorage(invite.user_id)}>{invite.user_email}</StorageItem>
                                <ArrowRight><ChevronRightIcon/></ArrowRight>
                            </>
                        )

                    })}
                </StorageList> :
                // <div className="select">
                //     <select id="standard-select" value={currentStorageId!!} onChange={handleChange}>
                //         {options.map((option) => (
                //             <option className={"single_option"+ (currentStorageId === option.value ? " selected" : "")} value={option.value} selected={currentStorageId === option.value}  >{option.label}</option>
                //         ))}
                //     </select>
                // </div>
                <Select options={options}
                        defaultValue={options[options.length-1]}
                        onChange={handleChange}
                        styles={customStyles}
                />
            }
        </>
    )
}

export default StoragesList;