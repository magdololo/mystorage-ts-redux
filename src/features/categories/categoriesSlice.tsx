import {
    createSlice,
    createSelector,
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    EntityState
} from '@reduxjs/toolkit'

import {AppDispatch, RootState} from "../../app/store";
import {addDoc, collection, deleteDoc, doc, getDocs, query, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const storage = getStorage();


export interface Category {
    id: string | null;
    path: Required<string>;
    url: Required<string>;
    title: Required<string>;
    user: string;
    required: string;
}
//
// export interface Image {
//     url: Required<string>;
//     id: Required<string>;
//     uid: string | null;
// }
// export interface ImageFromUser{
//     newPicture: File,
//     newPictureName: string,
//     uid: string
// }


const categoriesAdapter = createEntityAdapter<Category>({
    sortComparer: (a: Category, b: Category) => {
        let aTitle = a.title.toLowerCase();
        let bTitle = b.title.toLowerCase();

        if (aTitle < bTitle) return -1;//keep a b
        if (aTitle > bTitle) return 1;//switch places b a
        return 0

    }
});
const initialState: EntityState<Category> & {  error: null | string | undefined; status: string; currentCategory : Category | null } = categoriesAdapter.getInitialState({

    status: 'idle',
    error: null,
    currentCategory: null,



})
// images: [],images: Image[];
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (userId: string) => {


        try {
            const categories: Array<Category> = [];
            if (userId === "")
                return categories

            let q = await query(collection(db, "users/" + userId + "/categories"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {

                let categoryDoc = doc.data() as Category;
                categoryDoc.id = doc.id;
                categories.push(categoryDoc);

            })

            return categories
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)
// export const fetchImages = createAsyncThunk('categories/fetchImages', async()=>{
//     try{
//         const images: Array<Image> = []
//         let q = await query(collection(db, "images"));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//
//             let productDoc = doc.data() as Image;
//             productDoc.id = doc.id;
//             images.push(productDoc);
//
//         })
//         return images
//     } catch (error) {
//         console.log(error)
//         return {error: error}
//     }
// })
//
// export  const fetchUserImages = createAsyncThunk('categories/fetchUserImages', async(uid: string)=>{
//     try{
//         const userImages: Array<Image> = []
//         let q = await query(collection(db, "users/" + uid + "/images"));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//
//             let productDoc = doc.data() as Image;
//             productDoc.id = doc.id;
//             userImages.push(productDoc);
//
//         })
//         return userImages
//     } catch (error) {
//         console.log(error)
//         return {error: error}
//     }
// })
export const addNewCategory = createAsyncThunk<Category,Category>("categories/addNewCategory",
    async (newCategory: Category) => {
            let result = await addDoc(collection(db, "users/" + newCategory.user + "/categories"), newCategory);
            return {...newCategory, id: result.id} as Category

    }
)
export const editCategory = createAsyncThunk<Category, Category,{ //pierwsze to co zwracamy, drugie to co przyjmujemy jako parametr
     dispatch: AppDispatch
    state: RootState
}>('categories/editCategory', async (category ,thunkApi)=> {
    console.log(category)//zmieniony
    let editingCategory = await thunkApi.getState().categories.currentCategory??{} as Category
    console.log(editingCategory)//niezmieniony
    if (category.title != editingCategory.title || category.url != editingCategory.url && category.title != "produkty bez kategorii"){
        const docRef = doc(db, "users/" + category.user + "/categories", category.id!);
        await setDoc(docRef, category);
    }
    return category as Category
})

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (category: Category)=> {
     if(category.title != "produkty bez kategorii"){
    try {
        await deleteDoc(doc(db, "users/" + category.user + "/categories/" , category.id!))
        return category.id

    }    catch(error){
        console.log(error)
        return {error: error}

    }
}})

// async function uploadCategoryPicture(fileName: string, file: File):Promise<string>{
//     return new Promise(function (resolve, reject){
//         const storageRef = ref(storage, fileName);
//         const uploadTask = uploadBytesResumable(storageRef, file);
//         uploadTask.on('state_changed',
//             (snapshot) => {
//                 // Observe state change events such as progress, pause, and resume
//                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log('Upload is ' + progress + '% done');
//                 switch (snapshot.state) {
//                     case 'paused':
//                         console.log('Upload is paused');
//                         break;
//                     case 'running':
//                         console.log('Upload is running');
//                         break;
//                 }
//             },
//             (error) => {
//                 // Handle unsuccessful uploads
//                 console.log(error.code)
//                 console.log(error.message)
//             },
//             () => {
//                 // Handle successful uploads on complete
//                 // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//                 getDownloadURL(uploadTask.snapshot.ref).then ((downloadURL) => {
//                     resolve(downloadURL)}
//                 )
//             })
//     })
// }
//
// export const addCategoryImage = createAsyncThunk<Image, ImageFromUser,{
//     dispatch: AppDispatch
//     state: RootState
// }>('categories/addCategoryImage', async (imageFromUser: ImageFromUser ,thunkApi)=> {
//
//     const storageUrl = await uploadCategoryPicture( imageFromUser.newPictureName, imageFromUser.newPicture) //musimy poczekac na to co zwroci czyli storageUrl zeby dodac do imagesow i stamsad pobrac id i dopiero caly obiekt Image dodac do stamu czyli tablicy imagesów
//     const result =  await addDoc(collection(db, "users/"+ imageFromUser.uid +"/images"), {
//         url: storageUrl,
//     })
//
//     return { url: storageUrl, id: result.id} as Image
// })


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        currentCategoryChange: (state, action: PayloadAction<Category | null>) => {
            state.currentCategory = action.payload;
        }


    },
    extraReducers(builder){
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                categoriesAdapter.upsertMany(state, action.payload as Category[])
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // .addCase(fetchImages.fulfilled,(state,action)=>{
            //     state.images = action.payload as Image[]
            // })
            // .addCase(fetchUserImages.fulfilled, (state, action)=>{
            //     const newImages = state.images.concat(action.payload as Image[])
            //     state.images = newImages;
            // })
            .addCase(addNewCategory.fulfilled, categoriesAdapter.addOne )
            .addCase(editCategory.fulfilled, (state, action)=>{
                categoriesAdapter.setOne(state, action.payload)
            })
            .addCase(deleteCategory.fulfilled,(state,action)=>{
                categoriesAdapter.removeOne(state, action.payload as string)
            })
            // .addCase(addCategoryImage.fulfilled,(state, action)=>{
            //     console.log(action.payload)
            //     state.images.push(action.payload)
            //     // const userPictureUrl = action.payload.url
            //     // state.imageUrlFromUser = userPictureUrl
            // })
    }
})
export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds

} = categoriesAdapter.getSelectors<RootState>((state) => state.categories);
export const selectCategoryByPath = createSelector(
    [selectAllCategories, (state:RootState, categoryPath) => categoryPath],
    (categories, categoryPath) => categories.filter((category) => category.path === categoryPath)
);
export const selectAllCategoriesSortedByRequired = createSelector(
    selectAllCategories, categories => {
        const requiredCategory = categories.find(category => category.required === "true")
        const filteredCategories = categories.filter(category => category.required !== "true")
        return [requiredCategory, ...filteredCategories]
    }

)

export const {currentCategoryChange} = categoriesSlice.actions
export default categoriesSlice.reducer