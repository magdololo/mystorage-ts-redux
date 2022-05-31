
import {
    fetchUserProducts,
    selectUserProductByCategoryId,
    selectUserProducts
} from "../features/products/userProductsSlice";
import {useEffect} from "react";
import {selectUser} from "../features/users/usersSlice";
import {useAppDispatch, useAppSelector} from "../app/store";
import {selectAllCategories, selectCategoryById} from "../features/categories/categoriesSlice";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";


const ListProductsOfCategory = ()=> {

    const userProducts = useAppSelector(selectUserProducts)

     let user = useAppSelector(selectUser);
    const dispatch = useAppDispatch()

    useEffect(() => {

        dispatch(fetchUserProducts(user?.uid ?? ""))

    }, [ dispatch, user])

    const {categoryPath } = useParams();

    let categories = useSelector(selectAllCategories)
    const categoryFromPath = categories.find(category => category.path === categoryPath);
    const categoryId = categoryFromPath?.id
    console.log(categoryId)
    //const userProductsInCategory = userProducts.filter((userProduct)=>userProduct.categoryId !== categoryId)
    const userProductsInCategory = useAppSelector(selectUserProductByCategoryId)
    return (
        <>
        <div className="flex justify-center">
            <ul className="pb-16">
                {userProductsInCategory.map((product) => (
                    <li key={product.productId} className="flex flex-row relative px-6 py-2 border-b border-gray-200 w-full rounded-t-lg bg-blue-600  cursor-pointer">{product.name}</li>
                ))}

        </ul>
        </div>
            </>
    )
}
export default ListProductsOfCategory;