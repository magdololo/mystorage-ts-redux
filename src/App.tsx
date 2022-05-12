import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/users/usersSlice';
//import { onAuthStateChanged , auth} from './firebase';

import {
    BrowserRouter as Router,
    Routes,
    Route,

} from "react-router-dom";

import CategoryList from "./features/categories/CategoryList";
import BottomMenu from "./app/BottomMenu/BottomMenu";
import LoginPage from "./features/users/LoginPage";
import RegisterPage from "./features/users/RegisterPage";
//import CategoryPage from "./features/categories/CategoryPage"
import './App.css';
import {initializeApp} from "firebase/app";
import {firebaseConfig} from './firebase';

function App() {
    initializeApp(firebaseConfig);
    // const user = useSelector(selectUser);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // user is logged in, send the user's details to redux, store the current user in the state
    //             dispatch(
    //                 login({
    //                     uid: user.uid,
    //
    //                 })
    //             );
    //         } else {
    //             dispatch(logout());
    //         }
    //     });
    // }, []);
    return (
        <Router>

            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path="/" element={<CategoryList/>}/>
                    {/*<Route path="/categories/:categoryName" element={<CategoryPage/>} />*/}
                    {/*<Route exact path="/posts/:postId" component={SinglePostPage} />*/}
                    {/*<Route exact path="/editPost/:postId" component={EditPostForm} />*/}
                    {/*<Route exact path="/users" component={UsersList} />*/}
                    {/*<Route exact path="/users/:userId" component={UserPage} />*/}
                    {/*<Route exact path="/notifications" component={NotificationsList} />*/}
                </Routes>
            </div>
            <BottomMenu />
        </Router>
    );
}
export default App;
