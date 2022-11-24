import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import {useForm, SubmitHandler} from "react-hook-form";
import {sendEmailVerification} from "firebase/auth";

import {
    auth,
    createUserWithEmailAndPassword,
} from '../../firebase';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";


const eye = <FontAwesomeIcon icon={faEye}/>;

type Inputs = {
    email: string;
    password: string;

}
const RegisterPage = () => {
    const { t } = useTranslation();

    let {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>();
    const [checkboxState, setCheckboxState] =useState(false);
    const handleInputChange = ()=>{
        setCheckboxState(!checkboxState)
    }
    const [message, setMessage] = useState("");
    const [messageAboutSentActivateLink, setMessageAboutSentActivateLink] = useState(false);
    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://mystorage.ovh',
        handleCodeInApp: true

    };

    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        console.log("hej")
        e?.preventDefault()

        if (checkboxState) {
            console.log("checkbox")

            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    sendEmailVerification(user, actionCodeSettings)
                    setMessageAboutSentActivateLink(true)

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Error ocured: ", errorCode, errorMessage);
                    switch (error.code){
                        case "auth/wrong-password":
                            setMessage (t("users.RegisterPage.message.wrongPassword"))
                            break;
                        case "auth/user-not-found":
                            setMessage (t("users.RegisterPage.message.userNotFound"));
                            break;
                        case "auth/email-already-in-use":
                            setMessage(t("users.RegisterPage.message.emailAlreadyInUse"));
                            break;
                        case "auth/user-disabled":
                            setMessage  (t("users.RegisterPage.message.userDisabled"));
                            break;
                        case "auth/weak-password":
                            setMessage (t("users.RegisterPage.message.weakPassword"));
                            break;
                        default:
                            setMessage(t("users.RegisterPage.message.default"));
                    }

                })
        } else {
            setMessage((t("users.RegisterPage.message.acceptRegulations")))
        }

    };

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };


    return (
        <>
            {!messageAboutSentActivateLink ?
        <>
            <div className="text-center bg-gray-50 text-gray-dark pt-20 pb-4 px-6">
                <h1 className="text-4xl font-bold mt-0 mb-6">{t("app_title")}</h1>
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-group mb-6">
                        <label className="form-label inline-block mb-2 text-gray-700">Email address</label>
                        <input type="email" {...register("email", {
                            required: true,
                            pattern:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

                        })}
                               placeholder="email"
                               className="  form-control
                                            block
                                            w-full
                                            px-3
                                            py-1.5
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
                        {errors.email?.type === 'required' && <span className="text-sm text-red">{t("users.errors.emailTypeRequired")}</span>}
                        {errors.email?.type === 'pattern' && <span className="text-sm text-red">{ t("users.errors.emailTypePattern")}</span>}
                    </div>
                    <div className="form-group mb-6 relative">

                        <label className="form-label inline-block mb-2 text-gray-700">Password</label>
                        <input type={passwordShown ? "text" : "password"} {...register("password", {required: true})}
                               placeholder="password"
                               className="  form-control
                                            block
                                            w-full
                                            px-3
                                            py-1.5
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
                               id="exampleInputPassword2"/>
                        <i onClick={togglePasswordVisibility}>{eye}</i>{" "}
                        {errors.password?.type === 'required' && <span className="text-sm text-red">{t("users.errors.passwordTypeRequired")}</span>}
                    </div>
                    <div className="mx-auto max-w-sm px-6">
                        <input
                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            type="checkbox" onChange={handleInputChange} checked={checkboxState} id="flexCheckDefault">
                        </input>
                        <label className="form-check-label inline-block text-gray-800 " htmlFor="flexCheckDefault">
                            {t("acceptRegulations")}
                        </label>
                    </div>
                    <div className="flex justify-center space-x-6 mt-3">
                        <button type="submit"
                                className=" w-1/2
                                          px-6
                                          py-2.5
                                          text-purple
                                          font-bold
                                          text-xs
                                          leading-tight
                                          uppercase
                                          rounded
                                          shadow-md
                                           hover:shadow-lg
                                          focus:shadow-lg focus:outline-none focus:ring-0
                                          active:shadow-lg
                                          transition
                                          duration-150
                                          ease-in-out"
                        >
                            {t("buttons.register")}
                        </button>
                    </div>
                    {message}
                </form>

            </div>
            </>
                :
        <>
            <div>
                <h2 className={"text-center pt-64 text-3xl text-gray"}>{t("users.RegisterPage.message.messageToVerifiedEmail")}</h2>
            </div>
        </>
                }

        </>
    );
}


export default RegisterPage;