'use client'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, email } from 'valibot'
import classnames from 'classnames'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { useLoginMutation } from '@/redux-store/api/auth'
import CustomButton from '@/@core/components/button'
import FormControl from '@core/components/form-control'
import { toast } from 'react-toastify'
import { auth_token_key } from '@/utils/apiUrls'
import isAuth from '@/components/isAuth'
import { useEffect } from 'react'

const schema = object({
  username: string([
    minLength(1, 'This field is required'),
    minLength(3, 'Username must be at least 3 characters long')
  ]),

  password: string([
    minLength(1, 'This field is required'),
    minLength(4, 'Password must be at least 4 characters long')
  ])
})

const Login = ({ mode }) => {
  // States

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-1-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-1-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const [login, { isLoading }] = useLoginMutation()
  const { settings } = useSettings()

  useEffect(() => {
    if (localStorage.getItem('profile')) {
      router.push('/')
    }
  }, [])
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

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const onSubmit = async values => {
    try {
      const result = await login(values).unwrap()
      toast.success('User Logged in successfully')
      localStorage.setItem(auth_token_key, result.token)
      localStorage.setItem('profile', JSON.stringify(result))
      router.push('/')
    } catch ({ data }) {
      console.log('error', data)
      if (data?.non_field_errors) {
        toast.error(data?.non_field_errors.toString())
      }
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[673px] max-is-full bs-auto'
          />
        </div>
        <img src={authBackground} className='absolute bottom-[4%] z-[-1] is-full max-md:hidden' />
      </div>
      <div className='flex justify-center items-center bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div>
            <Logo component />
            <Typography>Please sign-in to your account and start the adventure</Typography>
          </div>
          <form
            noValidate
            method='post'
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5'
          >
            <FormControl
              control={control}
              label='Username'
              name='username'
              placeholder='Enter username'
              {...(errors.username && { error: true, helperText: errors.username.message })}
            />
            <FormControl
              inputType='password'
              control={control}
              label='Password'
              name='password'
              placeholder='Enter Password'
              {...(errors.password && { error: true, helperText: errors.password.message })}
            />
            <div className='flex justify-between items-center flex-wrap gap-x-3 gap-y-1'>
              <FormControlLabel control={<Checkbox />} label='Remember me' />
              {/* <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                Forgot password?
              </Typography> */}
            </div>
            <CustomButton isLoading={isLoading} text='Login' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
