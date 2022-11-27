import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useFormikContext } from 'formik'
import { filter } from 'lodash'
import React from 'react'

export default function DeleteButton(props) {
  const { values, setFieldValue } = useFormikContext()
  const { rowIndex } = props

  const removeRow = () => {
    const columnDefs = filter(values.columnDefs, (row, i) => i !== rowIndex)
    setFieldValue('columnDefs', columnDefs)
  }

  return (
    <IconButton
      color='error'
      size='small'
      onClick={removeRow}
    >
      <Delete />
    </IconButton>
  )
}
