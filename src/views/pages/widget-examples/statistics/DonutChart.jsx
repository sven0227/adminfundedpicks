'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useColorScheme, useTheme } from '@mui/material/styles'

// Util Imports
import { rgbaToHex } from '@/utils/rgbaToHex'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [35, 30, 23]

const DonutChart = ({ serverMode }) => {
  // Hooks
  const theme = useTheme()
  const { mode } = useColorScheme()

  // Vars
  const _mode = (mode === 'system' ? serverMode : mode) || serverMode

  const options = {
    legend: { show: false },
    stroke: { width: 5, colors: [theme.palette.background.paper] },
    grid: {
      padding: {
        top: 10,
        left: 0,
        right: 0,
        bottom: 13
      }
    },
    colors: [
      rgbaToHex(`rgb(${theme.palette.primary.mainChannel} / 1)`),
      rgbaToHex(`rgb(${theme.palette.success.mainChannel} / 1)`),
      rgbaToHex(`rgb(${theme.palette.secondary.mainChannel} / 1)`)
    ],
    labels: [`${new Date().getFullYear()}`, `${new Date().getFullYear() - 1}`, `${new Date().getFullYear() - 2}`],
    tooltip: {
      y: { formatter: val => `${val}%` }
    },
    dataLabels: {
      enabled: false
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: false },
            total: {
              label: '',
              show: true,
              fontWeight: 600,
              fontSize: '1rem',
              color: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.7)`),
              formatter: val => (typeof val === 'string' ? `${val}%` : '12%')
            },
            value: {
              offsetY: 6,
              fontWeight: 600,
              fontSize: '0.9375rem',
              formatter: val => `${val}%`,
              color: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.9)`)
            }
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardContent className='pbe-0'>
        <div className='flex flex-wrap items-center gap-1'>
          <Typography variant='h5'>$27.9k</Typography>
          <Typography color='success.main'>+16%</Typography>
        </div>
        <Typography variant='subtitle1'>Total Growth</Typography>
        <AppReactApexCharts type='donut' height={127} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default DonutChart
