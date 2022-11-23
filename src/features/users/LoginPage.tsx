import React, { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {auth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider} from '../../firebase';

import {addDefaultCategoriesToNewUser, addNewUserToUsersCollection, login, AddDefaultCategoriesToNewUserProps} from "../../slices/usersSlice";
import {
    doc,
    getDoc,

} from "firebase/firestore";
import {db} from "../../firebase";
import {BsArrowLeft} from "react-icons/bs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";

interface User{
    uid: string;
    email: string;
    providerId: string;

}

const LoginPage = () => {
    const { t, i18n } = useTranslation();
    const userLanguage = i18n.language;
    const dispatch = useDispatch()
    const provider = new GoogleAuthProvider();
    const [errorMessage,setErrorMessage] = useState("");
    const [content, setContent] = useState(false);
    const[message, setMessage] = useState<boolean>(false);
    let navigate = useNavigate()
    const [checkboxState, setCheckboxState] =useState(false);
    const handleInputChange = ()=>{
       setCheckboxState(!checkboxState)
    }
    const [user,setUser] = useState({} as User)



    const eye = <FontAwesomeIcon icon={faEye}/>;
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<{
        email: string,
        password: string
    }>();
    const onSubmit = handleSubmit((data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                reset();
                if(user.emailVerified){
                    console.log("user verified")
                    const addDefaultCategoriesToNewUserParams: AddDefaultCategoriesToNewUserProps = {
                        userId: user.uid,
                        userLanguage: userLanguage
                    }
                    dispatch(addNewUserToUsersCollection({uid: user.uid, email: user.email ?? "", provider: user.providerId, didSeeGreeting: false}))
                    dispatch( addDefaultCategoriesToNewUser(addDefaultCategoriesToNewUserParams))

                }
                dispatch(
                    login({uid: user.uid,
                                email: user.email ?? "",
                                provider: user.providerId,
                                didSeeGreeting: true})
                )
                navigate("/categories")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("An error occured: ", errorCode, errorMessage);
                if(errorCode === 'auth/wrong-password'){
                    setErrorMessage('Niepoprawne hasło')
                }
                else if(errorCode === 'auth/wrong-email'){
                    setErrorMessage('Niepoprawny email')
                }
                else if (errorCode === 'auth/user-not-found'){
                    setErrorMessage('Konto nie istnieje')
                }});
                reset()

    });




    const socialSignIn= async()=> {
        try {
            let result = await signInWithPopup(auth, provider)
            // This gives you a Google Access Token. You can use it to access the Google API.

           let user = result.user
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const userExist = docSnap.exists()
                if(!userExist){
                setContent(true);
                setUser(user as User)
                setMessage(true)

            } else {
                GoogleAuthProvider.credentialFromResult(result);
               dispatch(
                   login({uid: user.uid,
                       email: user.email ?? "",
                       provider: user.providerId,
                       didSeeGreeting: true})
               )
               navigate("/categories")
            }

        } catch (error: any){
            console.log(error.code)
        }
    }
    const signUserIfCheckboxStateIsTrue=(user: User)=> {
        if(checkboxState) {
            dispatch(addNewUserToUsersCollection({
                uid: user.uid,
                email: user.email ?? "",
                provider: user.providerId,
                didSeeGreeting: false
            }))
            const addDefaultCategoriesToNewUserParams: AddDefaultCategoriesToNewUserProps = {
                userId: user.uid,
                userLanguage: userLanguage
            }
            dispatch(addDefaultCategoriesToNewUser(addDefaultCategoriesToNewUserParams))

            dispatch(
                login({
                    uid: user.uid,
                    email: user.email ?? "",
                    provider: user.providerId,
                    didSeeGreeting: false
                }))
            navigate("/categories")
        }

    }
    return(
        <>

            <div className="text-center bg-gray-50 text-gray-dark pt-20 pb-4 px-6">
                <h1 className="text-4xl font-bold mt-0 mb-6">{t("app_title")}</h1>
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto">
                {!content &&
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-6">
                            <label className="form-label inline-block mb-2 text-gray-700">Email address</label>
                            <input {...register("email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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

                            {errorMessage === 'Niepoprawny email' ? <span className="text-sm text-red">{t("users.errorMessage.email")}</span> : null}
                            {errors.email?.type === 'required' && <span className="text-sm text-red">{t("users.errors.emailTypeRequired")}</span>}
                            {errors.email?.type === 'pattern' && <span className="text-sm text-red">{ t("users.errors.emailTypePattern")}</span>}
                        </div>
                        <div className="form-group mb-6 relative">
                            <label className="form-label inline-block mb-2 text-gray-700">Password</label>
                            <input type={passwordShown ? "text" : "password"}{...register("password", {required: true})} placeholder="password"
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
                                   id="exampleInputPassword2"
                            />
                            <i onClick={togglePasswordVisibility}>{eye}</i>{" "}
                            {errorMessage === 'Niepoprawne hasło' && <p className="text-sm text-red">{t("users.errorMessage.password")}</p>}
                            {errorMessage === 'Konto nie istnieje' && <p className="text-sm text-red">{t("users.errorMessage.account")}</p>}
                            {errors.password?.type === 'required' && <span className="text-sm text-red">{t("users.errors.passwordTypeRequired")}</span>}
                        </div>
                        <p className="text-gray-800 mt-6 text-center pb-6">{t("users.LoginPage.questionRemember")}
                            <Link to="/remindPassword"
                                  className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out ml-1">{t("users.LoginPage.linkToRememberPassword")}</Link>
                        </p>
                        <div className="flex justify-center space-x-6">
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
                                          ease-in-out">
                                {t("buttons.logIn")}
                            </button>
                            <button type="button"
                                    className=" w-1/2
                                          px-6
                                          py-3
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
                                          ease-in-out
                                          backgroundColor: #1da1f2">
                                <div className="flex flex-row items-center " onClick={(event) => {
                                    event.preventDefault();
                                    socialSignIn()
                                }}>
                                    <span
                                        className="flex-0 px-1.5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold">with</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" width="90" height="30"
                                         className="flex-1">
                                        <path fill="#EA4335"
                                              d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                                        <path fill="#FBBC05"
                                              d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                                        <path fill="#4285F4"
                                              d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                                        <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
                                        <path fill="#EA4335"
                                              d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                                        <path fill="#4285F4"
                                              d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
                                    </svg>

                                </div>

                            </button>


                        </div>
                        {errorMessage === "Konto nie istnieje. Zarejestruj się!" ? <p className="text-sm text-red">{t("users.errorMessage.register")}</p> : null}
                        <p className="text-gray-800 mt-6 text-center">{t("users.LoginPage.questionAccount")}
                            <Link to="/register"
                                  className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out ml-1">{t("users.LoginPage.linkToRegister")}</Link>
                        </p>
                    </form>
                }

                {(message && content) &&
                    <>
                        <div
                            className="bg-white rounded-lg py-5 px-6 mt-4 text-md text-purple-600 mb-3 max-w-sm mx-auto form-check">
                            <p className=" text-gray-light mt-8 ">{t("users.LoginPage.content.p1")}</p>
                            <p className=" text-gray-light pt-2 ">{t("users.LoginPage.content.p2")}</p>
                            <p className=" text-gray-light pt-2 ">{t("users.LoginPage.content.p3")}</p>
                        </div>
                        <div className="mx-auto max-w-sm px-6">
                            <input
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                type="checkbox" onChange={handleInputChange} checked={checkboxState}
                                id="flexCheckDefault">
                            </input>
                            <label className="form-check-label inline-block text-gray-800 " htmlFor="flexCheckDefault">
                                {t("acceptRegulations")}
                            </label>
                        </div>
                        <div className="mx-auto text-lg text-purple text-center max-w-sm  ">
                            <button type="button"
                                    className="mt-4 inline-block px-6 py-2 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                    onClick={() => signUserIfCheckboxStateIsTrue(user)}>{t("buttons.register")}
                            </button>
                        </div>
                        <div className="text-lg">
                            <button onClick={() => {
                                setContent(false)
                            }}><BsArrowLeft className="inline-flex text-gray-light"/></button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default  LoginPage