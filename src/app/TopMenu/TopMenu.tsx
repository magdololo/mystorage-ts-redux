import Switch from "react-switch";
import {useState} from "react";

const TopMenu = () => {
    const[toggleSwitch, setToggleSwitch] = useState(false);

    return(
        <>
            <div className="text-center text-gray pt-2 pb-4 px-6">
                <button type="button"
                        className="inline-block px-6 py-2.5 border-2 border-purple text-purple font-bold text-md leading-tight rounded hover:scale-110 transition duration-300 ease-in-out focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        data-mdb-ripple="true" data-mdb-ripple-color="light">
                    Edytuj kategorie
                </button>

            </div>
        </>
    )

}
export default TopMenu;
