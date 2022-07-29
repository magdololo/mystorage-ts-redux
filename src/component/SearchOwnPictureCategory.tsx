import React,{useState} from 'react';


const SearchOwnPictureCategory =()=>{
    const [newFile, setNewFile] = useState(null)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        let files = e.target.value
       console.log(files)
        let filename = files.replace(/^.*[\\\/]/, '')

    }

    return(
        <>
            <div className="flex justify-center">
                <div className="mb-3 w-96">
                    <label htmlFor="formFileMultiple" className="form-label inline-block mb-2 text-gray-700">Dodaj własne zdjęcie</label>
                    <input className="  form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                           type="file" id="formFileMultiple" onChange={onChange}/>
                </div>
            </div>
        </>
    )
}

export default SearchOwnPictureCategory;