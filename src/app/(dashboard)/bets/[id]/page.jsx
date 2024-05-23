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
import { useGetBetQuery, useUpdateBetMutation } from '@/redux-store/api/bet'
import { useGetAllUsersQuery } from '@/redux-store/api/user'
import { useParams, useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import Error from '@/components/error'
import { useEffect } from 'react'

const schema = object({
  user: nonOptional(string('This field is not a string'), 'This field is required'),
  price: nonOptional(string('This field is not a string'), 'This field is required'),
  stake: nonOptional(string('This field is not a string'), 'This field is required')
})

const Create = () => {
  const { id } = useParams()
  const [updateBet, { isUpdating }] = useUpdateBetMutation()
  const { data: usersData } = useGetAllUsersQuery()
  const { data: betData, isLoading, isError } = useGetBetQuery(id, { skip: id ? false : true })
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
    if (betData) {
      setValue('price', betData?.price)
      setValue('stake', betData?.stake)
      setValue('user', betData?.user)
    }
  }, [betData])

  const onSubmit = async values => {
    try {
      const result = await updateBet({ id, data: values }).unwrap()
      toast.success('Bet updated successfully')
      router.push('/bets')
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  // if (isError) {
  //   return <Error />
  // }

  return (
    <Card>
      <CardHeader title='Update Bets' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl
                control={control}
                errors={errors.user}
                value={betData?.user || ''}
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
                type='number'
                name='stake'
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
              <CustomButton
                disabled={isLoading || isUpdating}
                isLoading={isLoading || isUpdating}
                variant='contained'
                type='submit'
                text='Update'
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Create
