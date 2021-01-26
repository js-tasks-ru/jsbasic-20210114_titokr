/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  // ваш код...
  let numberArr = [],
      num,
      result = {};

  function findMin(arr) {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
      min = (arr[i]<min) ? arr[i] : min;
    }
    return min;
  }

  function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      max = (arr[i]>max) ? arr[i] : max;
    }
    return max;
  }

  for (let subStrWithoutSpace of str.split(' ')) {
    for (let subStr of subStrWithoutSpace.split(',')) {
      num = parseFloat(subStr);
      if (!isNaN(num)) {
        numberArr.push(num);
      }
    }
  }
  
  result.min = findMin(numberArr);
  result.max = findMax(numberArr);

  return result;
}
