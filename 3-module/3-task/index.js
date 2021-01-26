/**
 * @param {string} str
 * @returns {string}
 */
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