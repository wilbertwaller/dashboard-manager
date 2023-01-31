import { Card, CardContent, CardHeader } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import React from 'react'

export default function Table({ columnDefs, defaultColDef, title }) {
  return (
    <Card sx={{ overFlow: 'auto', height: '100%' }}>
      { title && <CardHeader className='panel-header' title={title} /> }
      <CardContent>
        <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
          <AgGridReact
            rowData={[]}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </CardContent>
    </Card>
  )
}
