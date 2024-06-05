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
import { object, nonOptional, string, number } from 'valibot'
import FormControl from '@core/components/form-control'
import CustomButton from '@core/components/button'
import { useCreatePurchaseMutation } from '@/redux-store/api/purchase'
import { useGetAllUsersQuery } from '@/redux-store/api/user'
import { useRouter } from 'next/navigation'

const schema = object({
  user: nonOptional(string('This field is not a string'), 'This field is required'),
  product: nonOptional(string('This field is not a string'), 'This field is required'),
  amount: nonOptional(string('This field is not a string'), 'This field is required')
})

const Create = () => {
  const [createPurchase, { isLoading }] = useCreatePurchaseMutation()
  const { data: usersData } = useGetAllUsersQuery()
  const router = useRouter()
  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema)
  })

  const onSubmit = async values => {
    try {
      const result = await createPurchase(values).unwrap()
      toast.success('Purchase Created Successfully')
      router.push('/purchases')
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
                errors={errors.user}
                inputType='select'
                label='User'
                name='user'
                options={
                  usersData?.map(item => {
                    return {
                      value: item.id,
                      label: item.username
                    }
                  }) || []
                }
                placeholder='Select User'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                control={control}
                label='Product Name'
                name='product'
                placeholder='Enter Product Name'
                {...(errors.product && { error: true, helperText: errors.product.message })}
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
