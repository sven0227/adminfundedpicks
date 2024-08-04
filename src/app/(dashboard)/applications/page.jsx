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
import { currencyFormatter } from '../utils'

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

const Applications = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { data: usersData, isLoading, isError } = useGetAllUsersQuery()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const [selectedUserId, setSelectedUserId] = useState('')
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [applications, setApplications] = useState();

  const columns = useMemo(
    () => [
      columnHelper.accessor('username', {
        header: 'Username',
        cell: ({ row }) => {
          // return <Typography variant='body2'>{row.original.username}</Typography>
            return <Link href={`/users/docs/${row.original.id}`} className='flex' title='Documents'>
              <Typography variant='body2'>{row.original.username}</Typography>
              </Link>
        }
      }),
      columnHelper.accessor('approved', {
        header: 'Approved for p2',
        cell: ({ row }) => {
          return <Typography variant='body2'>{row.original.approved_for_phase2.toString()}</Typography>
        }
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ row }) => <Typography variant='body2'>{row.original.email}</Typography>
      }),
      columnHelper.accessor('funds', {
        header: 'Funds',
        cell: ({ row }) => <Typography>{`${currencyFormatter.format(row.original.funds)}`}</Typography>
      }),
      columnHelper.accessor('date_joined', {
        header: 'Date Joined',
        cell: ({ row }) => <Typography>{moment(row.original.date_joined).format('DD-MM-YYYY ')}</Typography>
      })
    ],
    []
  )

  useEffect(() => {
    if (usersData) {
      const openApplications = usersData.filter((item) => {
        if (item.docs.length > 1) {
          return item
        }
        return null;  // Explicitly return null for items that don't meet the criteria
      }).filter(item => item !== null); // Filter out null items

      setApplications(openApplications);
    }
  }, [usersData]);

  const table = useReactTable({
    data: usersData ? usersData : [],
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
      <Table tableColumns={columns} tableData={applications} />
    </>
  )
}

export default Applications
