const AppTitle = () => {
    let appTitle: string;
    appTitle ="Domowa spiżarnia"
    return(
        <>
            <div className="text-center bg-gray-50 text-gray-dark pt-10 pb-4 px-6 ">
                <h1 className="text-4xl font-bold mt-0 mb-6">{appTitle}</h1>
            </div>
        </>
    )

}
export default AppTitle;