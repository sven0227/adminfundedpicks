import WarningModal from '@/components/modal/warning'
import { useDeleteUserMutation } from '@/redux-store/api/user'
import { IconButton } from '@mui/material'
import { useState } from 'react'

const Delete = ({ id }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const deleteHandler = async () => {
    try {
      await deleteHandler(id)
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
        deleteHandler={deleteHandler}
      />
      <IconButton
        size='small'
        onClick={() => {
          setShowDeleteModal(true)
        }}
      >
        <i className='ri-delete-bin-7-line text-textSecondary' />
      </IconButton>
    </>
  )
}

export default Delete
