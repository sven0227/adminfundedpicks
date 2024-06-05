import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { CircularProgress } from '@mui/material'

export default function WarningModal({
  title = 'Are you sure you want to delete this item?',
  open,
  setOpen,
  isLoading,
  deleteHandler
}) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Disagree
          </Button>
          <Button disabled={isLoading} onClick={deleteHandler} autoFocus>
            {isLoading ? 'Agree...' : 'Agree'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
