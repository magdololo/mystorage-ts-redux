import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../users/usersSlice";
import React, {useState} from "react";
import {FormProvider, useForm, SubmitHandler, UseFormReturn, FieldValue} from 'react-hook-form';
import id from 'date-fns/locale/id';
import {UserProduct} from "./userProductsSlice";
import DatePicker from "../../component/DatePicker";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';
import { HiOutlineCalendar } from 'react-icons/hi';
import InputCategoryName from "../../component/InputCategoryName";
import InputSelectProductName from "../../component/InputSelectProductName";
import {AutocompleteWithUserProducts} from "./AutocompleteWithUserProducts";

type FormValues = {
    expireDate: Date
    productName: string
    categoryName: string
};

type AddProductFormProps={
    handleClose: ()=>void
}
  const AddProductForm = ({handleClose}: AddProductFormProps)=>{

      const user = useSelector(selectUser)
      const uid = user? user.uid: ""
      const dispatch = useDispatch()
      const {
          handleSubmit,
          formState: { errors },
      } = useForm<FormValues>();

      const onSubmit: SubmitHandler<FormValues> = data => {
          console.log(data);
          handleClose();
      }

      return (
          <>

                  <form
                      onSubmit={handleSubmit(onSubmit)}
                      className='max-w-sm mt-12 space-y-12'
                  >
                      <div className='space-y-2' id='text-input-readonly'>
                              <h3 className='text-lg'>Text Input Read Only</h3>
                          <InputCategoryName
                              id='categoryName'
                              label='Nazwa kategorii'
                              helperText='Helper text'
                              placeholder=""
                              type ="text"
                              defaultValue =''
                              readOnly = {true}
                              disabled = {true}
                          />
                      </div>
                      <hr />
                      <div className='space-y-2' id='default-datepick'>

                              <h3 className='text-lg'>Default DatePicker</h3>

                          <DatePicker
                              id='expireDate'
                              label='Label'
                              placeholder='Data ważności'
                              helperText='Helper text'

                          />
                      </div>
                      <hr />
                      <InputSelectProductName
                          id='productName'
                          label='Label'
                          helperText='Helper text'
                          placeholder='Placeholder using props'
                          isClearable={true}
                          disabled={false}
                          defaultValue=''
                          options={['Option 1', 'Option 2', 'Option 3']}

                      />
                      <hr />
                      <AutocompleteWithUserProducts/>

                      <button type='submit'

                          className='inline-flex items-center font-bold hover:text-primary-500 animated-underline'>
                          wyslij
                      </button>
                  </form>
          </>
      )
  }
 export default AddProductForm;