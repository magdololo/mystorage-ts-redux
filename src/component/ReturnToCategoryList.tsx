import {BsArrowLeft} from "react-icons/bs";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const ReturnToCategoryList = () => {
    const { t } = useTranslation();
    return(
        <>
        <Link to={"/categories"}>
            <div className ="flex flex-row flex-wrap  ml-4 sm:w-1/2">

               <div className="flex-none "><BsArrowLeft className="inline-flex text-gray-light"/></div>

                <div className="flex-1 text-left ml-2 text-gray-light"><p>{t("returnToCategoryList")}</p></div>

            </div>
        </Link>
        </>
    );

};

export default ReturnToCategoryList;