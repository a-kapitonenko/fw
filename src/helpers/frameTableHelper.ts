export function getPaperStyle(
  rowHeight: number,
  rowsPerPage: number
): React.CSSProperties {
  return {
    height: 57 + rowHeight * rowsPerPage,
  };
}

export function getProgressStyle(
  scrollHeight: number
): React.CSSProperties {
  return {
    position: 'absolute',
    top: `calc(50% + ${scrollHeight}px - 24px)`,
    left: 'calc(50% - 24px)',
  };
}

export function getRowStyle(
  rowHeight: number,
  emptyRows: number
): React.CSSProperties {
  return {
    height: rowHeight * emptyRows,
  };
};
