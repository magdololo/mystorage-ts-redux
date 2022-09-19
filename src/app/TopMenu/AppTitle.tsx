import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const AppTitle = () => {
    const { t, i18n } = useTranslation();
    console.log(i18n.language)

    return(
        <>
            <div className="w-screen-xs mx-auto max-w-screen-lg relative text-center bg-gray-50 text-gray pt-10 pb-4 px-6 ">
                <h1 className="text-2xl font-bold mt-0 mb-6 sm:text-3xl md:text-4xl">{t("app_title")}</h1>
                <div className={"absolute top-8 right-4 md:right-12" }><FontAwesomeIcon className="text-xl md:text-2xl text-gray-mediumLight px-4" icon={faBell}/></div>
            </div>

        </>
    )

}
export default AppTitle;