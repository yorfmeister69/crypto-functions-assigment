/**
 * GCD Calculator
 * Computes the greatest common divisor (GCD) of two numbers using the Euclidean algorithm.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - The GCD of a and b
 */
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }