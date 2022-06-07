import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Controller, useForm, useFormContext} from 'react-hook-form';
import { HiOutlineCalendar } from 'react-icons/hi';



type DatePickerProps = {
    id: string
    label:string
    placeholder:string
    helperText:string

}

export default function DatePicker({

                                       label,
                                       placeholder,
                                       helperText,
                                       id

                                   }:DatePickerProps) {
    const {
        formState: { errors },
        control,
    } = useForm();

    // If there is a year default, then change the year to the props
    const defaultDate = new Date();


    return (
        <div className='relative'>
            <label htmlFor={id} className='block text-sm font-normal text-gray-700'>
                {label}
            </label>

            <Controller
                control={control}
                name={id}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <div className='relative mt-1'>
                            <ReactDatePicker
                                name={id}
                                onBlur={onBlur}
                                onChange={onChange}
                                selected={value}
                                className='focus:ring-primary-500 border-gray-300 focus:border-primary-500'
                                placeholderText={placeholder}
                                aria-describedby={id}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode='select'
                                openToDate={value ?? defaultDate}
                                dateFormat='dd/MM/yyyy'


                            />
                            <HiOutlineCalendar className='absolute text-lg text-gray-500 transform -translate-y-1/2 pointer-events-none right-4 top-1/2' />
                        </div>
                        <div className='mt-1'>
                            {helperText !== '' && (
                                <p className='text-xs text-gray-500'>{helperText}</p>
                            )}
                            {errors[id] && (
                                <span className='text-sm text-red-500'>
                  {errors[id].message}
                </span>
                            )}
                        </div>
                    </>
                )}
            />
        </div>
    );
}
