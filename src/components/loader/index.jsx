import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <Box display='flex' justifyContent='center'>
      <CircularProgress />
    </Box>
  )
}

export default Loader
