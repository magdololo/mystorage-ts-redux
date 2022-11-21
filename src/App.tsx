import React, {useEffect, Suspense} from "react";
import {useDispatch} from 'react-redux';
import {auth, onAuthStateChanged, db} from './firebase';

import {login, User} from "./slices/usersSlice";
import {
    Routes,
    Route,
    useNavigate,

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
import { doc, getDoc} from "firebase/firestore";

library.add(fas)

function App() {
    initializeApp(firebaseConfig);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth,async (user) => {

            if(user === null) {
                return
            }
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            let doExist = docSnap.exists()
            let result = docSnap.data() as User


            if (!doExist) {
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
