import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/store";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {
    addOutgoingToShares, selectOutgoingInvites,

} from "../slices/sharesSlice";
import {useSelector} from "react-redux";
import {selectUser} from "../slices/usersSlice";

type AddCoUserFormProps = {
    handleCloseAddCoUser: () => void
    isShownAddCoUserModal: boolean
    handleClick: (e:React.MouseEvent<HTMLElement>)=> void
}

const AddCoUserForm=({handleCloseAddCoUser,handleClick}: AddCoUserFormProps)=>{
    const {t} = useTranslation()
    const dispatch = useAppDispatch();
    let user = useSelector(selectUser);
    const userId = user?.uid;
    const {
        reset,
        register,
        handleSubmit,
    } = useForm<{
        email: string,
        password: string
    }>();
    const outgoingInvites = useAppSelector(selectOutgoingInvites)
    const [messageAfterSendPassword, setMessageAfterSendPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const onSubmit = handleSubmit((data:{email:string})=>{
        let arrayInvites = outgoingInvites.find(invite=> invite.user_email === data.email)

        if(data.email === user?.email){
            setMessageAfterSendPassword(true)
            setErrorMessage("Wpisałeś/aś swój adres email")
            reset({email: ""})
        } else if (arrayInvites){
            setMessageAfterSendPassword(true)
            setErrorMessage("Na ten adres wysłales juz zaproszenie")
            reset({email: ""})
        }  else {
        dispatch(addOutgoingToShares({userId: userId!!, outgoingEmail: data.email}))
        setMessageAfterSendPassword(true)
         setErrorMessage(t("BottomHamburgerMenu.messageAfterInvite"))
        reset({email: ""})
        }
    });
    const handleCloseButtonAfterMessage = (e: React.MouseEvent<HTMLElement>)=>{
        handleCloseAddCoUser();
        setMessageAfterSendPassword(false)
       handleClick(e)
    }

    return(
        <>
            {!messageAfterSendPassword ?
                <div className="block p-6  bg-white max-w-sm mx-auto">
                    <h2 className="text-gray-light my-8 text-xl">{t("BottomHamburgerMenu.headerFormAddCoUser")}</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-6">
                            <input {...register("email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                                   placeholder="email"
                                   className="  form-control
                                            block
                                            w-full
                                            px-4
                                            py-4
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                   id="exampleInputEmail2"
                                   aria-describedby="emailHelp"/>
                            {/*{errors.email?.type === 'required' && <span className="text-sm text-red">{t("users.errors.emailTypeRequired")}</span>}*/}
                            {/*{errors.email?.type === 'pattern' && <span className="text-sm text-red">{ t("users.errors.emailTypePattern")}</span>}*/}
                            {/*{errorMessage!=="" && <p>{errorMessage}</p>}*/}
                        </div>
                        {/*<div className={"flex flex-row justify-between"}>*/}
                            <div className="flex flex row justify-between">
                                <button type="submit" className=" w-2/5

                                              px-1
                                              py-3
                                              text-white
                                              font-bold
                                              bg-purple
                                              text-sm
                                              leading-tight
                                              uppercase
                                              rounded
                                              shadow-md
                                              hover:shadow-lg
                                              focus:shadow-lg focus:outline-none focus:ring-0
                                              active:shadow-lg
                                              transition
                                              duration-150
                                              ease-in-out">{t("buttons.remindPassword")}</button>
                            </div>
                        {/*    <div className="flex flex row justify-between">*/}
                        {/*        <button type="submit" className=" w-2/5*/}

                        {/*                      px-1*/}
                        {/*                      py-3*/}
                        {/*                      text-white*/}
                        {/*                      font-bold*/}
                        {/*                      bg-purple*/}
                        {/*                      text-sm*/}
                        {/*                      leading-tight*/}
                        {/*                      uppercase*/}
                        {/*                      rounded*/}
                        {/*                      shadow-md*/}
                        {/*                      hover:shadow-lg*/}
                        {/*                      focus:shadow-lg focus:outline-none focus:ring-0*/}
                        {/*                      active:shadow-lg*/}
                        {/*                      transition*/}
                        {/*                      duration-150*/}
                        {/*                      ease-in-out">{t("buttons.cancel")}</button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </form>
                </div> :
                <>
                <div className="text-gray-light my-8 text-xl" role="alert">
                    {errorMessage}
                    {/*{t("BottomHamburgerMenu.messageAfterInvite")}*/}
                </div>
                <button className=" w-2/5 px-1 py-3 text-white font-bold bg-purple top-0 text-sm leading-tight uppercase rounded shadow-md hover:shadow-lg" onClick={handleCloseButtonAfterMessage}>{t("buttons.close")}</button>
                </>
               }
        </>
    )
}

export default AddCoUserForm;