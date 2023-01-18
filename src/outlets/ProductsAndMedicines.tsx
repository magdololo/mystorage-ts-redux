import {useAppSelector} from "../app/store";
import {selectCurrentStorage, selectUser} from "../slices/usersSlice";
import ProductsList from "./ProductsList";
import MedicinesList from "./MedicinesList";

const ProductsAndMedicines = () => {
    const user = useAppSelector(selectUser)
    const currentStorageId = useAppSelector(selectCurrentStorage)
    console.log(user?.uid)
    console.log(currentStorageId)
    return (
        <>
            {currentStorageId?.startsWith('pharmacy') ?
                <MedicinesList/> :
                <ProductsList/>
            }
        </>
    )
}
export default ProductsAndMedicines
