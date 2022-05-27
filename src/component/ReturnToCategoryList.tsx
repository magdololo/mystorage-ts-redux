import {BsArrowLeft} from "react-icons/bs";
import {Link} from "react-router-dom";

const ReturnToCategoryList = () => {

    return(
        <>
        <Link to={"/categories"}>
            <div className ="flex flex-row flex-nowrap  w-1/2">

               <div className="flex-none "><BsArrowLeft className="inline-flex"/></div>

                <div className="flex-1 text-left ml-2"><p>Wróć do listy kategorii</p></div>

            </div>
        </Link>
        </>
    );

};

export default ReturnToCategoryList;