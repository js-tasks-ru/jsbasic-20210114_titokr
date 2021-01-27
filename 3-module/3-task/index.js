/**
 * @param {string} str
 * @returns {string}
 */
/*
function camelize(str) {
  // ваш код...
  let subStrAsArr = [],
      resultStr = '';
      
  str.split('-').forEach((item, index) => {
    if (index > 0) {
      subStrAsArr = item.split('');
      subStrAsArr[0] = subStrAsArr[0].toUpperCase();
      resultStr += subStrAsArr.join('');
    } else {
      resultStr += item;
    }
  });
  return resultStr;
}
*/
// без использования промежуточного разбиения/слияния строки в массив. Так короче, читабельнее и понятнее
function camelize(str) {
  // ваш код...
  let resultStr = '';
      
  str.split('-').forEach((itemStr, index) => {
    if (index > 0) {
      resultStr += itemStr[0].toUpperCase() + itemStr.slice(1);
    } else {
      resultStr += itemStr;
    }
  });
  return resultStr;
}