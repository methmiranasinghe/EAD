import React from 'react'

function Table({columns=  [] , rows = [] , onClick = () => {}  , rowAccessor = []}) {
 
  return (
    <div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            {
                columns.map(col => <th key={col}>{col}</th>)
            }
          </tr>
        </thead>
        <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}  onClick={() => onClick(row)}>
            {rowAccessor.map((accessor) => (
              <td key={`${rowIndex}-${accessor}`}>{row[accessor] instanceof Date ? row[accessor].toDateString(): row[accessor]}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table