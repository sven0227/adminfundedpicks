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

const Progress = ({ progress }) => {
  const series = [(+progress).toFixed(1)]
  // Hooks
  const theme = useTheme()

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: ['#668722'],
    grid: {
      padding: {
        bottom: -10
      }
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '55%' },
        track: {
          background: theme.palette.customColors.trackBg
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 5,
            fontWeight: 500,
            fontSize: '0.9375rem',
            color: rgbaToHex(`rgb(${theme.mainColorChannels['dark']} / 0.9)`)
          }
        }
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    responsive: [
      {
        breakpoint: 1310,
        options: {
          chart: {
            height: 130
          },
          plotOptions: {
            radialBar: {
              offsetY: 26
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: {
            height: 104
          },
          plotOptions: {
            radialBar: {
              offsetY: 10
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <div className='flex flex-wrap items-center gap-1'>
          <Typography variant='h5'>Progress</Typography>
        </div>
        <AppReactApexCharts type='radialBar' height={104} width='100%' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default Progress
