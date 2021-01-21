/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  // ваш код...
  let sumSalaries = 0;
  for (let key in salaries) {
    if (typeof(salaries[key]) === 'number' && isFinite(salaries[key]) && !isNaN(salaries[key])) {
      sumSalaries += salaries[key];
    }
  }
  return sumSalaries;
}
