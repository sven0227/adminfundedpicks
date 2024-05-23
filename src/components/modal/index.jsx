import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import { IconButton } from '@mui/material'

export default function CustomModal({ open, setOpen, children, fullWidth, maxWidth = 'md', scroll = 'body' }) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} scroll={scroll} fullWidth={fullWidth}>
      <IconButton onClick={handleClose} className='absolute block-start-4 inline-end-4'>
        <i className='ri-close-line text-textSecondary' />
      </IconButton>
      {children}
    </Dialog>
  )
}
