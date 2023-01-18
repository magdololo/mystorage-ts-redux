import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    EntityState, PayloadAction, createSelector
} from '@reduxjs/toolkit'

import {AppDispatch, RootState} from "../app/store";
import {addDoc, collection, getDocs, query} from "firebase/firestore";
import {db} from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {notify} from "../helpers";
import i18next from "i18next";


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

export const fetchImages = createAsyncThunk('images/fetchImages', async (userId: string) => {
    try {
        const imagesStorage: Array<Image> = []
        if (userId === "")
            return imagesStorage

        let q = await query(collection(db, "users/" + userId + "/images"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            let imageDoc = doc.data() as Image;
            imageDoc.id = doc.id;
            imagesStorage.push(imageDoc);


        })
        return imagesStorage

    } catch (error) {
        console.log(error)
        return {error: error}
    }
})

export type AddNewImageParams = {
    image: Image
    notify: boolean
}
export const addNewImage = createAsyncThunk<AddNewImageParams, AddNewImageParams>("images/addNewImage",
    async (addNewImageParams: AddNewImageParams) => {
        let result = await addDoc(collection(db, "users/" + addNewImageParams.image.uid + "/images"), addNewImageParams.image);
        const newImage = {...addNewImageParams.image, id: result.id} as Image
        return {"image": newImage, "notify": addNewImageParams.notify}

    }
)

export const addNewPharmacyImage = createAsyncThunk<AddNewImageParams, AddNewImageParams>("images/addNewPharmacyImage",
    async (addNewImageParams: AddNewImageParams) => {
        let result = await addDoc(collection(db, "users/" + addNewImageParams.image.uid + "/images"), addNewImageParams.image);
        const newImage = {...addNewImageParams.image, id: result.id} as Image
        return {"image": newImage, "notify": addNewImageParams.notify}

    }
)

async function uploadCategoryPicture(fileName: string, file: File):Promise<string>{
    return new Promise(function (resolve) {
        const storageRef = ref(storage, fileName);
        console.log(storageRef)
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

export const addCategoryImage = createAsyncThunk<Image, ImageFromUser, {
    dispatch: AppDispatch
    state: RootState
}>('images/addCategoryImage', async (imageFromUser: ImageFromUser) => {
    console.log(imageFromUser.uid)
    const storageUrl = await uploadCategoryPicture(imageFromUser.newPictureName, imageFromUser.newPicture) //musimy poczekac na to co zwroci czyli storageUrl zeby dodac do imagesow i stamsad pobrac id i dopiero caly obiekt Image dodac do stamu czyli tablicy imagesów
    const result = await addDoc(collection(db, "users/" + imageFromUser.uid + "/images"), {
        url: storageUrl,
    })

    return {url: storageUrl, id: result.id} as Image
})
const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        addImage: (state, action: PayloadAction<Image>) => {
            imagesAdapter.addOne(state, action.payload);
        },
        modifyImage: (state, action: PayloadAction<Image>) => {
            imagesAdapter.setOne(state, action.payload)
        },
        removeImages: (state) => {
            imagesAdapter.removeAll(state)
        },
        removeImage: (state, action: PayloadAction<string>) => {
            imagesAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchImages.pending, (state) => {
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
            .addCase(addCategoryImage.fulfilled, (state, action) => {
                imagesAdapter.addOne(state, action.payload)
                notify(i18next.t("images.imagesSlice.addPicture"))
            })
            .addCase(addCategoryImage.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewImage.fulfilled, (state, action) => {
                imagesAdapter.addOne(state, action.payload.image)
                if (action.payload.notify)
                    notify(i18next.t("categories.categoriesSlice.notify.addCategory"))
            })
            .addCase(addNewPharmacyImage.fulfilled, (state, action) => {
                imagesAdapter.addOne(state, action.payload.image)
                if (action.payload.notify)
                    notify(i18next.t("categories.categoriesSlice.notify.addCategory"))
            })
    }
})

export const {
    selectAll: selectAllImages,
    selectById: selectImageById,
    selectIds: selectImagesIds

} = imagesAdapter.getSelectors<RootState>((state) => state.images);

export const selectImagesCurrentStorage = (currentStorageId: string) => createSelector(
    [(state: RootState) => selectAllImages(state)],
    (images) => images.filter((image) => image.uid === currentStorageId)
)
export const {addImage, removeImage, modifyImage, removeImages} = imagesSlice.actions
export default imagesSlice.reducer