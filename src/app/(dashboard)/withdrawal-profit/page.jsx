'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { rankItem } from '@tanstack/match-sorter-utils'
import { createColumnHelper } from '@tanstack/react-table'

// Component Imports
import { useGetChallengeStatusQuery } from '@/redux-store/api/challenge-status'
import Loader from '@/components/loader'
import Error from '@/components/error'
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

const WithdrawProfits = () => {
  // States
  const { data: challengeStatusData, isLoading, isError } = useGetChallengeStatusQuery()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error />
  }

  // delete handler
  return <WithdrawTable data={challengeStatusData} title='Withdrawal Profits' />
}

export default WithdrawProfits
