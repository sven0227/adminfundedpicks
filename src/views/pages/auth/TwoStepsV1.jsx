'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// Component Imports
import Form from '@components/Form'
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const TwoStepsV1 = ({ mode }) => {
  // Vars
  const darkImg = '/images/pages/auth-v1-mask-2-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-2-light.png'

  // Hooks
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] is-full relative p-6'>
      <Card className='flex flex-col sm:is-[460px]'>
        <CardContent className='p-6 sm:!p-12'>
          <div className='flex justify-center items-center mbe-6'>
            <Logo />
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
              <Typography variant='h4'>Two Step Verification 💬</Typography>
              <Typography>
                We sent a verification code to your mobile. Enter the code from the mobile in the field below.
              </Typography>
              <Typography className='font-medium' color='text.primary'>
                ******1234
              </Typography>
            </div>
            <Form noValidate autoComplete='off' className='flex flex-col gap-5'>
              <div className='flex flex-col gap-2'>
                <Typography>Type your 6 digit security code</Typography>
                <div className='flex items-center justify-between gap-4'>
                  <TextField autoFocus className='[&_input]:text-center' />
                  <TextField className='[&_input]:text-center' />
                  <TextField className='[&_input]:text-center' />
                  <TextField className='[&_input]:text-center' />
                  <TextField className='[&_input]:text-center' />
                  <TextField className='[&_input]:text-center' />
                </div>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Verify My Account
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Didn&#39;t get the code?</Typography>
                <Typography color='primary' component={Link}>
                  Resend
                </Typography>
              </div>
            </Form>
          </div>
        </CardContent>
      </Card>
      <img src={authBackground} className='absolute bottom-[5%] z-[-1] is-full max-md:hidden' />
    </div>
  )
}

export default TwoStepsV1
