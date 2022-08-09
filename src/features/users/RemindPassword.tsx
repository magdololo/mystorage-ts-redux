import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {auth, sendPasswordResetEmail} from "../../firebase";

const RemindPassword=()=>{
    const navigate = useNavigate()
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{
        email: string,
        password: string
    }>();
    const [messageAfterSendPassword, setMessageAfterSendPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    const navigateToLoginPage =()=>{
        navigate("/")
    }

    const onSubmit = handleSubmit((data:{email:string}) => {

         sendPasswordResetEmail(auth, data.email)
            .then(()=> {
                setMessageAfterSendPassword(true)
                reset({email: ""})
                setTimeout(navigateToLoginPage, 3000)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode === "auth/user-not-found"){
                    setErrorMessage("User z podanym email-em nie istnieje w aplikacji. Sprubój inny email.")
                    reset({email:""})
                }

            });
    });

    return(
        <>
            <div className="text-center text-gray-dark pt-20 pb-4 px-6">
            <h1 className="text-4xl font-bold mt-0 mb-6">Domowa spiżarnia</h1>
                <h3 className="text-gray-700 my-6 text-2xl">Odzyskaj konto</h3>
           </div>
            <div className="block p-6  bg-white max-w-sm mx-auto">
            <h2 className="text-gray-light my-8 text-xl"> Wpisz adres e-mail konta do którego chcesz odzyskać dostęp.</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group mb-6">
                    {/*<label className="form-label inline-block mb-2 text-gray-700">Email address</label>*/}
                    <input {...register("email",{ required: true, pattern:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, })}
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
                    {errors.email?.type === 'required' && "Email is required"}
                    {errors.email?.type === 'pattern' && "Nieprawidłowy email"}
                    {errorMessage!="" && <p>{errorMessage}</p>}
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
                                          ease-in-out">Dalej</button>
                </div>


            </form>
                {messageAfterSendPassword ?
                    <div className="bg-purple-100 rounded-lg py-5 px-6 mb-4 text-purple-700 mb-3 text-gray-700 my-6 text-2xl" role="alert">
                        Na twój adres email wysłaliśmy hasło do restu konta!</div> : ""
                }
            </div>

        </>
    )
}
export default RemindPassword