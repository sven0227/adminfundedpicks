// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import CardStatHorizontal from '@components/card-statistics/Horizontal'

const Horizontal = ({ data }) => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CardStatHorizontal {...item} avatarIconSize={24} avatarSkin='light' />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default Horizontal
