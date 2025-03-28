'use client'

// React Imports
import { useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { rankItem } from '@tanstack/match-sorter-utils'
import { format, addDays } from 'date-fns'
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
import { toast } from 'react-toastify'

// Style Imports
import Loader from '@/components/loader'
import Error from '@/components/error'
import WarningModal from '@/components/modal/warning'
import { useDeleteBetMutation, useGetAllBetsQuery } from '@/redux-store/api/bet'
import Table from '@/components/table'
import { convertDateFormat, currencyFormatter } from '../utils'
import { formatDateShort, formatDateToMonthShort } from '@/views/apps/chat/utils'
import { Box } from '@mui/material'
import PickersRange from '@/components/PickersRange'

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

const Bets = () => {
  const today = new Date();
  const fifteenDaysFromToday = addDays(new Date(), 15)
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletePurchase, { isLoading: isDeleting }] = useDeleteBetMutation()
  const [selectedPurchaseId, setSelectedPurchaseId] = useState('')
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(fifteenDaysFromToday)
  const [globalFilter, setGlobalFilter] = useState('')

  const getQueryParams = (startDate, endDate) => {
    if (startDate && endDate) {
      return { startDate: convertDateFormat(startDate), endDate: convertDateFormat(endDate) };
    }
    return {};
  };

  const { data: betsData, isLoading, isError } = useGetAllBetsQuery(getQueryParams(startDate, endDate))

  const columns = useMemo(
    () => [
      columnHelper.accessor('created_at', {
        header: 'Created At',
        cell: ({ row }) => {
          return <Typography>{formatDateShort(row.original?.created_at)}</Typography>
        }
      }),
      columnHelper.accessor('user.username', {
        header: 'User',
        cell: ({ row }) => {
          return <Typography>{row.original?.user?.username || 'N/A'}</Typography>
        }
      }),
      columnHelper.accessor('team', {
        header: 'Team',
        cell: ({ row }) => <Typography>{row?.original?.team || 'N/A'}</Typography>
      }),
      columnHelper.accessor('other_team', {
        header: 'Other Team',
        cell: ({ row }) => <Typography>{row?.original?.other_team}</Typography>
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: ({ row }) => <Typography>{currencyFormatter.format(row?.original?.price) || 'N/A'}</Typography>
      }),
      columnHelper.accessor('stake', {
        header: 'Stake',
        cell: ({ row }) => <Typography>{currencyFormatter.format(row.original.stake)}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => <Typography>{(row.original.result)}</Typography>
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-0.5'>
            <IconButton size='small'>
            </IconButton>
            <IconButton size='small'>
              <Link href={`/bets/${row.original.id}`} className='flex'>
                <i className='ri-pencil-line text-textSecondary' />
              </Link>
            </IconButton>
            <IconButton
              size='small'
              onClick={() => {
                setShowDeleteModal(true)
                setSelectedPurchaseId(row.original.id)
              }}
            >
              <i className='ri-delete-bin-7-line text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    []
  )

  const table = useReactTable({
    data: betsData ? betsData : [],
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

  // delete handler

  const deletePurchaseHandler = async () => {
    try {
      await deletePurchase(selectedPurchaseId).unwrap()
      setShowDeleteModal(false)
      toast.success('Bet deleted')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <WarningModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        isLoading={isDeleting}
        deleteHandler={deletePurchaseHandler}
      />
      <Box>
        <PickersRange startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      </Box>
      <Table tableColumns={columns} tableData={betsData} link='/bets/create' btnText='Create Bet' />
    </>
  )
}

export default Bets
