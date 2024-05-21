import { Typography } from '@mui/material'

const Error = ({ text }) => {
  return (
    <Typography textAlign='center' component='h4'>
      {text || 'Something went wrong'}
    </Typography>
  )
}

export default Error
