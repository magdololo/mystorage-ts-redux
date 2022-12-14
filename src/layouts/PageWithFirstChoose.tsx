import {useMediaQuery} from "usehooks-ts";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const PageWithFirstChoose = () => {
    const mobileLayout = useMediaQuery('(max-width: 800px)')
    const {t} = useTranslation();
    let navigate = useNavigate()

    return (
        <>
            {mobileLayout ?
                <div className={"mt-64"}>
                    <div className={"flex flex-col w-10/12 mx-auto justify-center align-middle"}>
                        <button
                            className={"w-10/12 mx-auto border border-1 border-purple-800 rounded-sm cursor-pointer px-16 py-10 font-bold text-gray-light uppercase text-md mb-4 tracking-wider"}>{t('my_storage')}</button>
                        <button
                            className={"w-10/12 mx-auto border border-1 border-purple-800 rounded-sm cursor-pointer px-16 py-10 font-bold text-gray-light uppercase text-md mt-4 tracking-wider"}>{t('my_pharmacy')}</button>
                    </div>
                </div>
                :
                <div className={"mt-80"}>
                    <div className={"flex flex-row justify-between w-6/12 mx-auto items-center"}>
                        <div className={"justify-center"}>
                            <button
                                className={"border border-2 border-purple-400 rounded-sm cursor-pointer px-20 py-12 font-bold text-gray-light uppercase text-2xl" +
                                    "transition ease-in-out duration-300 hover:scale-110 hover:border-purple-800"}
                                onClick={() => navigate("/categories")}>{t('my_storage')}
                            </button>
                        </div>
                        <div className={"justify-center"}>
                            <button
                                className={"border border-2 border-purple-400 rounded-sm cursor-pointer px-20 py-12 font-bold text-gray-light uppercase text-2xl" +
                                    "transition ease-in-out duration-300 hover:scale-110 hover:border-purple-800"}
                                onClick={() => console.log("do apteczki")}>{t('my_pharmacy')}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PageWithFirstChoose