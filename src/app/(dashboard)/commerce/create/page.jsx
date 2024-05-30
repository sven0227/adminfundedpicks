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
import { useRouter } from 'next/navigation'
import SelectUserControl from '@/components/form-inputs/user'
import SelectPurchaseControl from '@/components/form-inputs/purchase'
import { useCreateChallengeMutation } from '@/redux-store/api/challenge'

const schema = object({
  target: nonOptional(string('This field is not a string'), 'This field is required'),
  starting_amount: nonOptional(string('This field is not a string'), 'This field is required'),
  daily_loss_limit: nonOptional(string('This field is not a string'), 'This field is required'),
  maximum_loss_limit: nonOptional(string('This field is not a string'), 'This field is required'),
  minimum_bet_size: nonOptional(string('This field is not a string'), 'This field is required'),
  maximum_bet_size: nonOptional(string('This field is not a string'), 'This field is required'),
  user: nonOptional(string('This field is not a string'), 'This field is required'),
  purchase: nonOptional(string('This field is not a string'), 'This field is required')
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
        target,
        starting_amount,
        daily_loss_limit,
        maximum_loss_limit,
        minimum_bet_size,
        maximum_bet_size,
        user,
        purchase
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
              <SelectUserControl control={control} errors={user} />
            </Grid>
            <Grid item xs={6}>
              <SelectPurchaseControl control={control} errors={purchase} userId={userId} />
            </Grid>

            <Grid item xs={6}>
              <FormControl
                inputType='text'
                type='number'
                control={control}
                label='Target'
                name='target'
                placeholder='Enter target'
                {...(target && { error: true, helperText: target.message })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                inputType='text'
                type='number'
                control={control}
                label='Starting amount'
                name='starting_amount'
                placeholder='Enter starting amount'
                {...(starting_amount && { error: true, helperText: starting_amount.message })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                inputType='text'
                type='number'
                control={control}
                label='Daily loss limit'
                name='daily_loss_limit'
                placeholder='Enter loss limit'
                {...(daily_loss_limit && { error: true, helperText: daily_loss_limit.message })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                inputType='text'
                type='number'
                control={control}
                label='Maximum loss limit'
                name='maximum_loss_limit'
                placeholder='Enter Maximum loss limit'
                {...(maximum_loss_limit && { error: true, helperText: maximum_loss_limit.message })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                inputType='text'
                type='number'
                control={control}
                label='Minimum Bet Size'
                name='minimum_bet_size'
                placeholder='Enter minimum bet size'
                {...(minimum_bet_size && { error: true, helperText: minimum_bet_size.message })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                inputType='text'
                type='number'
                control={control}
                label='Maximum Bet Size'
                name='maximum_bet_size'
                placeholder='Enter maximum bet size'
                {...(maximum_bet_size && { error: true, helperText: maximum_bet_size.message })}
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
