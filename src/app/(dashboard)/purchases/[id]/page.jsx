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
import { useCreatePurchaseMutation, useGetPurchaseQuery, useUpdatePurchaseMutation } from '@/redux-store/api/purchase'
import { useGetAllUsersQuery } from '@/redux-store/api/user'
import { useParams, useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import Error from '@/components/error'
import { useEffect } from 'react'

const schema = object({
  user: nonOptional(string('This field is not a string'), 'This field is required'),
  product: nonOptional(string('This field is not a string'), 'This field is required'),
  amount: nonOptional(string('This field is not a string'), 'This field is required')
})

const Create = () => {
  const { id } = useParams()
  const [updatePurchase, { isUpdating }] = useUpdatePurchaseMutation()
  const { data: usersData } = useGetAllUsersQuery()
  const { data: purchaseData, isLoading, isError } = useGetPurchaseQuery(id, { skip: id ? false : true })
  const router = useRouter()

  // Hooks
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema)
  })

  useEffect(() => {
    if (purchaseData) {
      setValue('product', purchaseData?.product)
      setValue('amount', purchaseData?.amount)
      setValue('user', purchaseData?.user)
    }
  }, [purchaseData])

  const onSubmit = async values => {
    console.log(values, 'values...')
    try {
      const result = await updatePurchase({ id, data: values }).unwrap()
      console.log(result, 'user result')
      toast.success('Purchase Updated Successfully')
      router.push('/purchases')
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error />
  }

  return (
    <Card>
      <CardHeader title='Update Purchase' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl
                control={control}
                errors={errors.user}
                value={purchaseData?.user || ''}
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
              <CustomButton
                disabled={isLoading || isUpdating}
                isLoading={isLoading || isUpdating}
                variant='contained'
                type='submit'
                text='Submit'
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Create
