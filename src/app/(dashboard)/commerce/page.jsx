'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { createColumnHelper } from '@tanstack/react-table'

// Component Imports
import moment from 'moment/moment'
import { toast } from 'react-toastify'

// Style Imports
import Loader from '@/components/loader'
import Error from '@/components/error'
import WarningModal from '@/components/modal/warning'
import { useDeleteChallengeMutation, useGetAllChallengesQuery } from '@/redux-store/api/challenge'
import Table from '@/components/table'

// Column Definitions
const columnHelper = createColumnHelper()

const Challenges = () => {
  // States
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { data: challengesData = [], isLoading, isError } = useGetAllChallengesQuery()
  const [deleteChallenge, { isLoading: isDeleting }] = useDeleteChallengeMutation()
  const [selectedChallengeId, setSelectedChallengeId] = useState('')

  const columns = [
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
    columnHelper.accessor('purchase.amount', {
      header: 'Purchase',
      cell: ({ row }) => <Typography variant='body2'>{row?.original?.purchase?.amount || 'N/A'}</Typography>
    }),
    columnHelper.accessor('target', {
      header: 'Target',
      cell: ({ row }) => <Typography>{`$${row?.original?.target || 0}`}</Typography>
    }),
    columnHelper.accessor('starting_amount', {
      header: 'Starting Amount',
      cell: ({ row }) => <Typography>${row?.original?.starting_amount || 'N/A'}</Typography>
    }),

    columnHelper.accessor('daily_loss_limit', {
      header: 'Daily Loss Limit',
      cell: ({ row }) => <Typography>${row?.original?.daily_loss_limit}</Typography>
    }),

    columnHelper.accessor('maximum_loss_limit', {
      header: 'Minimum Loss Limit',
      cell: ({ row }) => <Typography>${row?.original?.maximum_loss_limit}</Typography>
    }),

    columnHelper.accessor('minimum_bet_size', {
      header: 'Minimum bet size',
      cell: ({ row }) => <Typography>${row?.original?.minimum_bet_size}</Typography>
    }),
    columnHelper.accessor('maximum_bet_size', {
      header: 'Maximum Bet Size',
      cell: ({ row }) => <Typography>${row?.original?.maximum_bet_size}</Typography>
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
            <Link href={`/commerce/${row.original.id}`} className='flex'>
              <i className='ri-pencil-line text-textSecondary' />
            </Link>
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setShowDeleteModal(true)
              setSelectedChallengeId(row.original.id)
            }}
          >
            <i className='ri-delete-bin-7-line text-textSecondary' />
          </IconButton>
        </div>
      ),
      enableSorting: false
    })
  ]

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error />
  }

  // delete handler

  const deleteChallengeHandler = async () => {
    try {
      await deleteChallenge(selectedChallengeId).unwrap()
      setShowDeleteModal(false)
      toast('Challenge deleted')
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
        deleteHandler={deleteChallengeHandler}
      />
      <Table btnText='Create Challenge' link='/commerce/create' tableColumns={columns} tableData={challengesData} />
    </>
  )
}

export default Challenges
