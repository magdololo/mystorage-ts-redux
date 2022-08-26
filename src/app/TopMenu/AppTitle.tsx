import {useTranslation} from "react-i18next";

const AppTitle = () => {
    const { t, i18n } = useTranslation();
    console.log(i18n.language)

    return(
        <>
            <div className="text-center bg-gray-50 text-gray-dark pt-10 pb-4 px-6 ">
                <h1 className="text-4xl font-bold mt-0 mb-6">{t("app_title")}</h1>
            </div>
        </>
    )

}
export default AppTitle;