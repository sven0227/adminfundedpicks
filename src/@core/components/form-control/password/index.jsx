import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

const PasswordInput = props => {
  const {
    label,
    required,
    control,
    maxLength,
    autoFocus = false,
    placeholder = '············',
    showErrorMsg = true,
    name,
    className,
    labelStyle,
    inputStyle,
    ...rest
  } = props
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          placeholder={placeholder}
          id='form-validation-scheme-password'
          type={isPasswordShown ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  size='small'
                  edge='end'
                  onClick={handleClickShowPassword}
                  onMouseDown={e => e.preventDefault()}
                  aria-label='toggle password visibility'
                >
                  <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                </IconButton>
              </InputAdornment>
            )
          }}
          {...rest}
        />
      )}
    />
  )
}

export default PasswordInput
