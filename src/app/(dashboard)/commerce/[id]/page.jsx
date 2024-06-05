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
import { object, nonOptional, string } from 'valibot'
import FormControl from '@core/components/form-control'
import CustomButton from '@core/components/button'
import { useParams, useRouter } from 'next/navigation'
import SelectUserControl from '@/components/form-inputs/user'
import { useGetChallengeQuery, useUpdateChallengeMutation } from '@/redux-store/api/challenge'
import { useEffect } from 'react'
import Loader from '@/components/loader'
import Error from '@/components/error'
import SelectPurchaseControl from '@/components/form-inputs/purchase'

const schema = object({
  package_name: nonOptional(string('This field is not a string'), 'This field is required'),
  package_price: nonOptional(string('This field is not a number'), 'This field is required'),
  price: nonOptional(string('This field is not a number'), 'This field is required')
})

const UpdateChallenge = () => {
  const { id } = useParams()
  const { data: challengeData, isLoading, isError } = useGetChallengeQuery(id, { skip: id ? false : true })
  const [updateChallengeHandler, { isLoading: isUpadingChallenge }] = useUpdateChallengeMutation()

  const router = useRouter()

  useEffect(() => {
    if (challengeData) {
      setValue('package_name', challengeData.package_name)
      setValue('package_price', challengeData.package_price)
      setValue('price', challengeData.price)
    }
  }, [challengeData])

  // Hooks
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: {
      errors: {
        package_name,
        package_price,
        price
      }
    }
  } = useForm({
    resolver: valibotResolver(schema)
  })

  const onSubmit = async values => {
    try {
      await updateChallengeHandler({ id, data: values }).unwrap()
      toast.success('Update Successfully')
      router.push('/commerce')
    } catch (error) {
      console.log(error)
    }
  }

  console.log(isError, challengeData, isLoading, 'l...')

  if (isError) {
    return <Error />
  }

  if (!challengeData || isLoading) {
    return <Loader />
  }

  const userId = watch('user', null)

  return (
    <Card>
      <CardHeader title='Update Challenge' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <FormControl
                inputType='text'
                type='text'
                control={control}
                label='Package Name'
                name='package_name'
                placeholder='Package Name'
                {...(package_name && { error: true, helperText: package_name.message })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                inputType='number'
                type='number'
                control={control}
                label='Package Price'
                name='package_price'
                placeholder='Package Price'
                {...(package_price && { error: true, helperText: package_price.message })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                inputType='number'
                type='number'
                control={control}
                label='price'
                name='price'
                placeholder='Enter target'
                {...(price && { error: true, helperText: price.message })}
              />
            </Grid>
            <Grid item xs={12} className='flex justify-end gap-4'>
              <CustomButton isLoading={isLoading} variant='contained' type='submit' text='Save' />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default UpdateChallenge
