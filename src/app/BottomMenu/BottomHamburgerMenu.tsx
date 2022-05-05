import {useState} from "react";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import {AiOutlineMenu} from "react-icons/ai";

const BottomHamburgerMenu = () => {
    const [isOpen, setIsOpen] =useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    return (
        <>

            <AiOutlineMenu className='text-gray-light text-center mx-auto text-3xl' onClick={toggleDrawer} />
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                //className='bla bla bla '
            >
                <div>Hello World</div>
            </Drawer>

        </>
    );
};
export default BottomHamburgerMenu;