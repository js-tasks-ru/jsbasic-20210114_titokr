/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  function getNumCell(inner, row) {
    for (let i = 0; i < row.cells.length; i++) {
      if (row.cells[i].innerHTML === inner) {
        return i;
      }
    }
  }

  for (let row of table.tBodies[0].rows) {
    let cell = row.cells[getNumCell('Status', table.tHead.rows[0])];
    if (cell.hasAttribute('data-available')) {          
      row.classList.add((cell.dataset.available === 'true') ? 'available' : 'unavailable');
    } else {
      row.setAttribute('hidden', '');
    }

    cell = row.cells[getNumCell('Gender', table.tHead.rows[0])];
    row.classList.add((cell.innerHTML === 'm') ? 'male' : 'female');

    cell = row.cells[getNumCell('Age', table.tHead.rows[0])];
    row.style.textDecoration = (+cell.innerHTML < 18) ? 'line-through' : '';

  }
}
