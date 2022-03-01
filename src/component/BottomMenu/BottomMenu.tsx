import SearchInput from "./SearchInput";
import Hamburger from "./Hamburger";
import ButtonAddProduct from "./ButtonAddProduct";

const BottomMenu = () => {


    return(
        <>
                <div className=' flex flex-nowrap w-screen m-auto py-4 px-4 sm:px-6  lg:px-8 space-x-7 absolute bottom-0 bg-white z-40 justify-center'>

                        <Hamburger/>
                        <SearchInput/>
                        <ButtonAddProduct/>

                </div>



        </>
    )

};
export default BottomMenu;