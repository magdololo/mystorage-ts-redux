import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

type AddCoUserFormProps = {
    handleClose: () => void
    isShown: boolean
}

const AddCoUserForm=({handleClose, isShown}: AddCoUserFormProps)=>{
    const {t} = useTranslation()
    const {
        reset,
        register,
        handleSubmit,
        // formState: {}
    } = useForm<{
        email: string,
        password: string
    }>();
    const [messageAfterSendPassword, setMessageAfterSendPassword] = useState(false)
    //const [errorMessage, setErrorMessage] = useState("")
    const onSubmit = handleSubmit((data:{email:string})=>{
        setMessageAfterSendPassword(true)
        reset({email: ""})

    });
    return(
        <>
            <div className="block p-6  bg-white max-w-sm mx-auto">
                <h2 className="text-gray-light my-8 text-xl">{t("BottomHamburgerMenu.headerFormAddCoUser")}</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group mb-6">
                        <input {...register("email",{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, })}
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
                               aria-describedby="emailHelp" />
                        {/*{errors.email?.type === 'required' && <span className="text-sm text-red">{t("users.errors.emailTypeRequired")}</span>}*/}
                        {/*{errors.email?.type === 'pattern' && <span className="text-sm text-red">{ t("users.errors.emailTypePattern")}</span>}*/}
                        {/*{errorMessage!=="" && <p>{errorMessage}</p>}*/}
                    </div>
                    <div className ="flex flex row justify-between">
                        <button type="submit"   className=" w-2/5

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


                </form>
                {messageAfterSendPassword ?
                    <>
                    <div className="text-gray-light my-8 text-xl" role="alert">
                        Na ten adres email wysłalismy zaroszenie do twojej spiżarni!</div>
                    <button className=" w-2/5 px-1 py-3 text-white font-bold bg-purple top-0 text-sm leading-tight uppercase rounded shadow-md hover:shadow-lg" onClick={handleClose}>{t("buttons.close")}</button>
                    </>
                    : ""
                }
            </div>

        </>
    )
}

export default AddCoUserForm;