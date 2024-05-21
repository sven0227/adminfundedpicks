import { TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

const Input = props => {
  const {
    label,
    type = 'text',
    required,
    control,
    maxLength,
    autoFocus = false,
    placeholder,
    showErrorMsg = true,
    name,
    className,
    labelStyle,
    inputStyle,
    ...rest
  } = props
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => <TextField {...field} type={type} fullWidth label={label} placeholder={label} {...rest} />}
    />
  )
}

export default Input
