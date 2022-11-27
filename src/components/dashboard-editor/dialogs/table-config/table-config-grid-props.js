import DeleteButton from "../../../ag-grid/cell-renderers/DeleteButton"

export const columnDefs = [
  {
    headerName: 'Columns',
    children: [
      { headerName: 'Field', field: 'field' },
      {
        headerName: 'Checkbox Selection',
        field: 'checkboxSelection',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: [true, false] }
      },
      { headerName: 'Type', field: 'type' }
    ]
  },
  {
    headerName: 'Columns: Display',
    children: [
      {
        headerName: 'Hide',
        field: 'hide',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: [true, false] }
      }
    ]
  },
  {
    headerName: 'Columns: Filter',
    children: [
      {
        headerName: 'Filter',
        field: 'filter',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['agNumberColumnFilter', 'agTextColumnFilter', 'agDateColumnFilter'] }
      }
    ]
  },
  {
    headerName: 'Columns: Header',
    children: [
      { headerName: 'Header Name', field: 'headerName' },
      {
        headerName: 'Wrap Header Text',
        field: 'wrapHeaderText',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: [true, false] }
      },
      {
        headerName: 'Auto Header Height',
        field: 'autoHeaderHeight',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: [true, false] }
      },
      {
        headerName: 'Header Checkbox Selection',
        field: 'headerCheckboxSelection',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: [true, false] }
      }
    ]
  },
  {
    headerName: 'Columns: Pinned',
    children: [
      {
        headerName: 'Pinned',
        field: 'pinned',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['left', 'right', null] }
      }
    ]
  },
  {
    headerName: 'Columns: Sort',
    children: [
      {
        headerName: 'Sortable',
        field: 'sortable',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: [true, false] }
      },
      {
        headerName: 'Sort',
        field: 'sort',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['asc', 'desc', null] }
      },
      {
        headerName: 'Sort Index',
        field: 'sortIndex'
      }
    ]
  },
  {
    headerName: 'Columns: Width',
    children: [
      { headerName: 'Flex', field: 'flex' },
      { headerName: 'Width', field: 'width' },
      {
        headerName: 'Resizable',
        field: 'resizable',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: [true, false] }
      }
    ]
  },
  {
    headerName: 'Actions',
    children: [
      {
        headerName: 'Delete',
        cellRenderer: DeleteButton,
        pinned: 'left',
        width: 70
      }
    ]
  }
]

export const defaultColDef = {
  editable: true,
  flex: 1,
  resizable: true,
  autoHeaderHeight: true,
  wrapHeaderText: true
}