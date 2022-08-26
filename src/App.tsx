import React, {useEffect, Suspense} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {auth, signOut, onAuthStateChanged, signInWithPopup, db, GoogleAuthProvider } from './firebase';

import {selectUser, login, logout, User} from "./features/users/usersSlice";
import {
    Routes,
    Route,
    useNavigate, useLocation,

} from "react-router-dom";

import Loading from "./component/Loading";
import CategoryList from "./features/categories/CategoryList";
import CategoryListScreenEn from "./features/categories/CategoryListScreenEn"
import LoginPage from "./features/users/LoginPage";
import RemindPassword from "./features/users/RemindPassword";
import ProductsList from "./features/products/ProductsList";
import RegisterPage from "./features/users/RegisterPage";
import Home from "./features/api/Home";

import './App.css';
import {initializeApp} from "firebase/app";
import {firebaseConfig} from './firebase';
import {ToastContainer} from "react-toastify";
import CategoryPage from "./features/categories/CategoryPage";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import SearchUserProductPage from "./features/products/SearchUserProductPage";
import {doc, getDoc} from "firebase/firestore";


library.add(fas)

function App() {
    initializeApp(firebaseConfig);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation()
    const provider = new GoogleAuthProvider();

    let content;
    console.log(location)
    useEffect(() => {


        onAuthStateChanged(auth,async (user) => {

            if(user === null) {
                dispatch(logout())
                navigate("/")
                return
            }

            console.log(user)
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            let doExist = docSnap.exists()
            let result = docSnap.data() as User
            console.log(doExist)
            // let result = await signInWithPopup(auth, provider)
            // // This gives you a Google Access Token. You can use it to access the Google API.
            //
            // const user = result.uid;

            if (!doExist) {
                content =
                    <>
                        <div className="bg-purple-100 py-5 px-6 mb-4 text-base text-purple-700 mb-3" role="alert">
                            A simple secondary alert with <a href="#" className="font-bold text-puclassName800">an example link</a>.
                            Give it a click if you like.
                        </div>
                    </>
                navigate("/register")

            }
            else {
                dispatch(
                    login({
                        uid: result.uid,
                        email: result.email ?? "",
                        provider: "",
                        didSeeGreeting: result.didSeeGreeting
                    })
                );
                navigate("/categories")
            }
        })
        }, []);

    return (
        <>
        <Suspense fallback={<Loading />}>
            <div className="App">
                {content}
                <Routes>

                    !user ?
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/remindPassword" element={<RemindPassword/>}/>
                    :
                    <Route path="/categories" element={<CategoryListScreenEn/>}/>
                    <Route path="/categories/:categoryPath" element={<CategoryPage/>}/>
                    <Route path="/products" element={<ProductsList/>}/>
                    <Route path="/search" element={<SearchUserProductPage/>}/>
                </Routes>
            </div>
            </Suspense>
        </>
    );
}

export default App;
