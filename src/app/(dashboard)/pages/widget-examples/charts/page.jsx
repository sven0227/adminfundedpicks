// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import TotalTransactions from '@views/pages/widget-examples/charts/TotalTransactions'
import PerformanceOverview from '@views/pages/widget-examples/charts/PerformanceOverview'
import VisitsByDay from '@views/pages/widget-examples/charts/VisitsByDay'
import OrganicSessions from '@views/pages/widget-examples/charts/OrganicSessions'
import WeeklySales from '@views/pages/widget-examples/charts/WeeklySales'
import ProjectTimeline from '@views/pages/widget-examples/charts/ProjectTimeline'
import MonthlyBudget from '@views/pages/widget-examples/charts/MonthlyBudget'
import Performance from '@views/pages/widget-examples/charts/Performance'
import ExternalLinks from '@views/pages/widget-examples/charts/ExternalLinks'
import SalesCountry from '@views/pages/widget-examples/charts/SalesCountry'
import ActivityTimeline from '@views/pages/widget-examples/charts/ActivityTimeline'
import WeeklyOverview from '@views/pages/widget-examples/charts/WeeklyOverview'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const Charts = () => {
  // Vars
  const serverMode = getServerMode()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8}>
        <TotalTransactions serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <PerformanceOverview />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <VisitsByDay serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <OrganicSessions serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <WeeklySales serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} md={8}>
        <ProjectTimeline serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MonthlyBudget />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Performance serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ExternalLinks serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SalesCountry serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} md={8}>
        <ActivityTimeline />
      </Grid>
      <Grid item xs={12} md={4}>
        <WeeklyOverview serverMode={serverMode} />
      </Grid>
    </Grid>
  )
}

export default Charts
