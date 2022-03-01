import Switch from "react-switch";
import {useState} from "react";

const TopMenu = () => {
    const[toggleSwitch, setToggleSwitch] = useState(false);

    return(
        <>
          <div className="flex justify-center max-w-5xl mx-auto">
              <div className="w-1/2 text-lg md:text-2xl">Lista kategorii</div>
              <div className="flex items-center justify-center w-1/2 text-lg md:text-2xl">
                  <div className='mr-4'>Edytuj kategorie</div>
                  <Switch onColor="#08f" onHandleColor="#08f" height={25} width={50} onChange={() => setToggleSwitch(!toggleSwitch)} checked={toggleSwitch}/>
              </div>
          </div>
        </>
    )

}
export default TopMenu;