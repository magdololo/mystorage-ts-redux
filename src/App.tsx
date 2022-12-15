import React, {useEffect, Suspense} from "react";
import {useDispatch} from 'react-redux';
import {auth, onAuthStateChanged, db} from './firebase';

import {getUserData, LoginData} from "./slices/usersSlice";
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
import TermsAndConditions from "./features/users/TermsAndConditions";
import PrivacyPolicy from "./features/users/PrivacyPolicy";
import PageWithFirstChoose from "./layouts/PageWithFirstChoose";
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
import {useTranslation} from "react-i18next";


library.add(fas)

function App() {
    initializeApp(firebaseConfig);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {i18n} = useTranslation();
    let userLanguage = i18n.language
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {

            if (user === null) {
                return
            }
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            let doExist = docSnap.exists()
            if (!doExist) {
                console.log("info")
            }
            else {
                const addDefaultCategoriesToNewUserParams: LoginData = {
                    userId: user?.uid as string,
                    userLanguage: userLanguage
                }
                dispatch(getUserData(addDefaultCategoriesToNewUserParams)
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
                    <Route path="/privacyPolicy" element={<PrivacyPolicy/>}/>
                    <Route path="/termsAndConditions" element={<TermsAndConditions/>}/>

                    :
                    <Route path="/choose" element={<PageWithFirstChoose/>}/>
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
    )
}

export default App;
