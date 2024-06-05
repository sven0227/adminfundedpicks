'use client'

// React Imports

// MUI Imports
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, optional } from 'valibot'

import FormControl from '@core/components/form-control'
import CustomButton from '@core/components/button'
import { useGetUserQuery, useUpdateUserMutation } from '@/redux-store/api/user'
import Loader from '@/components/loader'
import Error from '@/components/error'

const schema = object({
  username: string([
    minLength(1, 'This field is required'),
    minLength(3, 'Username must be at least 3 characters long')
  ]),

  password: optional(string([minLength(1, 'This field is required')]))
})

const Update = () => {
  const { id } = useParams()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const { data: userData, isLoading, isError } = useGetUserQuery(id, { skip: id ? false : true })
  const router = useRouter()
  // Hooks
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: userData?.username,
      password: userData?.password
    }
  })

  const onSubmit = async values => {
    try {
      const result = await updateUser({ id, data: values }).unwrap()

      toast.success('User Updated Successfull')
      router.push('/users')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userData) {
      setValue('username', userData.username)
    }
  }, [userData])

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error />
  }

  return (
    <Card>
      <CardHeader title='Update User' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl
                control={control}
                label='User Name'
                name='username'
                placeholder='Enter username'
                {...(errors.username && { error: true, helperText: errors.username.message })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                inputType='password'
                control={control}
                label='Password'
                name='password'
                placeholder='Enter Password'
                {...(errors.password && { error: true, helperText: errors.password.message })}
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

export default Update
