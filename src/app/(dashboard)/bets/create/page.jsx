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
import { useCreateBetMutation } from '@/redux-store/api/bet'
import { useGetAllUsersQuery } from '@/redux-store/api/user'
import { useRouter } from 'next/navigation'

const schema = object({
  user: nonOptional(string('This field is not a string'), 'This field is required'),
  stake: nonOptional(string('This field is not a string'), 'This field is required'),
  price: nonOptional(string('This field is not a string'), 'This field is required')
})

const Create = () => {
  const [createBet, { isLoading }] = useCreateBetMutation()
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
      await createBet(values).unwrap()
      toast.success('Bet created successfully')
      router.push('/bets')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader title='Create Bet' />
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
                label='Stake'
                name='stake'
                type='number'
                placeholder='Enter Stake'
                {...(errors.stake && { error: true, helperText: errors.stake.message })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                inputType='price'
                type='number'
                control={control}
                label='Price'
                name='price'
                placeholder='Enter price'
                {...(errors.price && { error: true, helperText: errors.price.message })}
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
