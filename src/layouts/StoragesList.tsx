import React, {useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from "../app/store";
import {selectCurrentStorage, selectUser, setCurrentStorage} from "../slices/usersSlice";
import {selectAcceptedIncomingInvites} from "../slices/sharesSlice";
import {fetchUserProducts, removeProducts} from "../slices/userProductsSlice";
import {fetchCategories, removeCategories} from "../slices/categoriesSlice";
import {fetchImages} from "../slices/imagesSlice";
import {StorageList, StorageItem, ArrowRight} from "../styles/StoragesList.components";

import { ChevronRightIcon} from "@heroicons/react/solid";
import {useMediaQuery} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Accordion} from "react-accordion-ts";

const StoragesList = ()=>{
    const dispatch = useAppDispatch()
    const allAcceptedIncomingInvites = useAppSelector(selectAcceptedIncomingInvites)
    let user = useAppSelector(selectUser);
    const userId = user?.uid;
    const currentStorageId = useAppSelector(selectCurrentStorage)
    // const [activeOwnStorage, setActiveOwnStorage] = useState(false)
    //const [activeAnotherStorage, setActiveAnotherStorage] = useState(false)
    const isBiggerThan960 = useMediaQuery('(min-width: 960px)')
    const changeStorage =(inviteUserId: string)=> {
        // setActiveOwnStorage(false)
        console.log("changeStorage")
        dispatch(setCurrentStorage(inviteUserId))
        dispatch(removeProducts())
        dispatch(removeCategories())
        dispatch(fetchCategories(inviteUserId))
        dispatch(fetchImages(inviteUserId))
        dispatch(fetchUserProducts(inviteUserId))
    }

    const chooseOwnStorage = (userId: string)=>{
        dispatch(setCurrentStorage(userId))
        console.log("user oryginal")
        dispatch(removeProducts())
        dispatch(removeCategories())
        dispatch(fetchCategories(userId!!))
        dispatch(fetchImages(userId!!))
        dispatch(fetchUserProducts(userId!!))

    }
    //const [active, setActive] = useState(false)
    const myAccordion = [
        {
            title: <span><li onClick={() => chooseOwnStorage(userId!!)}>Moja spiżarnia</li></span>,
            content:
                <>
                    <ul>
                        {allAcceptedIncomingInvites.map(invite => {
                            return <li onClick={() => changeStorage(invite.user_id)}>{invite.user_email}</li>
                        })}
                    </ul>
                </>
        }
    ]
   console.log(allAcceptedIncomingInvites)
    return (
        <>
            {isBiggerThan960 ?
                <StorageList>
                    <StorageItem primary={currentStorageId === userId} onClick={() => chooseOwnStorage(userId!!)}>Moja
                        spiżarnia</StorageItem>
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
                <Accordion items={myAccordion} duration={300} multiple={false}/>
            }
        </>
    )
}

export default StoragesList;