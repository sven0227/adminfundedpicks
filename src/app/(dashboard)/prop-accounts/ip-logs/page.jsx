'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import { Box, DialogContent, DialogTitle, Divider, Stack } from '@mui/material'
import moment from 'moment/moment'
import { toast } from 'react-toastify'

// Style Imports
import { useDeleteUserMutation, useGetAllUsersQuery } from '@/redux-store/api/user'
import Loader from '@/components/loader'
import Error from '@/components/error'
import WarningModal from '@/components/modal/warning'
import CustomModal from '@/components/modal'
import Table from '@/components/table'

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

const Approved = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { data: usersData, isLoading, isError } = useGetAllUsersQuery()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const [selectedUserId, setSelectedUserId] = useState('')
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  const columns = useMemo(
    () => [
      columnHelper.accessor('username', {
        header: 'Username',
        cell: ({ row }) => {
          return <Typography variant='body2'>{row?.original?.username}</Typography>
        }
      }),
      columnHelper.accessor('ip', {
        header: 'IP Address',
        cell: ({ row }) => <Typography variant='body2'>{row?.original?.geo_data?.ip}</Typography>
      }),
      columnHelper.accessor('city', {
        header: 'City',
        cell: ({ row }) => <Typography>{row?.original?.geo_data?.city}</Typography>
      }),
      columnHelper.accessor('country', {
        header: 'Country',
        cell: ({ row }) => <Typography>{row.original?.geo_data?.country_name}</Typography>
      }),
      columnHelper.accessor('isp', {
        header: 'ISP',
        cell: ({ row }) => <Typography>{row.original?.geo_data?.isp}</Typography>
      }),
      columnHelper.accessor('date_joined', {
        header: 'Date Joined',
        cell: ({ row }) => <Typography>{moment(row.original?.date_joined).format('DD-MM-YYYY ')}</Typography>
      })
    ],
    []
  )

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <Table tableColumns={columns} tableData={usersData.filter((user) => user.geo_data.country_name.length > 0)} />
    </>
  )
}

export default Approved

export const Info = ({ title, subtitle, isLast = false }) => {
  return (
    <>
      <Box display='flex' width='100%' justifyContent='space-between'>
        <Typography className='h4' fontWeight='600'>
          {title}
        </Typography>
        <Typography className='h6'>{subtitle}</Typography>
      </Box>
      {!isLast && <Divider />}
    </>
  )
}
