import React from "react";

const CategoryPage = () => {

    return(
        <>
        </>
    )
}
export default CategoryPage;
// export const CategoryPage = ({ match }) => {
//     const { userId } = match.params;
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
