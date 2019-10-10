import React, { useState, useMemo, useRef } from 'react';

import generateContent from './generateContent';
import './App.css';
import Table from './Table';

const initialContent = generateContent();

function App() {
  const [content, setContent] = useState(initialContent);
  const [sortAsc, setSortAsc] = useState(true);

  const sortedContent = [...content].sort((rowA, rowB) => {
    if (sortAsc) {
      return rowA.data[0].localeCompare(rowB.data[0]);
    }

    return rowB.data[0].localeCompare(rowA.data[0]);
  });

  function sort() {
    setSortAsc(!sortAsc);
  }

  function updateContent(value, rowId, colIndex) {
    const rowIndex = content.findIndex(row => row.id === rowId);
    const newCols = content[rowIndex].data.map((col, index) => {
      if (index === colIndex) {
        return value;
      }

      return col;
    });
    const newRow = { ...content[rowIndex], data: newCols };
    const newContent = content.map((row, index) => {
      if (index === rowIndex) {
        return newRow;
      }

      return row;
    });

    setContent(newContent);
  }

  return (
    <>
      <button onClick={sort}>Sort</button>
      <Table content={sortedContent} onChange={updateContent} />
    </>
  );
}

export default App;
