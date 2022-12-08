import {useMediaQuery} from "usehooks-ts";

const PageWithFirstChoose = () => {
    const mobileLayout = useMediaQuery("max-width: 800px")

    return (
        <>
            {mobileLayout ?
                <div className={"flex flex-col w-10/12"}>
                    <button className={"w-full px-4"}>Spiżarnia</button>
                    <button className={"w-full px-4"}>Apteka</button>
                </div>
                :
                <div>
                    <div className={"flex flex-row align-middle justify-center w-8/12"}>
                        <button className={"w-1/2 px-2"}>Spiżarnia</button>
                        <button className={"w-1/2 px-2"}>Apteka</button>
                    </div>
                </div>
            }
        </>
    )
}

export default PageWithFirstChoose