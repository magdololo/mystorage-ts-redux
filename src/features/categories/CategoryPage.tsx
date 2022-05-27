import React from "react";
import {useParams} from 'react-router-dom';
import AppTitle from "../../app/TopMenu/AppTitle";
import ReturnToCategoryList from "../../component/ReturnToCategoryList";
import {useGetCategoriesForUIDQuery} from "../api/apiSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {selectUser} from "../users/usersSlice";
import {useSelector} from "react-redux";
import AddProductForm from "../products/AddProductForm";



const CategoryPage= ()=> {
    const {categoryPath} = useParams();
    let user = useSelector(selectUser);
    console.log(categoryPath)
    const {
        data: categories = []
    } = useGetCategoriesForUIDQuery(user? user.uid : skipToken,{skip: !user})
    console.log(categories)
    const categoryFromPath = categories.find(category => category.path === categoryPath);
    const categoryName = categoryFromPath?.title
    console.log(categoryFromPath)
    console.log(categoryName)

    return(
        <>
            <div className="xs:w-full md:max-w-5xl lg:max-w-screen-md mx-auto">
            <AppTitle/>
            <div className="text-center bg-gray-50 text-gray-dark pt-20 pb-4 px-6">
                <h1 className="text-3xl font-bold mt-0 mb-6 uppercase">{categoryName}</h1>
            </div>
            <ReturnToCategoryList/>
            </div>
        </>
    )
}
export default CategoryPage;
// export const CategoryPage = ({ match }) => {
//     const { categoryName } = match.params;
//
//     const category = useSelector((state) => selectCategoryById(state, categoryId));
//
//     const selectPostsForUser = useMemo(() => {
//         const emptyArray = [];
//
//         // Return a unique selector instance for this page so that
//         // the filtered results are correctly memoized
//         return createSelector(
//             (res) => res.data,
//             (res, userId) => userId,
//
//             (data, userId) =>
//                 data ? data.filter((post) => post.user === userId) : emptyArray
//         );
//     }, []);
//     //console.log(selectPostsForUser);
//     // const postsForUser = useSelector((state) => {
//     //  const allPosts = selectAllPosts(state);
//     //   return allPosts.filter((post) => post.user === userId);
//     // });
//     const { postsForUser } = useGetPostsQuery(undefined, {
//         selectFromResult: (result) => ({
//             // We can optionally include the other metadata fields from the result here
//             ...result,
//
//             // Include a field called `postsForUser` in the hook result object,
//             // which will be a filtered list of posts
//             postsForUser: selectPostsForUser(result, userId)
//         })
//     });
//     //postsForUser = postsForUser.data;
//     //postsForUser = postsForUser.filter((post) => post.user === userId);
//     console.log(postsForUser);
//     const postTitles = postsForUser.map((post) => (
//         <li key={post.id}>
//             <Link to={`/posts/${post.id}`}>{post.title}</Link>
//         </li>
//     ));
//
//     return (
//         <section>
//             <h2>{user.name}</h2>
//
//             <ul>{postTitles}</ul>
//         </section>
//     );
// };
