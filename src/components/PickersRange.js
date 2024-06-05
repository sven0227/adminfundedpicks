// React Imports
import { useState, forwardRef } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

// Third-party Imports
import { format, addDays } from 'date-fns'

// Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

const PickersRange = (props) => {
  const startDate = props.startDate;
  const setStartDate = props.setStartDate
  const endDate = props.endDate;
  const setEndDate = props.setEndDate

  const handleOnChange = dates => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)
  }

  const CustomInput = forwardRef((props, ref) => {
    const { label, start, end, ...rest } = props

    const startDate = format(start, 'MM/dd/yyyy')
    const endDate = end !== null ? ` - ${format(end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={6} mb={2}>
        <AppReactDatepicker
          selectsRange
          monthsShown={2}
          endDate={endDate}
          selected={startDate}
          startDate={startDate}
          shouldCloseOnSelect={false}
          id='date-range-picker-months'
          onChange={handleOnChange}
          customInput={<CustomInput label='Multiple Months' end={endDate} start={startDate} />}
        />
      </Grid>
    </Grid>
  )
}

export default PickersRange
