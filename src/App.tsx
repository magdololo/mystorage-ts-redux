import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { auth, signOut, onAuthStateChanged} from './firebase';
import {saveUser, selectUser, login, logout} from "./features/users/usersSlice";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,

} from "react-router-dom";

import CategoryList from "./features/categories/CategoryList";
import BottomMenu from "./app/BottomMenu/BottomMenu";
import LoginPage from "./features/users/LoginPage";
import RegisterPage from "./features/users/RegisterPage";
import './App.css';
import {initializeApp} from "firebase/app";
import {firebaseConfig} from './firebase';
import {ToastContainer} from "react-toastify";
import CategoryPage from "./features/categories/CategoryPage";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

function App() {
    initializeApp(firebaseConfig);
    const navigate = useNavigate()
    const user = useSelector(selectUser);
    console.log(user)
    console.log("user from state", user);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                dispatch(
                    login({
                        uid: userAuth.uid,
                    })

                );
                navigate("/categories")
            } else {
                dispatch(logout());
            }
        });
    }, []);

    console.log(user)
    return (<>
            <div className="App">
                <Routes>

                    !user ?
                        < Route path="/" element={<LoginPage/>}/>
                    :
                        <Route path="/categories" element={<CategoryList/>} />

                    <Route path="/categories/:categoryPath" element={<CategoryPage/>} />

                </Routes>
            </div>
            <BottomMenu />
            <ToastContainer />
        </>
    );
}
export default App;
//export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector