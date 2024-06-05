import { MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'
import Select from '@mui/material/Select'

const SelectForm = props => {
  const {
    label,
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
    options,
    errors,
    value,
    ...rest
  } = props

  return (
    <FormControl fullWidth>
      <InputLabel error={Boolean(errors)}>{label}</InputLabel>
      {control && (
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select label={label} {...field} defaultValue={value} error={Boolean(errors)} {...rest}>
              {options?.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                )
              })}
            </Select>
          )}
        />
      )}
      {errors && <FormHelperText error>This field is required.</FormHelperText>}
    </FormControl>
  )
}

export default SelectForm
