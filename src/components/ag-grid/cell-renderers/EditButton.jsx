import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'

export default function EditButton(props) {
  const { data, onEdit, rowIndex } = props

  const editRow = () => {
    onEdit(data, rowIndex)
  }

  return (
    <IconButton
      color='primary'
      size='small'
      onClick={editRow}
    >
      <Edit />
    </IconButton>
  )
}
