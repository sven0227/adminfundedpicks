'use client'

// Next Imports
import dynamic from 'next/dynamic'

//  MUI Imports
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

const series = [
  {
    name: 'Income',
    data: [70, 90, 80, 95, 75, 90]
  },
  {
    name: 'Net Worth',
    data: [110, 72, 62, 65, 100, 75]
  }
]

const Performance = ({ serverMode }) => {
  // Hooks
  const theme = useTheme()
  const { mode } = useColorScheme()

  // Vars
  const _mode = (mode === 'system' ? serverMode : mode) || serverMode

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    legend: {
      itemMargin: { horizontal: 10 },
      fontSize: '15px',
      labels: { colors: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.7)`) },
      offsetY: 5,
      markers: {
        offsetX: theme.direction === 'rtl' ? 8 : -4,
        width: 10,
        height: 10
      }
    },
    plotOptions: {
      radar: {
        size: 110,
        polygons: {
          strokeColors: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.12)`),
          connectorColors: rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.12)`)
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [theme.palette.warning.main, theme.palette.primary.main],
        shadeIntensity: 1,
        type: 'vertical',
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    colors: [theme.palette.warning.main, theme.palette.primary.main],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    markers: { size: 0 },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '0.8125rem',
          colors: [
            rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.4)`),
            rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.4)`),
            rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.4)`),
            rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.4)`),
            rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.4)`),
            rgbaToHex(`rgb(${theme.mainColorChannels[_mode]} / 0.4)`)
          ]
        }
      }
    },
    yaxis: { show: false },
    grid: {
      show: false,
      padding: {
        top: 10,
        bottom: -10
      }
    }
  }

  return (
    <Card>
      <CardHeader title='Performance' action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />} />
      <CardContent>
        <AppReactApexCharts type='radar' height={295} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default Performance
