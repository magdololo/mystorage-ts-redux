import {useAppSelector} from "../app/store";
import {selectTypeStorage} from "../slices/usersSlice";
import ProductsList from "./ProductsList";
import MedicinesList from "./MedicinesList";

const ProductsAndMedicines = () => {

    const typeStorage = useAppSelector(selectTypeStorage)
    return (
        <>
            {typeStorage === "product" ?
                <ProductsList/> :
                <MedicinesList/>
            }
        </>
    )
}
export default ProductsAndMedicines
