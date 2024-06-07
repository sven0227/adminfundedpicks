// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { currencyFormatter } from '../../utils'

const Account = ({ accountBalance, profit, alv, funds }) => {
  const data = [
    {
      stats: `${currencyFormatter.format(accountBalance)}`,
      color: 'primary',
      title: 'Account Balance',
      icon: 'ri-user-star-line'
    },
    {
      stats: `${currencyFormatter.format(profit)}`,
      color: 'warning',
      icon: 'ri-pie-chart-2-line',
      title: 'Total Profit'
    },
    {
      color: 'info',
      stats: `${currencyFormatter.format(funds)}`,
      title: 'Funds',
      icon: 'ri-funds-fill'
    },
    {
      color: 'warning',
      stats: alv,
      title: 'ALV',
      icon: 'ri-arrow-left-right-line'
    }
  ]

  return (
    <Card className='h-full'>
      <CardHeader title='Account Overview' />
      <CardContent>
        <div className='flex flex-col justify-between gap-4'>
          {data.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <CustomAvatar variant='rounded' skin='light' color={item.color}>
                <i className={item.icon}></i>
              </CustomAvatar>
              <div>
                <Typography variant='h5'>{item.stats}</Typography>
                <Typography>{item.title}</Typography>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Account
