import React, {useEffect, Suspense} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {auth, onAuthStateChanged, db} from './firebase';

import {login, selectUser, User} from "./slices/usersSlice";
import {
    Routes,
    Route,
    useNavigate, useLocation,

} from "react-router-dom";

import Loading from "./component/Loading";
import CategoryList from "./outlets/CategoryList";
import LoginPage from "./features/users/LoginPage";
import RemindPassword from "./features/users/RemindPassword";
import ProductsList from "./outlets/ProductsList";
import RegisterPage from "./features/users/RegisterPage";
import Home from "./layouts/Home";
import Root from "./layouts/Root";
import './App.css';
import {initializeApp} from "firebase/app";
import {firebaseConfig} from './firebase';
import SharesPage from "./outlets/SharesPage";
import SingleCategoryPage from "./outlets/SingleCategoryPage";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import SearchUserProductPage from "./outlets/SearchUserProductPage";
import {doc, getDoc} from "firebase/firestore";




library.add(fas)

function App() {
    initializeApp(firebaseConfig);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation()


    console.log(location)
    useEffect(() => {
        onAuthStateChanged(auth,async (user) => {

            if(user === null) {
                return
            }

            console.log(user)
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            let doExist = docSnap.exists()
            let result = docSnap.data() as User
            console.log(doExist)


            if (!doExist) {
                // content =
                //     <>
                //         <div className="bg-purple-100 py-5 px-6 mb-4 text-base text-purple-700 mb-3" role="alert">
                //             A simple secondary alert with <a href="#" className="font-bold text-puclassName800">an example link</a>.
                //             Give it a click if you like.
                //         </div>
                //     </>
                // navigate("/register")
                console.log("info")
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
        }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const user = useSelector(selectUser);
console.log(user)
    return (
        <>
        <Suspense fallback={<Loading />}>
            <div className="App">
                <Routes>

                    !user ?
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/remindPassword" element={<RemindPassword/>}/>
                    :
                    <Route path="/" element={<Root/>}>
                        <Route path="/categories" element={<CategoryList/>}/>
                        <Route path="/categories/:categoryPath" element={<SingleCategoryPage/>}/>
                        <Route path="/products" element={<ProductsList/>}/>
                        <Route path="/search" element={<SearchUserProductPage/>}/>
                        <Route path="/shares" element={<SharesPage/>}/>
                    </Route>
                </Routes>
            </div>

            </Suspense>

        </>
    );
}

export default App;
