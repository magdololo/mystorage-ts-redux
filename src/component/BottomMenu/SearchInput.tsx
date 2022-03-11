
const SearchInput = () => {


    return(
        <>

            <div className="flex ">
                <div className="
                            flex
                            flex-row
                            items-center
                            justify-between
                            px-4
                            py-2.5
                            border
                            border-solid
                            border-gray-light
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:outline-none
                            ">
                    <span className=' text-gray-light block m-0'>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4"
                             role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                        </svg>
                    </span>
                    <input
                        type="search"
                        className="
                            py-2 px-2
                            form-control
                            block
                            text-base
                            font-normal
                            text-gray-700
                            bg-white
                            focus:outline-none
                            "
                        id="exampleSearch"
                        placeholder="Wyszukaj produkt"
                    />
                    <div/>
                </div>
            </div>
        </>
    )

};
export default SearchInput;