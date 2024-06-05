'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useColorScheme, useTheme } from '@mui/material/styles'

// Util Imports
import { rgbaToHex } from '@/utils/rgbaToHex'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const TotalSpending = ({ sales, categories }) => {
  const series = [
    {
      name: 'Sales',
      type: 'column',
      data: sales,
      categories
    }
  ]

  // Hooks
  const theme = useTheme()
  const { mode } = useColorScheme()

  // Vars

  const options = {
    chart: {
      offsetY: -9,
      offsetX: -16,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: '27%'
      }
    },
    markers: {
      size: 3.5,
      strokeWidth: 2,
      fillOpacity: 1,
      strokeOpacity: 1,
      colors: [rgbaToHex(`rgb(${theme.palette.background.paperChannel} / 1)`)],
      strokeColors: rgbaToHex(`rgb(${theme.palette.primary.mainChannel} / 1)`)
    },
    stroke: {
      width: [0, 2],
      colors: [theme.palette.customColors.trackBg, rgbaToHex(`rgb(${theme.palette.primary.mainChannel} / 1)`)]
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [rgbaToHex(`rgb(${theme.palette.primary.mainChannel} / 1)`)],
    grid: {
      strokeDashArray: 7,
      borderColor: rgbaToHex(`rgb(${theme.mainColorChannels['dark']} / 0.12)`)
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: categories,
      tickPlacement: 'on',
      labels: {
        show: true,
        style: {
          fontSize: '0.8125rem',
          colors: rgbaToHex(`rgb(${theme.mainColorChannels['dark']} / 0.4)`)
        }
      },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 3,
      labels: {
        style: {
          fontSize: '0.8125rem',
          colors: rgbaToHex(`rgb(${theme.mainColorChannels['dark']} / 0.4)`)
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '31%'
            }
          }
        }
      },
      {
        breakpoint: 1445,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      },
      {
        breakpoint: 1280,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      },
      {
        breakpoint: 1150,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          },
          grid: {
            padding: {
              right: -30
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '20%',
              borderRadius: 10
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%',
              borderRadius: 8
            }
          }
        }
      },
      {
        breakpoint: 415,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader title='Total Spending' />
      <CardContent>
        <AppReactApexCharts type='line' height={232} series={series} options={options} />
        {/* <div className='flex flex-col justify-center gap-6 mbs-6'>
          <div className='flex gap-4'>
            <Typography variant='h4'>62%</Typography>
            <Typography>Your sales performance is 45% 😎 better compared to last month</Typography>
          </div>
          <Button variant='contained' color='primary'>
            Details
          </Button>
        </div> */}
      </CardContent>
    </Card>
  )
}

export default TotalSpending
