// React Imports
import { useState } from 'react'

// MUI Imports
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, minLength } from 'valibot'

const schema = object({
  title: string([minLength(1, 'Title is required')])
})

const NewColumn = ({ addColumn }) => {
  // States
  const [display, setDisplay] = useState(false)

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: ''
    },
    resolver: valibotResolver(schema)
  })

  // Display the Add New form
  const handleDisplay = () => {
    setDisplay(!display)
  }

  // Handle the Add New form
  const onSubmit = data => {
    addColumn(data.title)
    setDisplay(false)
    reset({ title: '' })
  }

  return (
    <div className='flex flex-col gap-4 items-start is-[16.5rem]'>
      <Typography variant='h5' onClick={handleDisplay} className='flex items-center gap-1 cursor-pointer is-[10rem]'>
        <i className='ri-add-line text-base' />
        <span className='whitespace-nowrap'>Add New</span>
      </Typography>
      {display && (
        <form
          className='flex flex-col gap-4 is-[16.5rem]'
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              handleDisplay()
              reset({ title: '' })
            }
          }}
        >
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                autoFocus
                variant='outlined'
                label='Board Title'
                {...field}
                error={Boolean(errors.title)}
                helperText={errors.title ? errors.title.message : null}
              />
            )}
          />
          <div className='flex gap-3'>
            <Button variant='contained' size='small' color='primary' type='submit'>
              Add
            </Button>
            <Button
              variant='outlined'
              size='small'
              color='secondary'
              onClick={() => {
                handleDisplay()
                reset({ title: '' })
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default NewColumn
