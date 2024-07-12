'use client'

// React Imports

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import * as Yup from 'yup';

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string } from 'valibot'
import FormControl from '@core/components/form-control'
import CustomButton from '@core/components/button'
import { useCreateUserMutation } from '@/redux-store/api/user'
import { useRouter } from 'next/navigation'
import { InputBase, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'

const schema = object({
  email: string([minLength(6, 'Email is required')]),
  firstName: string([minLength(1, 'First name is required')]),
  password: string([minLength(1, 'Password is required')]),
  lastName: string([minLength(1, 'Last name is required')])
});

const CreateUser = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [selectedPackage, setSelectedPackage] = useState('$249.99');
  const router = useRouter();

  const PACKAGES = {
    '$249.99': 10000,
    '$374.99': 25000,
    '$549.99': 50000,
    '$849.99': 75000,
    '$1,249.99': 100000,
    '$1.00': 10000,
    '$1': 10000
  }

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    }
  })

  const onSubmit = async values => {
    const updatedVersion = Object.assign({}, values);
    updatedVersion['amount'] = selectedPackage;
    console.log(' updatedVersion: ',updatedVersion)
    try {
      const result = await createUser(updatedVersion).unwrap()
      toast.success('User Created Successfully')
      router.push('/users')
    } catch (error) {
      toast.error(error.data.error)
      console.log(Object.values(error)[0], 'error data...', error)
    }
  }

  return (
    <Card>
      <CardHeader title='Create User' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5} alignItems={'center'}>
            <Grid item xs={6}>
              <FormControl
                control={control}
                label='First Name'
                name='firstName'
                placeholder='Enter First Name'
                {...(errors.email && { error: true, helperText: errors.email.message })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                control={control}
                label='Last Name'
                name='lastName'
                placeholder='Enter Last Name'
                {...(errors.email && { error: true, helperText: errors.email.message })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                control={control}
                label='Email'
                name='email'
                placeholder='Enter email'
                {...(errors.email && { error: true, helperText: errors.email.message })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                control={control}
                label='Password'
                name='password'
                placeholder='Enter password'
                {...(errors.password && { error: true, helperText: errors.password.message })}
              />
            </Grid>
            <Grid item xs={6} alignItems={'center'}>
              <InputLabel>Package</InputLabel>
              <Select
                label='Package'
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
              >
                {Object.keys(PACKAGES).map((k, index) => (
                  <MenuItem key={k} value={k}>
                    {k}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6} alignItems={'center'}>
              <InputLabel>Funds</InputLabel>
              <InputBase value={PACKAGES[selectedPackage]} disabled={true} sx={{ border: '1px solid gray', p: 2, borderRadius: '5px' }}/>
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
