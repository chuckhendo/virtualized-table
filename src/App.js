import React, { useState, useCallback } from 'react';

import generateContent from './generateContent';
import './App.css';
import Table from './Table';

const initialContent = generateContent();

function App() {
  const [content, setContent] = useState(initialContent);
  const [sortAsc, setSortAsc] = useState(true);

  const updateContent = useCallback((value, rowId, colIndex) => {
    setContent(content => {
      const rowIndex = content.findIndex(row => row.id === rowId);
      const newCols = content[rowIndex].data.map((col, index) => {
        if (index === colIndex) {
          return value;
        }

        return col;
      });
      const newRow = { ...content[rowIndex], data: newCols };
      return content.map((row, index) => {
        if (index === rowIndex) {
          return newRow;
        }

        return row;
      });
    });
  }, []);

  const sortedContent = [...content].sort((rowA, rowB) => {
    if (sortAsc) {
      return rowA.id.localeCompare(rowB.id);
    }

    return rowB.id.localeCompare(rowA.id);
  });

  function sort() {
    setSortAsc(!sortAsc);
  }

  return (
    <>
      <button onClick={sort}>Sort</button>
      <Table content={sortedContent} onChange={updateContent} />
    </>
  );
}

export default App;
