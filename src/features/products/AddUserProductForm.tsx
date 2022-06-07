import {useState} from "react";

type FormValues = {
    expireDate: Date
    productName: string
    categoryName: string
    quantity: number
    capacity: number
    unit: string
};

type AddUserProductFormProps= {
    handleClose: () => void
}
const AddUserProductForm =({handleClose}: AddUserProductFormProps)=>{
    const [productName, setProductName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [unit, setUnit] = useState("");
    const [expireDate, setExpireDate]= useState(null);
    const [quantity, setQuantity] = useState(1)
     return(
        <>
        </>
    )



}
export default AddUserProductForm;