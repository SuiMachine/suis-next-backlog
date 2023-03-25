import { ClassAttributes, TdHTMLAttributes } from 'react'
import { Cell, ColumnInstance, Row } from 'react-table'

/*********************************************************************
 * SORTING FUNCTIONS
 *********************************************************************/
export const dateSort = (rowA, rowB, id) => {
  // I am a hack
  if (rowA.original['finished'] === 'Happening') return 1
  if (rowB.original['finished'] === 'Happening') return -1

  const a = new Date(rowA.values[id]).getTime()
  const b = new Date(rowB.values[id]).getTime()
  return a - b
}

export const scoreSort = (rowA, rowB, id) => {
  if (rowA.values[id] === rowB.values[id]) {
    return (rowB.original['title'] as string).localeCompare(rowA.original['title'] as string)
  }
  return rowA.values[id] - rowB.values[id]
}

/*********************************************************************
 * COLUMN FORMATTING
 *********************************************************************/
const COLUMN_IDS = {
  TITLE: ['title'],
  CENTERED: ['streamed', 'finishedDate', 'timeSpent', 'stealth', '_id', 'rating'],
}

export const formatCell = (cell: Cell<object, any>, row: Row<object>) => {
  const { column } = cell
  const columnId = column.id

  switch (true) {
    case COLUMN_IDS.TITLE.includes('columnId'):
      return renderCellWithProps(cell, { key: columnId + row.id })

    case COLUMN_IDS.CENTERED.includes(columnId):
      return renderCellWithProps(cell, {
        key: columnId + row.id,
        style: { textAlign: 'center' },
      })

    default:
      return renderCellWithProps(cell, { key: columnId + row.id })
  }
}

const renderCellWithProps = (cell: Cell<object, any>, props: object) => {
  return (
    <td {...cell.getCellProps()} {...props}>
      {cell.render('Cell')}
    </td>
  )
}

/*********************************************************************
 * COLUMN HEADER FORMATTING
 *********************************************************************/
const COLUMN_HEADER_IDS = {
  CONCENCED: ['streamed', 'stealth'],
  TIME_SPENT: ['timeSpent'],
}

export const formatHeader = (column: ColumnInstance<object>, isAdmin: boolean) => {
  if (column.id === '_id' && !isAdmin) return

  switch (true) {
    case COLUMN_HEADER_IDS.CONCENCED.includes(column.id):
      return (
        <th
          {...column.getHeaderProps(() => ({
            style: {
              fontStretch: 'condensed',
              paddingLeft: '8px',
              paddingRight: '8px',
              textAlign: 'center',
            },
          }))}
          key={column.id}
        >
          {column.render('Header')}
        </th>
      )

    case COLUMN_HEADER_IDS.TIME_SPENT.includes(column.id):
      return (
        <th
          {...column.getHeaderProps(() => ({
            style: {
              fontStretch: 'condensed',
              paddingLeft: '8px',
              paddingRight: '8px',
              textAlign: 'center',
            },
            ...column.getSortByToggleProps(),
          }))}
          key={column.id}
        >
          <span className='d-flex'>
            {column.render('Header')}
            <span>{column.isSorted ? (column.isSortedDesc ? ' 🔻' : ' 🔺') : ''}</span>
          </span>
        </th>
      )

    default:
      return (
        <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
          <span className='d-flex'>
            {column.render('Header')}
            <span>{column.isSorted ? (column.isSortedDesc ? ' 🔻' : ' 🔺') : ''}</span>
          </span>
        </th>
      )
  }
}
