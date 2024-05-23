'use client'

// React Imports

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string } from 'valibot'
import FormControl from '@core/components/form-control'
import CustomButton from '@core/components/button'
import { useCreateUserMutation } from '@/redux-store/api/user'
import { useRouter } from 'next/navigation'

const schema = object({
  username: string([
    minLength(1, 'This field is required'),
    minLength(3, 'Username must be at least 3 characters long')
  ]),

  password: string([
    minLength(1, 'This field is required'),
    minLength(4, 'Password must be at least 8 characters long')
  ])
})

const CreateUser = () => {
  const [createUser, { isLoading }] = useCreateUserMutation()
  const router = useRouter()

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async values => {
    console.log(values, 'values...')
    try {
      const result = await createUser(values).unwrap()
      console.log(result, 'user result')
      toast.success('User Created Successfully')
      router.push('/users')
    } catch (error) {
      console.log(Object.values(error)[0], 'error data...')
    }
  }

  return (
    <Card>
      <CardHeader title='Create User' />
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
              <CustomButton isLoading={isLoading} variant='contained' type='submit' text='Submit' />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateUser
