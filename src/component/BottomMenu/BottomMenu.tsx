import SearchInput from "./SearchInput";
import Hamburger from "./Hamburger";
import ButtonAddProduct from "./ButtonAddProduct";


const BottomMenu = () => {


    return(
        <>
                <div className='container min-w-full fixed top-auto bottom-0 bg-white z-40 justify-center'>
                    <div className=" mx-auto flex flex-nowrap flex-grow justify-center py-4  px-6  px-8x space-x-3">
                    {/*<div className="sm:flex sm:flex-nowrap sm:justify-center sm:py-4  sm:sm:px-6  sm:lg:px-8x sm:space-x-3">*/}
                        <Hamburger/>
                        <SearchInput/>
                        <ButtonAddProduct/>
                    </div>
                    {/*<div className="sm:hidden xs:flex xs:flex-nowrap  xs:py-4  xs:pl-4 xs:sm:px-6  xs:lg:px-8x xs:space-x-3">*/}
                    {/*    <Hamburger/>*/}
                    {/*    <SearchInput/>*/}
                    {/*</div>*/}
                    {/*<div className="sm:hidden xs:absolute xs:right-4 xs:bottom-16 xs:w-24 xs:h-12 xs:text-sm xs:font-bold">*/}
                    {/*    <ButtonAddProduct/>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </div>



        </>
    )

};
export default BottomMenu;