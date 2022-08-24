import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import { useTranslation } from "react-i18next";
import {useForm, SubmitHandler} from "react-hook-form";

import {addNewUserToUsersCollection, login, addDefaultCategoriesToNewUser,AddDefaultCategoriesToNewUserProps} from "./usersSlice";
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
    const { t, i18n } = useTranslation();

    const userLanguage = i18n.language;
    const dispatch = useDispatch();
    let navigate = useNavigate()
    let {
        register,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>();
    const [checkboxState, setCheckboxState] =useState(false);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setCheckboxState(!checkboxState)
    }
   const [message, setMessage] = useState("");

    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        console.log(data);
        e?.preventDefault()
        if(checkboxState){
            console.log("checboxTreue")
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {

                    const user = userCredential.user;
                    const addDefaultCategoriesToNewUserParams: AddDefaultCategoriesToNewUserProps = {
                        userId: user.uid,
                        userLanguage: userLanguage
                    }
                    console.log("Registered user: ", user);
                    dispatch(addNewUserToUsersCollection({uid: user.uid, email: user.email ?? "", provider: user.providerId, didSeeGreeting: false}))
                    dispatch( addDefaultCategoriesToNewUser(addDefaultCategoriesToNewUserParams))

                    dispatch(
                        login({
                            uid: user.uid,
                            email: user.email ?? "",
                            provider: user.providerId,
                            didSeeGreeting: false
                        })
                    )
                    navigate("/categories")
                    reset();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Error ocured: ", errorCode, errorMessage);
                    switch (error.code){
                        case "auth/wrong-password":
                            setMessage ("Błedne hasło. Przypomnij hasło.")
                            break;
                        case "auth/user-not-found":
                            setMessage ("Nie masz jeszcze konta. Zarejestruj się");
                            break;
                        case "auth/email-already-in-use":
                            setMessage("Konto dla tego emaila już istnieje.");
                            break;
                        case "auth/user-disabled":
                            setMessage  ("Użytkownik zablokowany.");
                            break;
                        case "auth/weak-password":
                            setMessage ("Hasło nie spełnia reguł bezpieczeństwa.");
                            break;
                        default:
                            setMessage("Nieznany błąd. Zgłoś się do administaratora.");
                    }

                })
        } else {
            setMessage("Wymagana akceptacja regulaminu!")
            console.log("hejjjjj")
        }
        }

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };


    return (
        <>

            <div className="text-center bg-gray-50 text-gray-dark pt-20 pb-4 px-6">
                <h1 className="text-4xl font-bold mt-0 mb-6">Domowa spiżarnia</h1>
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-group mb-6">
                        <label className="form-label inline-block mb-2 text-gray-700">Email address</label>
                        <input type="email" {...register("email", {
                            required: true,
                            pattern:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

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
                        {errors.email?.type === 'required' && "Email is required"}
                        {errors.email?.type === 'pattern' && "Nieprawidłowy email"}
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
                        {errors.password?.type === 'required' && 'Hasło wymagane'}
                    </div>
                    <div className="mx-auto max-w-sm px-6">
                        <input
                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            type="checkbox" onChange={handleInputChange} checked={checkboxState} id="flexCheckDefault">
                        </input>
                        <label className="form-check-label inline-block text-gray-800 " htmlFor="flexCheckDefault">
                            Akceptuję regulamin serwisu.
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
                            zarejestruj
                        </button>
                    </div>
                    {message}
                </form>
            </div>
        </>

    );
}


export default RegisterPage;