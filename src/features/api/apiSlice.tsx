import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {db} from "../../firebase";
import { getDocs, collection, query, addDoc} from "firebase/firestore";
import {Category} from "../categories/categoriesSlice";
import slugify from "slugify";
// Define our single API slice object
export const api = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Category', 'User'],
    endpoints: (build) => ({
        getCategoriesForUID: build.query<Category[],string>({
            async queryFn(uid, queryApi, extraOptions, baseQuery) {
                try {
                    const categories: Array<Category> = [];
                    if (uid === "")
                        return {
                            data: categories
                        }

                    let q = await query(collection(db, "users/" + uid + "/categories"));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {

                        let categoryDoc = doc.data() as Category;
                        // let category: Category = {
                        //     title: categoryDoc.title,
                        //     path: categoryDoc.path,
                        //     url: categoryDoc.url,
                        //     id: null
                        // }
                        categoryDoc.id = doc.id;
                        categories.push(categoryDoc);

                    })
                    return {data: categories}
                } catch (error) {
                    console.log(error)
                    return {error: error}
                }
            },
            providesTags: ['Category'],
        }),
        addNewCategory: build.mutation<Category,Partial<Category>>({
            async queryFn(newCategory, queryApi, extraOptions, baseQuery) {
                    try {
                        let result = await addDoc(collection(db, "users/" + newCategory.user + "/categories"), newCategory);

                        return {data:{...newCategory,id: result.id} as Category}
                    } catch (error) {
                        console.log(error)
                        return {error: error}
                    }
            },
            invalidatesTags: ['Category'],
        }),

    }),
})
export const  {
    useGetCategoriesForUIDQuery,
    useAddNewCategoryMutation
}= api;