'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'

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
import moment from 'moment/moment'
import { toast } from 'react-toastify'

// Style Imports
import Loader from '@/components/loader'
import Error from '@/components/error'
import WarningModal from '@/components/modal/warning'
import { useDeleteBetMutation, useGetAllBetsQuery } from '@/redux-store/api/bet'
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

const Bets = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { data: betsData, isLoading, isError } = useGetAllBetsQuery()
  const [deletePurchase, { isLoading: isDeleting }] = useDeleteBetMutation()
  const [selectedPurchaseId, setSelectedPurchaseId] = useState('')

  const [globalFilter, setGlobalFilter] = useState('')

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
        header: 'User',
        cell: ({ row }) => {
          return <Typography variant='body2'>{row.original?.user?.username || 'N/A'}</Typography>
        }
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: ({ row }) => <Typography variant='body2'>{row?.original?.type || 'N/A'}</Typography>
      }),
      columnHelper.accessor('team', {
        header: 'Team',
        cell: ({ row }) => <Typography variant='body2'>{row?.original?.team || 'N/A'}</Typography>
      }),
      columnHelper.accessor('other_team', {
        header: 'Other Team',
        cell: ({ row }) => <Typography>{row?.original?.other_team || 'N/A'}</Typography>
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: ({ row }) => <Typography>${row?.original?.price || 'N/A'}</Typography>
      }),
      columnHelper.accessor('stake', {
        header: 'Stake',
        cell: ({ row }) => <Typography>${row.original.stake}</Typography>
      }),
      columnHelper.accessor('balance_after_bet', {
        header: 'Balance After Bet',
        cell: ({ row }) => <Typography>${row?.original?.balance_after_bet || 'N/A'}</Typography>
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Table tableData={betsData} tableColumns={columns} title='Events/Trades' />
    </>
  )
}

export default Bets
