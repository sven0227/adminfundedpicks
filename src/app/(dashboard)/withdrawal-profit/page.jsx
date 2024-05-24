'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'

import Tooltip from '@mui/material/Tooltip'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import classnames from 'classnames'
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

// Component Imports
import { Box, DialogContent, DialogTitle, Divider, Grid, Paper, Stack } from '@mui/material'
import moment from 'moment/moment'
import { toast } from 'react-toastify'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { useGetChallengeStatusQuery } from '@/redux-store/api/challenge-status'
import Loader from '@/components/loader'
import Error from '@/components/error'
import WarningModal from '@/components/modal/warning'
import DebouncedInput from '@/components/debounced-input'
import CustomModal from '@/components/modal'
import { useDeleteUserMutation } from '@/redux-store/api/user'
import { challenge_status } from '@/utils/apiUrls'

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

const WithdrawProfits = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { data: challengeStatusData, isLoading, isError } = useGetChallengeStatusQuery()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const [selectedUserId, setSelectedUserId] = useState('')
  const [showDetailModal, setShowDetailModal] = useState(false)
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
      columnHelper.accessor('invoiceStatus', {
        header: 'Username',
        cell: ({ row }) => {
          return <Typography variant='body2'>{row.original.user.username}</Typography>
        }
      }),
      columnHelper.accessor('product', {
        header: 'Product',
        cell: ({ row }) => <Typography variant='body2'>{row.original.purchase?.product || 'N/A'}</Typography>
      }),
      columnHelper.accessor('startingAmount', {
        header: 'Starting Amount',
        cell: ({ row }) => <Typography>{`$${row.original.starting_amount}`}</Typography>
      }),
      columnHelper.accessor('target', {
        header: 'Target',
        cell: ({ row }) => <Typography>{`$${row.original.target}`}</Typography>
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
    data: challengeStatusData ? challengeStatusData : [],
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

  const getAvatar = params => {
    // Vars
    // const { avatar, name } = params
    // if (avatar) {
    //   return <CustomAvatar src={avatar} skin='light' size={34} />
    // } else {
    //   return (
    //     <CustomAvatar skin='light' size={34}>
    //       {/* {getInitials(name)} */}
    //     </CustomAvatar>
    //   )
    // }
  }

  // useEffect(() => {
  //   const filteredData = []?.filter(invoice => {
  //     if (status && invoice.invoiceStatus.toLowerCase().replace(/\s+/g, '-') !== status) return false

  //     return true
  //   })

  //   setData(filteredData)
  // }, [status, [], setData])

  if (isLoading) {
    return <Loader />
  }

  // if (isError) {
  //   return <Error />
  // }

  // delete handler

  const deleteUserHandler = async () => {
    try {
      await deleteUser(selectedUserId).unwrap()
      setShowDeleteModal(false)
      toast('User deleted')
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
        deleteHandler={deleteUserHandler}
      />
      <CustomModal fullWidth maxWidth='sm' open={showDetailModal} setOpen={setShowDetailModal}>
        <Box>
          <DialogTitle variant='h5'>User Information</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Info title='Username' subtitle={selectedUser?.username} />
              <Info title='Email' subtitle={selectedUser?.email} />
              <Info title='Funds' subtitle={`$${selectedUser?.funds}`} />
              <Info title='Account Value' subtitle={`$${selectedUser?.account_value}`} />
            </Stack>
          </DialogContent>
        </Box>
      </CustomModal>

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent className='flex justify-between flex-col sm:flex-row gap-4 flex-wrap items-start sm:items-center'>
              <Typography variant='h5'>Withdrawal Profits</Typography>
              <div className='flex items-center flex-col sm:flex-row is-full sm:is-auto gap-4'>
                <DebouncedInput
                  value={globalFilter ?? ''}
                  onChange={value => setGlobalFilter(String(value))}
                  placeholder='Search ...'
                  className='is-full sm:is-auto min-is-[250px]'
                />
              </div>
            </CardContent>
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {header.isPlaceholder ? null : (
                            <>
                              <div
                                className={classnames({
                                  'flex items-center': header.column.getIsSorted(),
                                  'cursor-pointer select-none': header.column.getCanSort()
                                })}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                  asc: <i className='ri-arrow-up-s-line text-xl' />,
                                  desc: <i className='ri-arrow-down-s-line text-xl' />
                                }[header.column.getIsSorted()] ?? null}
                              </div>
                            </>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                {table.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                        No data available
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {table
                      .getRowModel()
                      .rows.slice(0, table.getState().pagination.pageSize)
                      .map(row => {
                        return (
                          <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                            {row.getVisibleCells().map(cell => (
                              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                          </tr>
                        )
                      })}
                  </tbody>
                )}
              </table>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component='div'
              className='border-bs'
              count={challengeStatusData ? challengeStatusData.length : []}
              rowsPerPage={table.getState().pagination.pageSize}
              page={table.getState().pagination.pageIndex}
              onPageChange={(_, page) => {
                table.setPageIndex(page)
              }}
              onRowsPerPageChange={e => console.log(e, 'in ...')}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default WithdrawProfits

const Info = ({ title, subtitle }) => {
  return (
    <>
      <Box display='flex' width='100%' justifyContent='space-between'>
        <Typography className='h4'>{title}</Typography>
        <Typography className='h6'>{subtitle}</Typography>
      </Box>
      <Divider />
    </>
  )
}
