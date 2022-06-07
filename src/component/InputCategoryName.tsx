import {useForm, useFormContext} from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';


type InputProps = {
    id: string
    label: string
    placeholder: string
    helperText:string
    type:string
    defaultValue:string
    readOnly: boolean
    disabled:boolean
}

export default function Input({
                                  label,
                                  placeholder = '',
                                  helperText = '',
                                  defaultValue,
                                  id,
                                  type = '',
                                  readOnly,
                                  disabled,
                                  ...rest
                              }: InputProps) {
    const {
        register,
        formState: { errors },
    } = useForm();

    return (
        <div>
            <label htmlFor={id} className='block text-sm font-normal text-gray-700'>
                {label}
            </label>
            <div className='relative mt-1'>
                <input
                    {...register(id)}
                    {...rest}
                    type={type}
                    name={id}
                    id={id}
                    className ='focus:ring-red-500 border-red-500 focus:border-red-500'
                    placeholder={placeholder}
                    aria-describedby={id}
                />

                {errors[id] && (
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                        <HiExclamationCircle className='text-xl text-red-500' />
                    </div>
                )}
            </div>
            <div className='mt-1'>
                {helperText !== '' && (
                    <p className='text-xs text-gray-500'>{helperText}</p>
                )}
                {errors[id] && (
                    <span className='text-sm text-red-500'>{errors[id].message}</span>
                )}
            </div>
        </div>
    );
}