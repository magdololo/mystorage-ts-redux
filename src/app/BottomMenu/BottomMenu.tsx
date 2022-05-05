import SearchInput from "./SearchInput";
import Hamburger from "./Hamburger";
import ButtonAddProduct from "./ButtonAddProduct";


const BottomMenu = () => {


    return(
        <>
                <div className='w-screen mx-auto fixed top-auto bottom-0 bg-white z-40
                                sm:py-2 sm:px-6 lg:px-8 '>
                    <div className="max-w-xs px-4 mx-0 flex flex-nowrap flex-grow flex-shrink justify-start py-4 space-x-3
                                    sm:px-2 sm:max-w-xs sm:mx-auto sm:justify-center">
                        <Hamburger/>
                        <SearchInput/>
                        <ButtonAddProduct/>
                    </div>
                </div>



        </>
    )

};
export default BottomMenu;