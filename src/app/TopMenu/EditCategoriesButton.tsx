
import {useTranslation} from "react-i18next";
import {MainComponent} from "./TopMenu.components"

type TopMenuProps ={
    toggleEdit: ()=>void
    toggleValue: boolean
}
const EditCategoriesButton = ({toggleEdit, toggleValue}: TopMenuProps) => {
    const { t } = useTranslation();

    return(
        <>
            <MainComponent>
            <div className="max-w-xs text-center text-gray pt-2 pb-6 px-6 mx-auto">
                <button type="button"
                        className=" px-4 py-2.5 w-36 border-2 border-purple text-purple-800 font-bold text-sm leading-tight uppercase  shadow-xs rounded hover:scale-110 transition duration-300 ease-in-out focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        data-mdb-ripple="true" data-mdb-ripple-color="light" onClick={()=>toggleEdit()}>{toggleValue ? t("buttons.categoryListButton") : t("buttons.editCategoriesButton")}

                </button>
            </div>
            </MainComponent>
        </>
    )

}
export default EditCategoriesButton;
