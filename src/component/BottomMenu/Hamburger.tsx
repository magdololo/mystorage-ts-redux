import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';
const Hamburger = () => {
    const [open, setOpen] = useState(false);

    return(
        <>

            <div className="block border border-solid border-gray-light rounded px-4 py-4">
                <FiMenu className='text-gray-light self-center' onClick={()=> setOpen(!open)}/>
            </div>

        </>
    )

};
export default Hamburger;