/**
 * Multiplies a 2x2 matrix with a 2x1 vector.
 * This function is specifically used in the Hill Cipher for encryption.
 * @param {array} matrix - A 2x2 matrix (array of arrays).
 * @param {array} vector - A 2x1 vector (array).
 * @returns {array} - The resulting 2x1 vector after multiplication.
 */
function multiplyMatrices(matrix, vector) {
  const result = [0, 0];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      // Multiply the matrix element by the corresponding vector element and add to the result.
      result[i] += matrix[i][j] * vector[j];
    }
  }
  return result;
}

/**
 * Hill Cipher Encryption (2x2 Matrix Key)
 * Encrypts a 2-character string using a 2x2 matrix key.
 * Note: This is a simple version and does not handle all edge cases.
 * @param {string} text - The text to encrypt (2 characters)
 * @param {array} key - The 2x2 matrix key for encryption
 * @returns {string} - The encrypted text
 */
function hillCipherEncrypt(text, key) {
  // Convert text to numerical values (A=0, B=1, ..., Z=25)
  text = text.toUpperCase(); //to ignore case
  const messageVector = [
    text.charCodeAt(0) - "A".charCodeAt(0),
    text.charCodeAt(1) - "A".charCodeAt(0),
  ];
  const encryptedVector = multiplyMatrices(key, messageVector);

  // Convert back to letters and return encrypted text
  return String.fromCharCode(
    (encryptedVector[0] % 26) + "A".charCodeAt(0),
    (encryptedVector[1] % 26) + "A".charCodeAt(0)
  );
}

/**
 * Function to decrypt a message using the Hill Cipher.
 * The decryption process involves several linear algebra steps:
 * 1. Calculate the determinant of the key matrix.
 * 2. Find the multiplicative inverse of the determinant in modulo 26.
 * 3. Calculate the adjugate matrix of the key matrix.
 * 4. Multiply the adjugate matrix by the determinant's inverse, then apply modulo 26.
 * @param {string} encryptedText - The encrypted text to decrypt (2 characters).
 * @param {array} key - The 2x2 matrix key used for decryption.
 * @returns {string} - The decrypted text.
 */
function hillCipherDecrypt(encryptedText, key) {
  /**
   * Function to find the modular inverse of a number.
   * This is used to find the inverse of the determinant in modulo 26 for the Hill Cipher.
   * @param {number} n - The number to find the inverse for.
   * @param {number} mod - The modulo (26 for Hill Cipher).
   * @returns {number} - The modular inverse of n.
   */
  function _modInverse(n, mod) {
    for (let x = 1; x < mod; x++) {
      if (((n % mod) * (x % mod)) % mod == 1) {
        return x;
      }
    }
    return -1; // Return -1 if no inverse exists
  }

  encryptedText = encryptedText.toUpperCase(); //to ignore case

  // Calculate the determinant of the key matrix and ensure it's positive and mod 26
  let det = key[0][0] * key[1][1] - key[0][1] * key[1][0];
  det = ((det % 26) + 26) % 26;

  // Find the multiplicative inverse of the determinant
  let detInverse = _modInverse(det, 26);
  if (detInverse < 0) {
    throw new Error("Inverse does not exist. Key matrix is not invertible.");
  }

  // Calculate the adjugate matrix: swap diagonal elements and negate others, then mod 26
  let adj = [
    [key[1][1], -key[0][1]],
    [-key[1][0], key[0][0]],
  ];
  adj = adj.map((row) => row.map((el) => (((el * detInverse) % 26) + 26) % 26));

  // Decrypt the message by multiplying the adjugate matrix with the encrypted vector
  const encryptedVector = [
    encryptedText.charCodeAt(0) - "A".charCodeAt(0),
    encryptedText.charCodeAt(1) - "A".charCodeAt(0),
  ];
  const decryptedVector = multiplyMatrices(adj, encryptedVector);

  // Convert numeric values back to letters
  return String.fromCharCode(
    (decryptedVector[0] % 26) + "A".charCodeAt(0),
    (decryptedVector[1] % 26) + "A".charCodeAt(0)
  );
}
