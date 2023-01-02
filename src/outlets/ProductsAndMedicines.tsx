import {useAppSelector} from "../app/store";
import {selectCurrentStorage, selectUser} from "../slices/usersSlice";
import ProductsList from "./ProductsList";
import MedicinesList from "./MedicinesList";

const ProductsAndMedicines = () => {
    const user = useAppSelector(selectUser)
    const currentStorageId = useAppSelector((selectCurrentStorage))
    console.log(user?.uid)
    console.log(currentStorageId)
    return (
        <>
            {currentStorageId === user?.uid ?
                <ProductsList/> :
                currentStorageId === "pharmacy" + user?.uid ?
                    <MedicinesList/> :
                    null}
        </>
    )
}
export default ProductsAndMedicines
