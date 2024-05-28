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
import { createColumnHelper } from '@tanstack/react-table'

// Component Imports
import moment from 'moment/moment'
import { toast } from 'react-toastify'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import Loader from '@/components/loader'
import Error from '@/components/error'
import WarningModal from '@/components/modal/warning'
import { useDeletePurchaseMutation, useGetAllPurchasesQuery } from '@/redux-store/api/purchase'
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

const Purchases = () => {
  // States
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { data: purchasesData, isLoading, isError } = useGetAllPurchasesQuery()
  const [deletePurchase, { isLoading: isDeleting }] = useDeletePurchaseMutation()
  const [selectedPurchaseId, setSelectedPurchaseId] = useState('')

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
        cell: ({ renderValue }) => <Typography variant='body2'>{renderValue()}</Typography>
      }),
      columnHelper.accessor('product', {
        header: 'Product',
        cell: ({ row }) => <Typography variant='body2'>{row?.original?.product || 'N/A'}</Typography>
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: ({ row }) => <Typography>{`$${row?.original?.amount || 0}`}</Typography>
      }),
      columnHelper.accessor('payment_method', {
        header: 'Payment Method',
        cell: ({ row }) => <Typography>{row?.original?.payment_method || 'N/A'}</Typography>
      }),

      columnHelper.accessor('payment_status', {
        header: 'Status',
        cell: ({ row }) => <Chip variant='tonal' label={row?.original?.payment_status} color='success' size='small' />
      }),

      columnHelper.accessor('date', {
        header: 'Date',
        cell: ({ row }) => <Typography>{moment(row.original.created_at).format('DD-MM-YYYY ')}</Typography>
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-0.5'>
            {/* <IconButton size='small'>
              <Link href={`/apps/invoice/preview/${row.original.id}`} className='flex'>
                <i className='ri-eye-line text-textSecondary' />
              </Link>
            </IconButton> */}
            <IconButton size='small'>
              <Link href={`/purchases/${row.original.id}`} className='flex'>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

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
      toast('Purchase deleted')
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
      <Table title='Purchases' tableColumns={columns} tableData={purchasesData} />
    </>
  )
}

export default Purchases
