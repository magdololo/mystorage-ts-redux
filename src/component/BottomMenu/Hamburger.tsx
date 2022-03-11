
import BottomHamburgerMenu from "../BottomHamburgerMenu";
const Hamburger = () => {


    return(
        <>
        <div className="inline-block flex flex-shrink justify-center">
            <div className="block border border-solid border-gray-light rounded items-center justify-center w-14 py-3" >
                <BottomHamburgerMenu />
            </div>
        </div>
        </>
    )

};
export default Hamburger;
