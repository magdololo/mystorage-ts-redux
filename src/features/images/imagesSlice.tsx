import {
    createSlice,
    createSelector,
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    EntityState
} from '@reduxjs/toolkit'

import {AppDispatch, RootState} from "../../app/store";
import {addDoc, collection, getDocs, query, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const storage = getStorage();

export interface Image {
    url: Required<string>;
    id: Required<string>;
    uid: string | null;
}
export interface ImageFromUser{
    newPicture: File,
    newPictureName: string,
    uid: string
}

const imagesAdapter = createEntityAdapter<Image>()
const initialState: EntityState<Image>& { error: null | string | undefined; status: string; imageFromUser: ImageFromUser | null; } = imagesAdapter.getInitialState({
    status: 'idle',
    error: null ,
    imageFromUser: null

})

export const fetchImages = createAsyncThunk('images/fetchImages', async(uid: string)=>{
    try{
        const images: Array<Image> = []
        let q = await query(collection(db, "images"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            let productDoc = doc.data() as Image;
            productDoc.id = doc.id;
            images.push(productDoc);


        })
        let query_2 = await query(collection(db, "users/" + uid + "/images"));
        const query_Snapshot = await getDocs(query_2);
        query_Snapshot.forEach((doc) => {

            let productDoc = doc.data() as Image;
            productDoc.id = doc.id;
            images.push(productDoc);

        })

        return images
    } catch (error) {
        console.log(error)
        return {error: error}
    }
})

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
async function uploadCategoryPicture(fileName: string, file: File):Promise<string>{
    return new Promise(function (resolve, reject){
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error.code)
                console.log(error.message)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then ((downloadURL) => {
                    resolve(downloadURL)}
                )
            })
    })
}

export const addCategoryImage = createAsyncThunk<Image, ImageFromUser,{
    dispatch: AppDispatch
    state: RootState
}>('images/addCategoryImage', async (imageFromUser: ImageFromUser ,thunkApi)=> {

    const storageUrl = await uploadCategoryPicture( imageFromUser.newPictureName, imageFromUser.newPicture) //musimy poczekac na to co zwroci czyli storageUrl zeby dodac do imagesow i stamsad pobrac id i dopiero caly obiekt Image dodac do stamu czyli tablicy imagesów
    const result =  await addDoc(collection(db, "users/"+ imageFromUser.uid +"/images"), {
        url: storageUrl,
    })

    return { url: storageUrl, id: result.id} as Image
})
const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchImages.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.status = 'succeeded'
                imagesAdapter.upsertMany(state, action.payload as Image[])
            })
            .addCase(fetchImages.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addCategoryImage.fulfilled, imagesAdapter.addOne )
            .addCase(addCategoryImage.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })

    }
})

export const {
    selectAll: selectAllImages,
    selectById: selectImageById,
    selectIds: selectImagesIds

} = imagesAdapter.getSelectors<RootState>((state) => state.images);
export default imagesSlice.reducer