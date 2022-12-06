import StoragesList from "./StoragesList";
import PharmacyList from "./PharmacyList";

const ToggleSections= ()=>{

    return(
        <>
            <div className="flex flex-col ">
                <StoragesList/>
                <PharmacyList/>
            </div>
        </>
    )
}

export default ToggleSections;