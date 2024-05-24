'use client'

// React Imports
import { useState, useEffect } from 'react'
// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import { createColumnHelper } from '@tanstack/react-table'

// Component Imports
import { Box, Divider, Grid } from '@mui/material'
import { useGetChallengeStatusQuery } from '@/redux-store/api/challenge-status'
import Loader from '@/components/loader'
import Error from '@/components/error'
import DebouncedInput from '@/components/debounced-input'
import WithdrawTable from '@/components/withdrawel-table'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// Column Definitions
const columnHelper = createColumnHelper()

const InprogressAccount = () => {
  // States

  const { data: challengeStatusData, isLoading, isError } = useGetChallengeStatusQuery()
  const [globalFilter, setGlobalFilter] = useState('')

  const [challengeData, setChallengeData] = useState([])

  useEffect(() => {
    if (challengeStatusData) {
      setChallengeData(challengeStatusData?.filter(item => item.status == 'active') || [])
    }
  }, [challengeStatusData])

  // useEffect(() => {
  //   const filteredData = []?.filter(invoice => {
  //     if (status && invoice.invoiceStatus.toLowerCase().replace(/\s+/g, '-') !== status) return false

  //     return true
  //   })

  //   setData(filteredData)
  // }, [status, [], setData])

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error />
  }

  // delete handler
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent className='flex justify-between flex-col sm:flex-row gap-4 flex-wrap items-start sm:items-center'>
              <Typography variant='h5'>In Progress accounts</Typography>
              <div className='flex items-center flex-col sm:flex-row is-full sm:is-auto gap-4'>
                <DebouncedInput
                  value={globalFilter ?? ''}
                  onChange={value => setGlobalFilter(String(value))}
                  placeholder='Search ...'
                  className='is-full sm:is-auto min-is-[250px]'
                />
              </div>
            </CardContent>
            <WithdrawTable data={challengeData} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default InprogressAccount
