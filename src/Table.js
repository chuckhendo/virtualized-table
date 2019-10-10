import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import getStringWidth from './getStringWidth';

const Input = styled.input`
  font-size: 16px;
  font-family: 'Helvetica Neue';
`;

export default function Table({ content, onChange }) {
  const columnWidths = useMemo(() => {
    return content[0].data.map((_, colIndex) => {
      const rowColumnWidths = content.map(row => {
        return getStringWidth(row.data[colIndex]);
      });

      return Math.max(...rowColumnWidths);
    });
  }, [content]);

  const gridRef = useRef();

  function updateContent(e) {
    const { rowId, col: colIndexString } = e.target.dataset;
    const colIndex = parseInt(colIndexString);
    onChange(e.target.value, rowId, colIndex);

    gridRef.current.resetAfterColumnIndex(colIndex);
  }

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
          {Cell}
        </Grid>
      )}
    </AutoSizer>
  );
}

const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const { content, updateContent } = data;
  const row = content[rowIndex];
  return (
    <Input
      style={style}
      value={row.data[columnIndex]}
      data-col={columnIndex}
      data-row-id={row.id}
      onChange={updateContent}
    />
  );
};
