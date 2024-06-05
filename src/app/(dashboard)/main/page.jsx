'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import CardStatVertical from '@components/card-statistics/Vertical'
import { useGetDashboardDataQuery } from '@/redux-store/api/dashboard'
import Error from '@/components/error'
import Loader from '@/components/loader'
import LastWeekReport from './components/LastWeekReport'
import WeeklyReport from './components/WeeklyReport'
import moment from 'moment'
import TotalTransactions from '@/views/dashboards/analytics/TotalTransactions'
import { currencyFormatter } from '../utils'

// Server Action Imports

const DashboardAnalytics = () => {
  // Vars
  const { data: dashboardData, isloading, isError } = useGetDashboardDataQuery()

  if (isError) {
    return <Error />
  }

  if (isloading || !dashboardData) {
    return <Loader />
  }
  const { bet_total, purchase_total, users_total, transactions_this_week, transactions_last_week } = dashboardData

  return (
    <Grid container spacing={6}>
      {[
        { title: 'Total Users', count: users_total, icon: 'ri-user-3-fill', color: 'primary' },
        { title: 'Total Bets', count: currencyFormatter.format(bet_total), icon: 'ri-cash-line', color: 'warning' },
        { title: 'Total Purchases', count: currencyFormatter.format(purchase_total), icon: 'ri-wallet-3-fill', color: 'info' }
      ].map(({ title, count, icon, color }, i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <CardStatVertical
            stats={count}
            avatarColor={color}
            trendNumber='22%'
            title={title}
            chipText='Last 4 Month'
            avatarIcon={icon}
            avatarSkin='light'
            chipColor='secondary'
          />
        </Grid>
      ))}

      <Grid item xs={12} md={12}>
        <TotalTransactions dashboardData={dashboardData} />
      </Grid>

      {/* <Grid item xs={12}>
        <WeeklyReport
          data={Object.values(transactions_this_week).map(transaction => transaction || 0)}
          categories={Object.keys(transactions_this_week).map(date => moment(date).format('MMM DD YYYY'))}
        />
      </Grid>
      <Grid item xs={12}>
        <LastWeekReport
          data={Object.values(transactions_last_week).map(transaction => transaction || 0)}
          categories={Object.keys(transactions_last_week).map(date => moment(date).format('MMM DD YYYY'))}
        />
      </Grid> */}
    </Grid>
  )
}

export default DashboardAnalytics
