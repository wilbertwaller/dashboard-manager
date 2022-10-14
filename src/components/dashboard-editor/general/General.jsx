import { Grid } from '@mui/material'
import React from 'react'
import { Text } from '../../Form'

export default function General() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Text
            label='Title'
            name='title'
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  )
}
