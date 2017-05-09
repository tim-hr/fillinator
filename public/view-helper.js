/*************************/
/* The recursive function
/*************************/
const fill = function(col, row, replaceColor, fillColor) {
  const cell = document.getElementById(`${col}:${row}`);

  // base condition: invalid cell to fill
  // 1. we are beyond the image boundaries OR
  // 2. this cell color isn't targeted for replacement
  if (!cell || cell.style.backgroundColor !== replaceColor) {
    return;
  }

  // Fill this cell.
  cell.style.backgroundColor = fillColor;

  // Recurse in all cardinal directions.
  fill(col + 1, row, replaceColor, fillColor);
  fill(col - 1, row, replaceColor, fillColor);
  fill(col, row - 1, replaceColor, fillColor);
  fill(col, row + 1, replaceColor, fillColor);
};
