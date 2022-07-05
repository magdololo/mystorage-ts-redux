import AppTitle from "../../app/TopMenu/AppTitle";
import ReturnToCategoryList from "../../component/ReturnToCategoryList";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Modal} from "../../component/Modal/Modal";
import EditProductForm from "./EditProductForm";
import BottomMenu from "../../app/BottomMenu/BottomMenu";
import {useModal} from "../../component/Modal/UseModal";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    changeProductQuantity,
    ChangeQuantity,
    deleteUserProduct,
    editProduct, searchProduct, selectUserProductById,
    selectUserProducts,
    UserProduct
} from "./userProductsSlice";
import {Link} from "react-router-dom";
import {selectAllCategories} from "../categories/categoriesSlice";


const SearchUserProductPage= ()=>{
    const dispatch = useAppDispatch()
    const userProducts = useAppSelector(selectUserProducts);
    let searchProductId = useAppSelector(state=> state.userProducts.searchProduct)
    let searchUserProductFromSelect = useAppSelector((state) => selectUserProductById(state, searchProductId??"")) ?? {}as UserProduct
    console.log(searchUserProductFromSelect)
    const searchInputValue= useAppSelector(state=>state.userProducts.searchProductByString)

    const categories = useAppSelector(selectAllCategories)
    console.log("searchuserproductfromselect")
    console.log(searchUserProductFromSelect)
    console.log("searchInputvalue")
    console.log(searchInputValue)
    let searchProducts: Array<UserProduct>=[]

    if(searchInputValue ){
        const searchUserProductsFromInput = userProducts.filter(userProduct=>userProduct.name.startsWith(searchInputValue??""))
        console.log(searchUserProductsFromInput)
        searchUserProductsFromInput.forEach((searchUserProduct)=>searchProducts.push(searchUserProduct))


    } else {
        searchProducts.push(searchUserProductFromSelect)
    }
    console.log(searchProducts)

    let [todayDate] = useState(new Date());
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = "Edytuj produkt"

    const chooseEditProduct = (userProduct: UserProduct) =>{
        handleShown()
        let editingProduct = dispatch(editProduct(userProduct))

    }


    const increment = (userProduct: UserProduct) => {
        const changeQuantityProduct: ChangeQuantity = {
            userProduct: userProduct,
            changeQuantity: "increment"
        }
        dispatch(changeProductQuantity(changeQuantityProduct))
    }
    const decrement = (userProduct: UserProduct)  => {
        const changeQuantityProduct: ChangeQuantity = {
            userProduct: userProduct,
            changeQuantity: "decrement"
        }
        dispatch(changeProductQuantity(changeQuantityProduct))
    }
    const deleteUserOneProduct =  (userProduct: UserProduct)  => {
        dispatch(deleteUserProduct(userProduct))
    }

    let content;

    const searchProductsWithCategory = searchProducts.map(searchProduct=>{
        const searchProductCategory = categories.find(category=>category.id === searchProduct.categoryId)
        return { ...searchProduct, categoryPath: searchProductCategory?.path, categoryTitle: searchProductCategory?.title}
    })
    console.log('producty w search')
console.log(searchProductsWithCategory)
    if(searchProductsWithCategory.length > 0){
       content =
       content =
           <ul className="pb-8 w-full relative flex flex-col">
           {searchProductsWithCategory.map((product) =>
               <li key={product.id} className="flex flex-row relative px-6 py-6 border-b border-gray-extraLight w-full rounded-t-lg cursor-pointer">

                   <div className = "flex flex-row flex-nowrap w-full ">

                       <div className="flex-auto flex-col relative w-full flex-col sm:w-6/12   md:w-8/12 relative">

                           <div
                               className= "text-md capitalize align-baseline text-gray  font-bold sm:text-xl">{product.name}
                           </div>
                           <div
                               className={ (product.expireDate !== null && product?.expireDate > todayDate ) ? "text-gray-light" : "text-red font-bold"}>
                               {product.expireDate ? product.expireDate.toISOString().substring(0,10) : ""}
                           </div>
                           <div
                               className="text-gray-light">{product.capacity}{product.unit}
                           </div>
                           <div className="text-gray-light text-md">Kategoria: <Link to={"/categories/"+product.categoryPath}>
                               <span className="capitalize text-md align-baseline text-gray font-bold">{product.categoryTitle}</span></Link>
                           </div>
                       </div>


                       <div className="flex flex-auto flex-nowrap  relative sm:w-6/12 md:w-8/12 ">
                           <div className="flex flex-row absolute right-0 self-center">

                               <FontAwesomeIcon className="text-md text-blue-500 px-4 sm:text-xl" icon={faPlus} onClick={()=>increment(product)}/>
                               <span className="text-md text-blue-800 px-2 sm:text-xl font-bold ">{product.quantity}</span>
                               <FontAwesomeIcon className="text-md text-blue-500 border-blue-400 border-solid border-r px-4 sm:text-xl" icon={faMinus} onClick={() => decrement(product)}/>
                               <FontAwesomeIcon className="text-md text-blue-800 border-blue-400 border-solid border-r px-4 sm:text-xl" icon={faTrash} onClick={()=>deleteUserOneProduct(product)}/>
                               <FontAwesomeIcon className="text-md text-blue-800 px-4 sm:text-xl" icon={faPen}  onClick={()=>chooseEditProduct(product) }/>

                           </div>

                       </div>
                   </div>
               </li>
           )}
       </ul>
    } else {
        content = <h2>Brak wyników wyszukiwania.</h2>
    }
    return(
        <>
            <div className="xs:max-w-xl md:max-w-2xl lg:max-w-screen-md mx-auto">
                <AppTitle/>
                <div className="text-center text-gray-dark pt-2 pb-2px-6">
                    <h1 className="text-2xl font-bold text-gray-light mt-0 mb-6 capitalize">Wyniki wyszukiwania</h1>
                </div>
                <ReturnToCategoryList/>
                <div className="flex mt-2">
                    {content}
                </div>

                <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}  modalContent={<EditProductForm handleClose={handleClose} isShown={isShown} />}/>

            </div>
            <BottomMenu />
        </>
    )
}

export default SearchUserProductPage;