import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,

} from "react-router-dom";

import CategoryList from "./features/categories/CategoryList";
import BottomMenu from "./app/BottomMenu/BottomMenu";
import LoginPage from"./features/users/LoginPage";
import './App.css';

function App() {
    return (
        <Router>

            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/" element={<CategoryList/>}/>

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
