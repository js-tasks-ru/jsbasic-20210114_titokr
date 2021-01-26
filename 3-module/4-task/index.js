/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  // ваш код...
  let usersSalaryArr = [];      

  for (let elem of users) {
    if (elem.age <= age) {
      usersSalaryArr.push(`${elem.name}, ${elem.balance}`);
    }
  }
  return usersSalaryArr.join('\n');
}
