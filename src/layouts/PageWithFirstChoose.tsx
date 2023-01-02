import {useMediaQuery} from "usehooks-ts";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
//import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Modal} from "../component/Modal/Modal";
import {useAppDispatch, useAppSelector} from "../app/store";
import {changeSeeGreetingToTrue, selectUser, setCurrentStorage, User} from "../slices/usersSlice";

const PageWithFirstChoose = () => {
    const mobileLayout = useMediaQuery('(max-width: 800px)')
    const {t} = useTranslation();
    let navigate = useNavigate()
    const dispatch = useAppDispatch()
    let user = useAppSelector(selectUser);

    let didSee = user?.didSeeGreeting;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleCloseGreeting = () => setIsOpen(false);
    useEffect(() => {
        if (didSee === false) {
            setIsOpen(true)
        }
    }, [user, didSee])


    const closeModalWithGreeting = () => {
        handleCloseGreeting();
        dispatch(changeSeeGreetingToTrue(user as User))
    }
    let greeting = <>
        <Modal isShown={isOpen} hide={closeModalWithGreeting} modalHeaderText={""}
               modalContent={<><h1>{t("categories.CategoryList.modalWithGreeting_h1")}</h1>
                   <h2> {t("categories.CategoryList.modalWithGreeting_h2")}</h2>
                   <div
                       className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 rounded-b-md">
                       <button type="button" className="  px-6
                                                          py-2.5
                                                          bg-purple
                                                          text-white
                                                          font-medium
                                                          text-xs
                                                          leading-tight
                                                          uppercase
                                                          rounded
                                                          shadow-md
                                                          hover:bg-purple-700 hover:shadow-lg
                                                          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                                                          active:bg-purple-800 active:shadow-lg
                                                          transition
                                                          duration-150
                                                          ease-in-out"
                               data-bs-dismiss="modal" onClick={closeModalWithGreeting}>{t("buttons.close")}
                       </button>
                   </div>
               </>}/>
    </>;
    return (
        <>
            {mobileLayout ?
                <div className={"mt-64"}>
                    <div className={"flex flex-col w-10/12 mx-auto justify-center align-middle"}>
                        <button
                            className={"w-10/12 mx-auto border border-1 border-purple-800 rounded-sm cursor-pointer px-16 py-10 font-bold text-gray-light uppercase text-md mb-4 tracking-wider"}>{t('my_storage')}</button>
                        <button
                            className={"w-10/12 mx-auto border border-1 border-purple-800 rounded-sm cursor-pointer px-16 py-10 font-bold text-gray-light uppercase text-md mt-4 tracking-wider"}>{t('my_pharmacy')}</button>
                    </div>
                </div>
                :
                <div className={"mt-80"}>
                    <div className={"flex flex-row justify-between w-6/12 mx-auto items-center"}>
                        <div className={"justify-center"}>
                            <button
                                className={"border border-2 border-purple-400 rounded-sm cursor-pointer px-20 py-12 font-bold text-gray-light uppercase text-2xl" +
                                    "transition ease-in-out duration-300 hover:scale-110 hover:border-purple-800"}
                                onClick={() => {
                                    dispatch(setCurrentStorage(user!!.uid))
                                    navigate("/categories")
                                }}>{t('my_storage')}
                            </button>
                        </div>
                        <div className={"justify-center"}>
                            <button
                                className={"border border-2 border-purple-400 rounded-sm cursor-pointer px-20 py-12 font-bold text-gray-light uppercase text-2xl" +
                                    "transition ease-in-out duration-300 hover:scale-110 hover:border-purple-800"}
                                onClick={() => {
                                    dispatch(setCurrentStorage("pharmacy" + user!!.uid))
                                    navigate("/categories")
                                }}>{t('my_pharmacy')}
                            </button>
                        </div>
                    </div>
                </div>
            }
            {didSee === false && greeting}

        </>
    )
}

export default PageWithFirstChoose