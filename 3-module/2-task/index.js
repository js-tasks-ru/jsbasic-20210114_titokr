/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  // ваш код...
  let resultArr =[];
  for (let num of arr) {
    if (num >= a && num <= b) {
      resultArr.push(num);
    }
  }
  return resultArr;
}