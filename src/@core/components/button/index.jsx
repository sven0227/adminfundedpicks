import { Button, CircularProgress } from '@mui/material'

const CustomButton = ({ text, disabled = false, isLoading = false }) => {
  return (
    <Button disabled={isLoading ? true : disabled} variant='contained' type='submit' className='gap-2'>
      {isLoading && <CircularProgress size={20} color='inherit' />}
      {text}
    </Button>
  )
}

export default CustomButton
