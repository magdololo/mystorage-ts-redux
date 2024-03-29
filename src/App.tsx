import React, {useEffect, Suspense, useState} from "react";
import {useDispatch} from 'react-redux';
import {auth, onAuthStateChanged, db} from './firebase';

import {getUserData, LoginData, selectTypeStorage, selectUser} from "./slices/usersSlice";
import {
    Routes,
    Route,
    useNavigate

} from "react-router-dom";
import Loading from "./component/Loading";
import CategoryList from "./outlets/CategoryList";
import LoginPage from "./features/users/LoginPage";
import RemindPassword from "./features/users/RemindPassword";
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

import SearchUserProductPage from "./outlets/SearchUserProductPage";
import {doc, getDoc} from "firebase/firestore";
import {useTranslation} from "react-i18next";
import ProductsAndMedicines from "./outlets/ProductsAndMedicines";
import {useAppSelector} from "./app/store";
import SearchUserMedicinePage from "./outlets/SearchUserMedicinePage";
import {useLocalStorage} from "usehooks-ts";



function App() {
    initializeApp(firebaseConfig);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {i18n} = useTranslation();
    const typeStorage = useAppSelector(selectTypeStorage)
    let userLanguage = i18n.language
    const [authChanged, setAuthChanged] = useState(false)
    const user = useAppSelector(selectUser)
    console.log(user)
    const [lastStorageId] = useLocalStorage('lastStorage', user?.uid)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log(auth.currentUser)
            if (user === null) {
                return
            }
            if (authChanged) return
            setAuthChanged(true)
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            let doExist = docSnap.exists()
            if (!doExist) {
                console.log("info")
            } else {
                const loginData: LoginData = {
                    userId: user?.uid as string,
                    userLanguage: userLanguage
                }
                dispatch(getUserData(loginData)
                );
                if (!lastStorageId) {
                    navigate("/choose")
                } else {
                    navigate("/categories")
                }
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
                        <Route path="/products" element={<ProductsAndMedicines/>}/>
                        <Route path="/search" element={typeStorage === "product" ? <SearchUserProductPage/> :
                            <SearchUserMedicinePage/>}/>
                        <Route path="/shares" element={<SharesPage/>}/>

                    </Route>
                </Routes>
            </div>
        </Suspense>

        </>
    )
}

export default App;
