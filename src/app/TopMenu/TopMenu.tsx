// import Switch from "react-switch";
// import {useState} from "react";
import {useTranslation} from "react-i18next";

type TopMenuProps ={
    toggleEdit: ()=>void
    toggleValue: boolean
}

const TopMenu = ({toggleEdit, toggleValue}: TopMenuProps) => {

    const { t, i18n } = useTranslation();
    console.log(i18n.language)

    return(
        <>
            <div className="w-screen mx-auto">
            <div className="max-w-xs text-center text-gray pt-2 pb-4 px-6 mx-auto">
                <button type="button"
                        className="inline-block px-6 py-2.5 border-2 border-purple text-purple font-bold text-md leading-tight rounded hover:scale-110 transition duration-300 ease-in-out focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        data-mdb-ripple="true" data-mdb-ripple-color="light" onClick={()=>toggleEdit()}>{toggleValue ? t("buttons.categoryListButton") : t("buttons.editCategoriesButton")}

                </button>
            </div>
            </div>
        </>
    )

}
export default TopMenu;
