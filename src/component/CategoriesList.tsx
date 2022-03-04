export interface Category{
    id: string;
    title: string;
    path: string;
    url: string;
}
let categories: Category[];
const CategoriesList = ({ Category }: any) => {

     categories=[
        {
            title: 'słodycze',
            path: 'słodycze',
            url: './../images/candies-g5fd12865c_1280.jpg',
            id: '1'
        },
        {
            title: 'mąka kasza ryż',
            path: 'mąka_kasza_ryż',
            url: './../images/candies-g5fd12865c_1280.jpg',
            id: '2'
        },
        {
            title: 'oleje i oliwy',
            path: 'oleje_i_oliwy',
            url: './../images/candies-g5fd12865c_1280.jpg',
            id: '3'
        },
        {
            title: 'makarony',
            path: 'makarony',
            url: './../images/candies-g5fd12865c_1280.jpg',
            id: '4'
        },
        {
            title: 'kawa herbata',
            path: 'skawa_herbata',
            url: './../images/candies-g5fd12865c_1280.jpg',
            id: '5'
        },
        {
            title: 'kawa herbata',
            path: 'skawa_herbata',
            url: './../images/candies-g5fd12865c_1280.jpg',
            id: '6'
        },
        {
            title: 'kawa herbata',
            path: 'skawa_herbata',
            url: './../images/candies-g5fd12865c_1280.jpg',
            id: '7'
        },
        {
            title: 'kawa herbata',
            path: 'skawa_herbata',
            url: './../images/candies-g5fd12865c_1280.jpg',
            id: '8'
        }
    ]
    return(
        <>
            <div className='h-5/6 flex flex-wrap max-w-5xl mx-auto py-16 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8 overflow-y-scroll scrollbar-hide'>
                <ul className='grid grid-cols-2 md:grid-cols-3 gap-1.5 overflow-y-auto' >
                    {categories.map((category) => (
                        <li key={category.id} className=" flex relative ">

                            <img className="h-auto w-full object-cover object-center" src={category.url} alt="" />
                            <span className='m-0 font-normal text-md sm:text-xl leading-10 text-white  absolute left-0 right-0 bottom-0 h-1/3 inline-flex capitalize items-center justify-center bg-black bg-opacity-60 z-40'>
                                {category.title}
                            </span>
                            <span className="h-full bg-black bg-opacity-40 z-20 absolute left-0 right-0 bottom-0 ">
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )

}
export default CategoriesList;