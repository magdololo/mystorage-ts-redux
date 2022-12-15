import StoragesUsersList from "./StoragesUsersList";
import PharmaciesUsersList from "./PharmaciesUsersList";

const ToggleSections = () => {

    return (
        <>
            <div className="flex flex-col ">
                <StoragesUsersList/>
                <PharmaciesUsersList/>
            </div>
        </>
    )
}

export default ToggleSections;