/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  // ваш код...

  // способ 1
  //return (str.length > 0) ? str[0].toUpperCase() + str.substr(1) : '';

  // способ 2
  let resultStr = '';
  if (str.length > 0) {
    resultStr = str[0].toUpperCase();
    for (var i = 1; i < str.length; i++) {
      resultStr = resultStr + str[i];
    }
  }
  return resultStr;
}
