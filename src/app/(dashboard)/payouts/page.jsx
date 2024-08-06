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
import { useGetAllPayoutsQuery } from '../../../redux-store/api/payout'
import Loader from '@/components/loader'
import Error from '@/components/error'
import WarningModal from '@/components/modal/warning'
import CustomModal from '@/components/modal'
import Table from '@/components/table'
import { convertDateFormat, currencyFormatter } from '../utils'

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

const Payouts = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { data: payoutsData, isLoading, isError } = useGetAllPayoutsQuery()
  const [selectedUserId, setSelectedUserId] = useState('')
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [applications, setApplications] = useState();
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('date', {
        header: 'Date',
        cell: ({ row }) => {
            return <Typography variant='body2'>{new Date(row.original.date_initiated).toLocaleString('en-US', options)}</Typography>
        }
      }),
      columnHelper.accessor('user', {
        header: 'user',
        cell: ({ row }) => <Link href={`/payouts/${row.original.user.id}/${row.original.id}`} className='flex' title='Payouts'><Typography>{row.original.user.first_name + ' ' + row.original.user.last_name}</Typography></Link>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => <Typography variant='body2'>{row.original?.status === 'approved' ? "APPROVED" : row.original?.status === 'pending' ? "PENDING" : "DENIED"}</Typography>
      }),
      columnHelper.accessor('requested_amount', {
        header: 'Amount',
        cell: ({ row }) => {
          return <Typography variant='body2'>${row.original.requested_amount}</Typography>
        }
      })
    ],
    []
  )

  const table = useReactTable({
    data: payoutsData ? payoutsData : [],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <Table tableColumns={columns} tableData={[...payoutsData].sort((a, b) => new Date(a.date_initiated) - new Date(b.date_initiated))} />
    </>
  )
}

export default Payouts
