// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import PurchaseTable from './Table'
import Create from './create/page'

const Purchases = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PurchaseTable invoiceData={[]} />
      </Grid>
    </Grid>
  )
}

export default Purchases
