'use client'

// React Imports
import { useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
// Style Imports
import { challenge_status } from '@/utils/apiUrls'
import Table from '../table'
import { currencyFormatter } from '@/app/(dashboard)/utils'

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

const WithdrawTable = ({ data, title }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const columns = useMemo(
    () => [
      columnHelper.accessor('user.username', {
        header: 'Username',
        cell: ({ row }) => {
          return <Typography variant='body2'>{row.original.user.username}</Typography>
        }
      }),
      columnHelper.accessor('purchase.product', {
        header: 'Product',
        cell: ({ row }) => <Typography variant='body2'>{row.original.purchase?.product || 'N/A'}</Typography>
      }),
      columnHelper.accessor('starting_amount', {
        header: 'Starting Amount',
        cell: ({ row }) => <Typography>{`${currencyFormatter.format(row.original.starting_amount)}`}</Typography>
      }),
      columnHelper.accessor('target', {
        header: 'Target',
        cell: ({ row }) => <Typography>{`${currencyFormatter.format(row.original.target)}`}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip variant='tonal' className='capitalize' label={row?.original?.status} color='success' size='small' />
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-0.5'>
            <IconButton
              size='small'
              onClick={() => localStorage.setItem(challenge_status, JSON.stringify(row.original))}
            >
              <Link href={`/withdrawal-profit/${row.original.id}`} className='flex'>
                <i className='ri-eye-line text-textSecondary' />
              </Link>
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
    data: data ? data : [],
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

  return <Table tableColumns={columns} tableData={data} title={title} />
}

export default WithdrawTable
