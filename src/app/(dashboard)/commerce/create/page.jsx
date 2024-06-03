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
import { object, nonOptional, string, number, integer } from 'valibot'
import FormControl from '@core/components/form-control'
import CustomButton from '@core/components/button'
import { useRouter } from 'next/navigation'
import SelectUserControl from '@/components/form-inputs/user'
import SelectPurchaseControl from '@/components/form-inputs/purchase'
import { useCreateChallengeMutation } from '@/redux-store/api/challenge'

const schema = object({
  package_name: nonOptional(string('This field is not a string'), 'This field is required'),
  package_price: nonOptional(string('This field is not a number'), 'This field is required'),
  price: nonOptional(string('This field is not a number'), 'This field is required')
})

const CreateChallenge = () => {
  const [createChallengeHandler, { isLoading }] = useCreateChallengeMutation()
  const router = useRouter()
  // Hooks
  const {
    control,
    getValues,
    watch,
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
      await createChallengeHandler(values).unwrap()
      toast.success('Challenge Created Successfully')
      router.push('/commerce')
    } catch (error) {
      console.log(error)
    }
  }

  const userId = watch('user', null)

  return (
    <Card>
      <CardHeader title='Create Challenge' />
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
              <CustomButton isLoading={isLoading} variant='contained' type='submit' text='Create' />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateChallenge
