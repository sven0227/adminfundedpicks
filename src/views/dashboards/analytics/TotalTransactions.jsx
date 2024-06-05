'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Util Imports
import { rgbaToHex } from '@/utils/rgbaToHex'
import { useEffect, useState } from 'react'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const TotalTransactions = (props) => {
  // Hooks
  const theme = useTheme()
  const [seriesData, setSeriesData] = useState([{
    name: 'Last Week',
    data: []
  },
  {
    name: 'This Week',
    data: []
  }]);
  const [seriesPercentages, setSeriesPercentages] = useState({});
  const dashboardData = props.dashboardData;

  useEffect(() => {
    if (dashboardData) {
      const thisWeekValues = Object.values(dashboardData.transactions_this_week).map((item) => item ? item : 0);
      for (let i = 0; i < 7; i++) {
        if (i < thisWeekValues.length) {
          if (thisWeekValues[i] === null) {
            thisWeekValues[i] = 0;
          }
        } else {
          thisWeekValues.push(0);
        }
      }
      setSeriesData([
        {
          name: 'Last Week',
          data: Object.values(dashboardData.transactions_last_week).map((item) => item ? item : 0)
          // data: [83, 153, 0, 279, -0, 0, 0]
        },
        {
          name: 'This Week',
          data: thisWeekValues
          // data: [831, 53, 1213, -279, 0, 153, 83]
        }
      ])
      const total_this_week = Object.values(dashboardData.transactions_this_week).reduce((a, b) => a + b, 0)
      const total_last_week = Object.values(dashboardData.transactions_last_week).reduce((a, b) => a + b, 0)
      const percentage_change = (((total_this_week - total_last_week) / total_last_week) * 100).toFixed(1)
      let change_icon = "";
      if (percentage_change > 0) {
        change_icon = "+"
      } else change_icon = "-"
      setSeriesPercentages({ percentage_change, change_icon })
    }
  }, [dashboardData])

  // Vars

  const options = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: {
      y: { formatter: val => `${Math.abs(val)}` }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [
      rgbaToHex(`rgb(${theme.palette.primary.mainChannel} / 1)`),
      rgbaToHex(`rgb(${theme.palette.success.mainChannel} / 1)`)
    ],
    grid: {
      borderColor: rgbaToHex(`rgb(${theme.mainColorChannels['dark']} / 0.12)`),
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -10,
        bottom: -25
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
    plotOptions: {
      bar: {
        borderRadius: 4,
        barHeight: '30%',
        horizontal: true,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all'
      }
    },
    xaxis: {
      position: 'top',
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        formatter: val => `${Math.abs(Number(val))}`,
        style: { colors: rgbaToHex(`rgb(${theme.mainColorChannels['dark']} / 0.4)`), fontSize: '13px' }
      }
    },
    yaxis: {
      labels: { show: false }
    }
  }

  return (
    <Card className='md:bs-full'>
      <Grid container className='md:bs-full'>
        <Grid item xs={12} sm={7} className='max-sm:border-be sm:border-ie flex flex-col'>
          <CardHeader title='Total Transactions' />
          <CardContent className='flex flex-grow flex-col justify-center pbs-5'>
            <AppReactApexCharts type='bar' height={232} series={seriesData} options={options} />
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={5} className='flex flex-col'>
          {/* <CardHeader
            title='Report'
            subheader='Last month transactions $234.40k'
            action={<OptionMenu options={['Refresh', 'Update', 'Share']} />}
          /> */}
          <CardContent className='flex flex-grow flex-col justify-center'>
            <div className='flex flex-col gap-5'>
              <div className='flex justify-evenly'>
                <div className='flex flex-col gap-3 items-center'>
                  <CustomAvatar skin='light' color='success' variant='rounded'>
                    <i className='ri-pie-chart-2-line' />
                  </CustomAvatar>
                  <div className='flex flex-col items-center gap-0.5'>
                    <Typography>This Week</Typography>
                    <Typography color='text.primary' className='font-medium'>
                      {seriesPercentages.percentage_change}%
                    </Typography>
                  </div>
                </div>
                {/* <Divider orientation='vertical' flexItem />
                <div className='flex flex-col gap-3 items-center'>
                  <CustomAvatar skin='light' color='primary' variant='rounded'>
                    <i className='ri-money-dollar-circle-line' />
                  </CustomAvatar>
                  <div className='flex flex-col items-center gap-0.5'>
                    <Typography>Last Week</Typography>
                    <Typography color='text.primary' className='font-medium'>

                    </Typography>
                  </div>
                </div> */}
              </div>
              {/* <Divider /> */}
              {/* <div className='flex flex-wrap gap-3 items-center justify-around '>
                <div className='flex flex-col items-center gap-0.5'>
                  <Typography>Performance</Typography>
                  <Typography color='text.primary' className='font-medium'>
                    +94.15%
                  </Typography>
                </div>
                <div>
                  <Button variant='contained'>View Report</Button>
                </div>
              </div> */}
            </div>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default TotalTransactions
