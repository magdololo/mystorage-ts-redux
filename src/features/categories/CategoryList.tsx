
import React from 'react'
import { RootState } from '../../app/store'
import { useSelector } from 'react-redux'

export const CategoryList = () => {
    const categories = useSelector((state: RootState) => state.categories)

    const renderedCategories = categories.map(category => (
        <div className="mb-4">
            <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs z-10">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.webp" className="max-w-xs" alt="Louvre"/>

                    <div className="absolute top-0 right-0  w-full h-full overflow-hidden bg-fixed    ">

                            <div className="absolute bottom-0 left-0 right-0 py-2 text-center text-white font-bold text-2xl px-6 md:px-12  bg-black opacity-70 ">
                                <button type="button"
                                        className=" px-6 py-2 text-white font-bold text-md leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out "
                                        data-mdb-ripple="true" data-mdb-ripple-color="light">
                                    {category.title}
                                </button>
                            </div>

                    </div>

            </div>
        </div>
    ))

    return (


        <div className="grid grid-cols-3 gap-4 px-10">
            {renderedCategories}

                </div>

    )
}
export default CategoryList;

//