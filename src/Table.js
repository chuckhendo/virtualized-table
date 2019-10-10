import React, { useRef, memo, useCallback } from 'react';
import styled from 'styled-components';
import { VariableSizeGrid as Grid, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import getStringWidth from './getStringWidth';

const Input = styled.input`
  font-size: 16px;
  font-family: 'Helvetica Neue';
`;

function getAllWidths(content) {
  return content[0].data.map((_, colIndex) => {
    const rowColumnWidths = content.map(row => {
      return getStringWidth(row.data[colIndex]);
    });

    return Math.max(...rowColumnWidths);
  });
}

export default function Table({ content, onChange }) {
  const gridRef = useRef();

  const updateContent = useCallback(
    e => {
      const { rowId, col: colIndexString } = e.target.dataset;
      const colIndex = parseInt(colIndexString);
      onChange(e.target.value, rowId, colIndex);

      gridRef.current.resetAfterColumnIndex(colIndex);
    },
    [onChange]
  );

  const columnWidths = getAllWidths(content);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Grid
          columnCount={content[0].data.length}
          columnWidth={index => {
            return columnWidths[index];
          }}
          height={height}
          rowCount={content.length}
          rowHeight={index => 30}
          width={width}
          ref={gridRef}
          itemData={{ content, updateContent }}
        >
          {CellWrapper}
        </Grid>
      )}
    </AutoSizer>
  );
}

const CellWrapper = ({ columnIndex, rowIndex, style, data }) => {
  const { content, updateContent } = data;
  const row = content[rowIndex];
  const value = row.data[columnIndex];
  return (
    <Cell
      style={style}
      value={value}
      updateContent={updateContent}
      columnIndex={columnIndex}
      rowId={row.id}
    />
  );
};

const Cell = memo(({ style, value, updateContent, columnIndex, rowId }) => {
  return (
    <Input
      style={style}
      value={value}
      data-col={columnIndex}
      data-row-id={rowId}
      onChange={updateContent}
    />
  );
}, areEqual);
