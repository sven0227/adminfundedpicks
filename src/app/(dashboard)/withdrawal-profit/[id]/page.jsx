'use client'
import { challenge_status } from '@/utils/apiUrls'
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Stats from '../components/Cards'
import { Info } from '../../users/page'
import Loader from '@/components/loader'
import moment from 'moment'
import WeeklyOverview from '../components/TotalSpending'
import Loss from '../components/Loss'
import Profits from '../components/Profits'
import Progress from '../components/Progress'
import Account from '../components/Account'

const WidthdrawDetails = () => {
  const [isChecking, setIsChecking] = useState(true)
  const [challengeStatusData, setChallengeStatusData] = useState(null)
  const router = useRouter()

  const checkStatus = async () => {
    const challengeStatus = localStorage.getItem(challenge_status)
    if (challengeStatus) {
      setChallengeStatusData(JSON.parse(challengeStatus))
      setIsChecking(false)
    } else {
      router.replace('/withdrawal-profit')
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  if (isChecking) {
    return <Loader />
  }

  // Provide default values for each level of the object
  const {
    id = '',
    stats: {
      account_balance = '',
      progress_percentage = '',
      ALV = '',
      num_bets = '',
      profit_percent = '',
      min_bets_status = '',
      profit = '',
      daily_nets,
      max_daily_loss = '',
      maximum_loss = ''
    } = {},
    name = '',
    target = '',
    status = '',
    starting_amount = '',
    minimum_bets = '',
    daily_loss_limit = '',
    maximum_loss_limit = '',
    minimum_bet_size = '',
    maximum_bet_size = '',
    created_at = '',
    updated_at = '',
    user: {
      id: user_id = '',
      password = '',
      last_login = '',
      is_superuser = '',
      username = '',
      email = '',
      is_staff = '',
      is_active = '',
      date_joined = '',
      funds = '',
      account_value = '',
      first_name = '',
      last_name = '',
      sex = '',
      birthdate = '',
      address = '',
      city = '',
      state = '',
      zip = '',
      phone = '',
      country = '',
      alv = '',
      groups = [],
      user_permissions = []
    } = {},
    purchase = {}
  } = challengeStatusData || {}

  const {
    id: purchase_id = '',
    amount = '',
    product = '',
    created_at: purchase_created_at = '',
    updated_at: purchase_updated_at = '',
    payment_method = '',
    transaction_id = '',
    payment_status = '',
    user: purchase_user = ''
  } = purchase || {}

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={12} md={4}>
          <Typography variant='h5'>User Information</Typography>
          <Card className='mt-3'>
            <CardContent>
              <Stack spacing={2}>
                <Info title='Name' subtitle={first_name ? first_name + ' ' + last_name : 'N/A'} />
                <Info title='Username' subtitle={username} />
                <Info title='Email' subtitle={email} />
                <Info title='Target' subtitle={`$${target}`} />
                <Info title='Starting Amount' subtitle={`$${starting_amount}`} />
                <Info title='Date Joined' subtitle={moment(date_joined).format('DD-MM-YYYY')} />
                <Info title='Staff' subtitle={is_staff ? 'Yes' : 'No'} />
                <Info title='Active' subtitle={is_active ? 'Yes' : 'No'} isLast />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={8}>
          <Typography variant='h5'>Stats</Typography>
          <Grid container spacing={2} className='mt-1'>
            <Grid item sm={6}>
              <Account accountBalance={account_balance} profit={profit} alv={alv} funds={funds} />
            </Grid>
            <Grid item sm={6}>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <Profits profit={profit_percent} />
                </Grid>
                <Grid item sm={6}>
                  <Progress progress={progress_percentage} />
                </Grid>
                <Grid item sm={12}>
                  <Loss loss={maximum_loss} dailyLoss={max_daily_loss} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <WeeklyOverview
            categories={Object.keys(daily_nets).map(date => moment(date).format('DD-MM-YY'))}
            sales={Object.values(daily_nets)}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default WidthdrawDetails
