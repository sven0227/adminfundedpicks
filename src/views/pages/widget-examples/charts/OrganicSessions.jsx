'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useColorScheme, useTheme } from '@mui/material/styles'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Util Imports
import { rgbaToHex } from '@/utils/rgbaToHex'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const OrganicSessions = ({ serverMode }) => {
  // Hooks
  const theme = useTheme()
  const { mode } = useColorScheme()

  // Vars
  const _mode = (mode === 'system' ? serverMode : mode) || serverMode

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    colors: [
      rgbaToHex(`rgb(${theme.palette.warning.mainChannel} / 1)`),
      rgbaToHex(`rgb(${theme.palette.warning.mainChannel} / 0.8)`),
      rgbaToHex(`rgb(${theme.palette.warning.mainChannel} / 0.6)`),
      rgbaToHex(`rgb(${theme.palette.warning.mainChannel} / 0.4)`),
      rgbaToHex(`rgb(${theme.palette.warning.mainChannel} / 0.2)`)
    ],
    grid: {
      padding: {
        bottom: -30
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      fontSize: '15px',
      offsetY: 5,
      itemMargin: {
        horizontal: 28,
        vertical: 6
      },
      labels: {
        colors: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.7)`)
      },
      markers: {
        width: 10,
        height: 10,
        offsetY: 1,
        offsetX: theme.direction === 'rtl' ? 4 : -1
      }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: { width: 4, lineCap: 'round', colors: [theme.palette.background.paper] },
    labels: ['USA', 'India', 'Canada', 'Japan', 'France'],
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
        endAngle: 130,
        startAngle: -130,
        customScale: 0.9,
        donut: {
          size: '83%',
          labels: {
            show: true,
            name: {
              offsetY: 25,
              fontSize: '0.9375rem',
              color: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.7)`)
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              fontSize: '1.75rem',
              formatter: value => `${value}k`,
              color: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.9)`)
            },
            total: {
              show: true,
              label: '2022',
              fontSize: '1rem',
              color: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.7)`),
              formatter: value => `${value.globals.seriesTotals.reduce((total, num) => total + num)}k`
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1515,
        options: {
          chart: { height: 396 },
          legend: {
            itemMargin: {
              horizontal: 15,
              vertical: 10
            },
            offsetY: 4
          },
          grid: {
            padding: {
              bottom: -35
            }
          }
        }
      },
      {
        breakpoint: 901,
        options: {
          chart: { height: 385 },
          legend: {
            offsetY: 2
          },
          grid: {
            padding: {
              bottom: -24
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Organic Sessions'
        action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <CardContent>
        <AppReactApexCharts type='donut' height={391} options={options} series={[13, 18, 18, 24, 16]} />
      </CardContent>
    </Card>
  )
}

export default OrganicSessions
