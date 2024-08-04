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
  const [globalFilter, setGlobalFilter] = useState('');
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    if (challengeStatusData) {
      const inProgress = challengeStatusData.filter((item) => {
        if (item.stats.profit > 0) {
          return item
        }
        else if (item.stats.profit <= 0) {
          if (Math.abs(item.stats.profit) < item.stats.maximum_loss){
            const objectClone = { ...item };
            objectClone.status = 'active';
            return objectClone;
          }
        }
        return null;  // Explicitly return null for items that don't meet the criteria
      }).filter(item => item !== null); // Filter out null items

      setUpdatedData(inProgress);
    }
  }, [challengeStatusData]);

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error />
  }

  // delete handler
  return <WithdrawTable data={updatedData} title='In Progress accounts' />
}

export default InprogressAccount
