
import BottomHamburgerMenu from "./BottomHamburgerMenu";
const Hamburger = () => {

    return(
        <>
        <div className="flex pr-1">
            <div className="block border border-solid border-gray-light rounded items-center justify-center w-14 py-3" >
                <BottomHamburgerMenu />
            </div>
        </div>
        </>
    )

};
export default Hamburger;
