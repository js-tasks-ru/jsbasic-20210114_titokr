/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
  // ваш код...
  let resulArr = [];
  for (let obj of users) {
    resulArr.push(obj.name);
  }
  return resulArr;
}
