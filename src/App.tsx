import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {auth, signOut, onAuthStateChanged} from './firebase';
import {saveUser, selectUser, login, logout} from "./features/users/usersSlice";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate, useLocation,

} from "react-router-dom";

import CategoryList from "./features/categories/CategoryList";
import BottomMenu from "./app/BottomMenu/BottomMenu";
import LoginPage from "./features/users/LoginPage";
import ProductsList from "./features/products/ProductsList";
import RegisterPage from "./features/users/RegisterPage";
import './App.css';
import {initializeApp} from "firebase/app";
import {firebaseConfig} from './firebase';
import {ToastContainer} from "react-toastify";
import CategoryPage from "./features/categories/CategoryPage";

import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'

library.add(fas)

function App() {
    initializeApp(firebaseConfig);
    const navigate = useNavigate()
    const user = useSelector(selectUser);
    console.log(user)
    const dispatch = useDispatch();
    const location = useLocation()
    console.log(location)
    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                dispatch(
                    login({
                        uid: userAuth.uid,
                        email: userAuth.email ?? "",
                        provider: userAuth.providerId
                    })
                );
                console.log("navigate to categories")
                navigate("/categories")
            } else {
                dispatch(logout());
                navigate("/")
            }
        });
    }, []);


    console.log(user)
    return (<>
            <div className="App">
                <Routes>

                    !user ?
                    < Route path="/" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    :
                    <Route path="/categories" element={<CategoryList/>}/>

                    <Route path="/categories/:categoryPath" element={<CategoryPage/>}/>
                    <Route path="/products" element={<ProductsList/>}/>

                </Routes>
            </div>

        </>
    );
}

export default App;
//export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector