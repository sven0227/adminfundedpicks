// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const Stats = ({ title, value }) => {
  // Props

  return (
    <Card>
      <CardContent className='flex justify-between gap-1'>
        <div className='flex flex-col gap-1 flex-grow'>
          <Typography color='text.primary'>{title}</Typography>
          <div className='flex items-center gap-2 flex-wrap'>
            <Typography variant='h4'>{value}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Stats
