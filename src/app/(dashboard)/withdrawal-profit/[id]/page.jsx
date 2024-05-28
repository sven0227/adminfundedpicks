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
    <Grid container spacing={4}>
      <Grid item sm={12} md={4}>
        <Typography variant='h5'>User Information</Typography>
        <Card className='mt-3'>
          <CardContent>
            <Stack spacing={2}>
              <Info title='Username' subtitle={username} />
              <Info title='Email' subtitle={email} />
              <Info title='Funds' subtitle={`$${funds}`} />
              <Info title='Account Value' subtitle={`$${account_value}`} />
              <Info title='Alv' subtitle={alv} />
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
          {[
            { title: 'Account Balance', value: `$${account_balance}` },
            { title: 'Progress', value: `${progress_percentage}%` },
            { title: 'ALV', value: `${ALV}` },
            { title: 'Number of Bets', value: `${num_bets}` },
            { title: 'Profit Percentage', value: `${profit_percent}%` },
            { title: 'Bet Status', value: `${min_bets_status}` },
            { title: 'Profit', value: `$${profit}` },
            { title: 'Daily Loss', value: `$${max_daily_loss}` },
            { title: 'Loss', value: `$${maximum_loss}` }
          ].map(({ title, value }, i) => (
            <Grid key={i} item sm={12} md={4}>
              <Stats title={title} value={value} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <WeeklyOverview
          categories={Object.keys(daily_nets).map(date => moment(date).format('DD-MM-YY'))}
          sales={Object.values(daily_nets)}
        />
      </Grid>
    </Grid>
  )
}

export default WidthdrawDetails
