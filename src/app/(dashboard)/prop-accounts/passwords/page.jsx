'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

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
import { Box, Divider } from '@mui/material'
import moment from 'moment/moment'

// Style Imports
import { useGetAllUsersQuery } from '@/redux-store/api/user'
import Loader from '@/components/loader'
import Error from '@/components/error'
import EditUser from './components/EditUser'
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

const Users = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const { data: usersData, isLoading, isError } = useGetAllUsersQuery()
  const [showEditModal, setShowEditModal] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  const columns = useMemo(
    () => [
      // {
      //   id: 'select',
      //   header: ({ table }) => (
      //     <Checkbox
      //       {...{
      //         checked: table.getIsAllRowsSelected(),
      //         indeterminate: table.getIsSomeRowsSelected(),
      //         onChange: table.getToggleAllRowsSelectedHandler()
      //       }}
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       {...{
      //         checked: row.getIsSelected(),
      //         disabled: !row.getCanSelect(),
      //         indeterminate: row.getIsSomeSelected(),
      //         onChange: row.getToggleSelectedHandler()
      //       }}
      //     />
      //   )
      // },
      columnHelper.accessor('user.username', {
        header: 'Username',
        cell: ({ row }) => {
          return <Typography variant='body2'>{row.original.username}</Typography>
        }
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ row }) => <Typography variant='body2'>{row.original.email}</Typography>
      }),
      columnHelper.accessor('funds', {
        header: 'Funds',
        cell: ({ row }) => <Typography>{`$${row.original.funds}`}</Typography>
      }),
      columnHelper.accessor('date_joined', {
        header: 'Date Joined',
        cell: ({ row }) => <Typography>{moment(row.original.date_joined).format('DD-MM-YYYY ')}</Typography>
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-0.5'>
            <IconButton
              size='small'
              onClick={() => {
                setShowEditModal(true)
                setSelectedUser(row.original)
              }}
            >
              <i className='ri-pencil-line text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

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
      <CustomModal fullWidth maxWidth='sm' open={showEditModal} setOpen={setShowEditModal}>
        <EditUser setShowEditModal={setShowEditModal} user={selectedUser} />
      </CustomModal>
      <Table tableColumns={columns} tableData={usersData} title='Users' />
    </>
  )
}

export default Users

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
