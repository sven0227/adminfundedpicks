'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, number } from 'valibot'
import FormControl from '@core/components/form-control'
import CustomButton from '@core/components/button'
import { useCreatePurchaseMutation } from '@/redux-store/api/purchase'

const schema = object({
  productName: string([
    minLength(1, 'This field is required'),
    minLength(3, 'Username must be at least 3 characters long')
  ]),

  amount: number([minLength(1, 'This field is required'), minLength(8, 'Password must be at least 8 characters long')])
})

const Create = () => {
  const [createPurchase, { isLoading }] = useCreatePurchaseMutation()

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: '',
      amount: ''
    }
  })

  const onSubmit = async values => {
    console.log(values, 'values...')
    try {
      const result = await createPurchase(values).unwrap()
      console.log(result, 'user result')
      toast.success('User Created Successfully')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader title='Create Purchase' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl
                control={control}
                label='Product Name'
                name='product'
                placeholder='Enter Product Name'
                {...(errors.productName && { error: true, helperText: errors.productName.message })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                inputType='amount'
                type='number'
                control={control}
                label='Amount'
                name='amount'
                placeholder='Enter amount'
                {...(errors.amount && { error: true, helperText: errors.amount.message })}
              />
            </Grid>
            <Grid item xs={12} className='flex justify-end gap-4'>
              <CustomButton isLoading={isLoading} variant='contained' type='submit' text='Submit' />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Create
