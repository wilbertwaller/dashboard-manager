import { AgGridReact } from 'ag-grid-react'
import React from 'react'

export default function Table({ columnDefs, defaultColDef, title }) {
  return (<>
    { title && <h3>{ title }</h3> }
    <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
      <AgGridReact
        rowData={[]}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  </>)
}
