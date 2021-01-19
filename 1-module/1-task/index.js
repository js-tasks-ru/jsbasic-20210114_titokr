/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  // ваш код...
  let result = 1;
  for (let i = 1; i <= n ; i++) {
    result = result * i;
  }
  return result;
}
