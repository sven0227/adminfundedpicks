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
    columnHelper.accessor('package_name', {
      header: 'Package Name',
      cell: ({ row }) => <Typography>{`${row?.original?.package_name || "N/A"}`}</Typography>
    }),
    columnHelper.accessor('package_price', {
      header: 'Package Price',
      cell: ({ row }) => <Typography>${row?.original?.package_price}k</Typography>
    }),

    columnHelper.accessor('price', {
      header: 'Price',
      cell: ({ row }) => <Typography>${row?.original?.price}</Typography>
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
