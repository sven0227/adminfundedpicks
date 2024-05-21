import { options } from '@fullcalendar/core/preact.js'
import { FormControl, InputLabel } from '@mui/material'
import { Controller } from 'react-hook-form'

const Select = props => {
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
    <FormControl fullWidth>
      <InputLabel error={Boolean(errors.select)}>Country</InputLabel>
      <Controller
        name='select'
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Select label='Country' {...field} error={Boolean(errors.select)}>
            {options.map(() => (label, value))}
            <MenuItem value='UK'>UK</MenuItem>
            <MenuItem value='USA'>USA</MenuItem>
            <MenuItem value='Australia'>Australia</MenuItem>
            <MenuItem value='Germany'>Germany</MenuItem>
          </Select>
        )}
        {...rest}
      />
      {errors[name] && <FormHelperText error>This field is required.</FormHelperText>}
    </FormControl>
  )
}

export default Select
