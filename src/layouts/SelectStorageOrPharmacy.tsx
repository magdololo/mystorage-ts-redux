import React from "react";
import Select from "react-select";
import {useAppDispatch, useAppSelector} from "../app/store";
import {selectAcceptedIncomingInvites} from "../slices/sharesSlice";
import {selectCurrentStorage, selectUser, setCurrentStorage} from "../slices/usersSlice";
import {removeProducts} from "../slices/userProductsSlice";
import {removeCategories} from "../slices/categoriesSlice";
import {removeImages} from "../slices/imagesSlice";
import {useTranslation} from "react-i18next";
import {singleSelectStyle} from "../searchStyle";
import {useLocalStorage} from "usehooks-ts";


const SelectStorageOrPharmacy = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const allAcceptedIncomingInvites = useAppSelector(selectAcceptedIncomingInvites)
    let user = useAppSelector(selectUser);
    const userId = user?.uid;
    const currentStorageId = useAppSelector(selectCurrentStorage)

    const [, setLastUser] = useLocalStorage('lastStorage', userId)


    const changeStorage = (currentStorageId: string) => {
        dispatch(setCurrentStorage(currentStorageId))
        dispatch(removeProducts())
        dispatch(removeCategories())
        dispatch(removeImages())
        setLastUser(currentStorageId)

    }
    const invitesNoChoose = allAcceptedIncomingInvites
    console.log(invitesNoChoose)
    const options: { value: string, label: string, padding: string, class: string }[] = []

    options.push({value: userId!!, label: t("my_storage"), padding: "20px", class: "optionBase"})

    invitesNoChoose.map((invite) => (
        options.push({value: invite.user_id, label: invite.user_email, padding: "40px", class: "optionInvites",})
    ))


    options.push({value: "pharmacy" + userId!!, label: t("my_pharmacy"), padding: "20px", class: "optionBase"})

    invitesNoChoose.map((invite) => (
        options.push({
            value: "pharmacy" + invite.user_id,
            label: invite.user_email,
            padding: "40px",
            class: "optionInvites",
        })
    ))

    console.log(options)
    const handleChange = (e: any) => {
        if (e) {
            console.log(e.value)//id wybranego currentStorage
            changeStorage(e.value)
        }

    }
    // const changeStorage = (userId: string) => {
    //
    //     dispatch(setCurrentStorage("pharmacy" + userId))
    //     dispatch(removeProducts())
    //     dispatch(removeMedicines())
    //     dispatch(removeCategories())
    //     setLastUser("pharmacy" + userId)
    // }

    // useEffect(()=>{
    //     if(currentStorageId && selectEl.current)
    //     selectEl.current.setValue(options.find(option => option.value === currentStorageId),"select-option")
    // },[currentStorageId])

    // type Option = {
    //     value: string
    //     label: string
    //     padding: string
    //     class: string
    // }
    // const customStyles: StylesConfig<Option> = {
    //     option: (base, state) => ({
    //         ...base,
    //         borderBottom: '.5px solid rgba(136, 68, 152, 0.4)',
    //         color: state.isSelected ? '#4C1D95' : state.label === t("my_storage") || t("my_pharmacy") ? "purple" : "black",
    //         padding: 10,
    //         paddingLeft: state.label === t("my_storage") || t("my_pharmacy") ? 20: 40,
    //         "&:hover": {
    //             color: '#7C3AED'
    //         }
    //     }),
    //     control: (styles) => ({
    //         ...styles,
    //         width: 280,
    //         border: 'none',
    //         margin: '0 auto',
    //
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
    console.log(currentStorageId)

    console.log(options.find(option => option.value === currentStorageId))
    // const indexOfCurrentStorageInOptions= options.indexOf(currentStorage!)
    return (
        <>
            <Select
                options={options}
                defaultValue={options[0]}
                onChange={handleChange}
                //styles={customStyles}
                styles={singleSelectStyle("primary")}

            />


        </>
    )
}

export default SelectStorageOrPharmacy;