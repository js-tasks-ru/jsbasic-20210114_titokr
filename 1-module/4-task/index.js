/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  // ваш код...
  if (str.toLowerCase().includes('xxx') || str.toLowerCase().includes('1xbet')) {
    return true;
  }
  return false;
}
