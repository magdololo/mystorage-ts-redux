import {Controller, useForm, useFormContext} from 'react-hook-form';
import Select from 'react-select';


type InputSelectProductNameProps = {
    disabled: boolean
    label: string
    helperText: string
    id: string
    placeholder: string,
    options: Array<string>,
    defaultValue: string,
    isClearable: boolean
}
export default function InputSelectProductName({disabled, label, helperText, id, placeholder, options, defaultValue, isClearable }: InputSelectProductNameProps) {
    const customStyles = {
        control: (styles: any, state: any) => ({
            ...styles,
            border: state.isFocused ? '0' : '1px solid rgb(209, 213, 219)',
            boxShadow: state.isFocused ? '0 0 0 0.1rem rgb(0, 196, 253)' : 0,
            '*': {
                boxShadow: 'none !important',
            },
        }),
        option: (styles: any, state: any) => ({
            ...styles,
            color: 'black',
            background: state.isSelected ? '#D1D5DB' : 'white',
            ':hover': {
                background: '#E5E7EB',
            },
        }),
    };

    const errorStyles = {
        control: (styles: any) => ({
            ...styles,
            border: 'none',
            boxShadow: '0 0 0 0.04rem #EF4444',
            '*': {
                boxShadow: 'none !important',
            },
        }),
        option: (styles: any, state: any) => ({
            ...styles,
            color: 'black',
            background: state.isSelected ? '#D1D5DB' : 'white',
            ':hover': {
                background: '#E5E7EB',
            },
        }),
    };

    const optionsObject = options.map((option?: any) => {
        return {
            value: option,
            label: option,
        };
    });

    const {
        control,
        formState: {errors},
    } = useForm();

    return (
        <div>
            <label htmlFor={id} className='block text-sm font-normal text-gray-700'>
                {label}
            </label>
            <div className='relative mt-1'>
                <Controller
                    name={id}
                    defaultValue={
                        defaultValue ? {value: defaultValue, label: defaultValue} : ''
                    }
                    control={control}
                    render={({field}) => {
                        const styles = errors[id] ? errorStyles : customStyles;
                        return (
                            <Select
                                {...field}
                                isClearable={isClearable}
                                isDisabled={disabled}
                                placeholder={placeholder}
                                options={optionsObject}
                                styles={styles}
                            />
                        );
                    }}
                />
                <div className='mt-1'>
                    {helperText && <p className='text-xs text-gray-500'>{helperText}</p>}
                    {errors[id] && (
                        <span className='text-sm text-red-500'>{errors[id].message}</span>
                    )}
                </div>
            </div>
        </div>
    );
}