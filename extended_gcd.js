/**
 * Extended Euclidean Algorithm
 * This function computes the Greatest Common Divisor (GCD) of two numbers 'a' and 'b',
 * along with the coefficients (s and t) of the Bézout's identity, i.e., as + bt = gcd(a, b).
 * It stores each step of the algorithm including intermediate s and t values.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {Array} - An array of objects representing each step of the algorithm.
 */
function extendedEuclidean(a, b) {
    let steps = [];  // Array to store each step of the algorithm
  
    /**
     * Recursive helper function for the Extended Euclidean Algorithm.
     * @param {number} a - The first number.
     * @param {number} b - The second number.
     * @returns {Array} - Array containing the coefficients x, y, gcd, s1, s2, s3, t1, t2, t3.
     */
    function _extendedEuclidean(a, b) {
      if (b === 0) {
        // Base case: if b is 0, gcd is a and coefficients s = 1, t = 0
        return [1, 0, a, 1, 0, 0, 1];  // Initial values for s and t coefficients
      }
  
      let [x1, y1, gcd, s2, t2, s1, t1] = _extendedEuclidean(b, a % b);
      let x = y1;
      let y = x1 - Math.floor(a / b) * y1;
      let remainder = a % b;
  
      // Calculate s3 and t3 for the current step using previous step's values
      let s3 = s2 - Math.floor(a / b) * s1;
      let t3 = t2 - Math.floor(a / b) * t1;
  
      // Store the current step with all relevant values
      steps.push({ quotient: Math.floor(a / b), a, b, remainder, s1, s2, s3, t1, t2, t3, gcd });
  
      return [x, y, gcd, s3, t3, s2, t2];
    }
  
    _extendedEuclidean(a, b); // Start the recursive process
    return steps; // Return the array of steps after completion
  }
  

  /**
 * Displays the steps of the Extended Euclidean Algorithm in a table format.
 * This function takes two numbers 'a' and 'b', executes the Extended Euclidean Algorithm,
 * and then creates an HTML table to display each step of the process.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 */
function displayExtendedEuclideanSteps(a, b) {
    let steps = extendedEuclidean(a, b); // Execute the algorithm to get all steps
    let tableHTML = `<table border="1">
    <tr>
    <th>Quotient</th>
    <th>a</th>
    <th>b</th>
    <th>Remainder</th>
    <th>s1</th>
    <th>s2</th>
    <th>s3</th>
    <th>t1</th>
    <th>t2</th>
    <th>t3</th>
  </tr>`;
  
    // Loop through each step and add a row to the table for that step
    for (let step of steps) {
      tableHTML += `<tr>
      <td>${step.quotient}</td>
      <td>${step.a}</td>
      <td>${step.b}</td>
      <td>${step.remainder}</td>
      <td>${step.s1}</td>
      <td>${step.s2}</td>
      <td>${step.s3}</td>
      <td>${step.t1}</td>
      <td>${step.t2}</td>
      <td>${step.t3}</td>
      </tr>`;
    }
  
    tableHTML += `</table>`;
    document.getElementById('result').innerHTML = tableHTML; // Display the table in the 'result' element
  }
  