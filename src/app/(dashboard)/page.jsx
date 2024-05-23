// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import CardStatVertical from '@components/card-statistics/Vertical'
import TotalTransactions from '@views/dashboards/analytics/TotalTransactions'
import Performance from '@views/dashboards/analytics/Performance'
import TopReferralSources from '@views/dashboards/analytics/TopReferralSources'
import VisitsByDay from '@views/dashboards/analytics/VisitsByDay'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const DashboardAnalytics = () => {
  // Vars
  const serverMode = getServerMode()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={4}>
        <CardStatVertical
          stats='100k'
          avatarColor='primary'
          trendNumber='10%'
          title='Total Purchases'
          chipText='Last 4 Month'
          avatarIcon='ri-shopping-cart-line'
          avatarSkin='light'
          chipColor='secondary'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardStatVertical
          stats='10k'
          avatarColor='primary'
          trendNumber='10%'
          title='Total Users'
          chipText='Last 4 Month'
          avatarIcon='ri-shopping-cart-line'
          avatarSkin='light'
          chipColor='secondary'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardStatVertical
          stats='5k'
          avatarColor='primary'
          trendNumber='10%'
          title='Total Bets'
          chipText='Last 4 Month'
          avatarIcon='ri-shopping-cart-line'
          avatarSkin='light'
          chipColor='secondary'
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <TotalTransactions serverMode={serverMode} />
      </Grid>

      <Grid item xs={12} md={8}>
        <TopReferralSources />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <VisitsByDay serverMode={serverMode} />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
