import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../users/usersSlice";
import React, {useState} from "react";
  const AddProductForm = ()=>{
      const user = useSelector(selectUser)
      const uid = user? user.uid: ""
      const dispatch = useDispatch()
      const [productName, setProductName] = useState('')
      const [productCategory, setProductCategory] = useState('')
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const modalHeader = "Wybierz zdjęcie"

      return (
          <>
          </>
      )
  }
 export default AddProductForm;