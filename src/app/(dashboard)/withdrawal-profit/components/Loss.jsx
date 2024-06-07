'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { currencyFormatter } from '../../utils'

const Loss = ({ loss, dailyLoss }) => {
  return (
    <Card className='flex flex-col justify-between'>
      <CardContent className='flex justify-between items-start'>
        <div className='flex flex-col'>
          <Typography variant='h5'>Loss</Typography>
        </div>
      </CardContent>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-x-2'>
              <CustomAvatar size={24} variant='rounded' skin='light' className='rounded' color='warning'>
                <i className='ri-aed-fill text-base' />
              </CustomAvatar>
              <Typography>Total Loss</Typography>
            </div>
            <Typography variant='h4'>{currencyFormatter.format(loss)}</Typography>
          </div>
          <Divider flexItem orientation='vertical' sx={{ '& .MuiDivider-wrapper': { p: 0, py: 2 } }}>
            <CustomAvatar skin='light' color='secondary' size={28} className='bg-actionSelected'>
              <Typography variant='body2'>VS</Typography>
            </CustomAvatar>
          </Divider>
          <div className='flex flex-col items-end gap-2'>
            <div className='flex items-center gap-x-2'>
              <Typography>Today`s Loss</Typography>
              <CustomAvatar size={24} variant='rounded' skin='light' className='rounded' color='primary'>
                <i className='ri-blaze-line' />
              </CustomAvatar>
            </div>
            <Typography variant='h4'>{currencyFormatter.format(dailyLoss)}</Typography>
          </div>
        </div>
        {/* <LinearProgress value={26} color='warning' variant='determinate' className='bs-2' /> */}
      </CardContent>
    </Card>
  )
}

export default Loss
