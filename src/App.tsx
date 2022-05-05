import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,

} from "react-router-dom";
import AppTitle from "./app/TopMenu/AppTitle";
import TopMenu from "./app/TopMenu/TopMenu";
import CategoryList from "./features/categories/CategoryList";
import BottomMenu from "./app/BottomMenu/BottomMenu";

import './App.css';

function App() {
    return (
        <Router>
            <AppTitle />
            <TopMenu />
            <div className="App">
                <Routes>
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
