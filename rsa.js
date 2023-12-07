/**
 * Modular Inverse Function
 * Computes the modular multiplicative inverse of 'e' modulo 'phi'.
 * It's used in RSA to find the private key 'd'.
 * The modular inverse is the number 'd' such that (e * d) % phi = 1.
 * This function implements the Extended Euclidean Algorithm to find such 'd'.
 * @param {number} e - The exponent used in the public key.
 * @param {number} phi - Euler's totient function of n (n = p*q).
 * @returns {number} - The modular inverse of 'e' modulo 'phi'.
 */
function modInverse(e, phi) {
    function _extendedEuclidean(a, b) {
        function __extendedEuclidean(a, b) {
          if (b === 0) {
            return [1, 0, a]; // Coefficients x, y, and gcd
          }
      
          let [x1, y1, gcd] = __extendedEuclidean(b, a % b);
          let x = y1;
          let y = x1 - Math.floor(a / b) * y1;
      
          return [x, y, gcd];
        }
      
        return __extendedEuclidean(a, b); // Only return the required values
      }
      



    let [x, y, gcd] = _extendedEuclidean(e, phi);
    if (gcd !== 1) {
      console.error("Inverse doesn't exist");
      return -1;
    } else {
      return (x % phi + phi) % phi; // Ensure result is positive
    }
  }
  
  /**
   * RSA Key Generation
   * Generates the public and private keys used in RSA.
   * RSA keys are based on large prime numbers. The security of RSA comes from
   * the difficulty of factoring large numbers that are a product of two primes.
   * @param {number} p - A large prime number.
   * @param {number} q - Another large prime number, different from 'p'.
   * @param {number} e - Choose 'e' such that 1 < e < phi and e is co-prime to phi.
   * @returns {object} - An object containing the public key (e, n) and private key (d, n).
   */
  function rsaKeyGeneration(p, q, e) {
    // Choose 'e' such that 1 < e < phi and e is co-prime to phi.
    const n = p * q; // n is the modulus for both the public and private keys. Its length, usually expressed in bits, is the key length.
    const phi = (p - 1) * (q - 1); // Euler's totient function of n.


  
    // Find 'd', the modular inverse of 'e' modulo 'phi'.
    let d = modInverse(e, phi);

    if (d === -1) {
        throw new Error("Invalid 'e' value. Unable to compute the modular inverse.");
    }
  
    // Public key is (e, n) and private key is (d, n).
    return { publicKey: { e, n }, privateKey: { d, n } };
  }
  
  /**
   * RSA Encryption
   * Encrypts a plaintext message using the RSA public key.
   * The RSA encryption is based on modular exponentiation.
   * @param {string} text - The plaintext message to encrypt.
   * @param {object} publicKey - The RSA public key {e, n}.
   * @returns {string} - The encrypted message, represented as a space-separated string of numbers.
   */
  function rsaEncrypt(text, publicKey) {
    const { e, n } = publicKey;
    // Convert each character to its ASCII value, then encrypt it using modular exponentiation.
    return text.split('').map(char => {
      let m = char.charCodeAt(0);
      return BigInt(m) ** BigInt(e) % BigInt(n);
    }).join(' ');
  }
  
  /**
   * RSA Decryption
   * Decrypts an encrypted message using the RSA private key.
   * The decryption is the reverse process of the encryption, also based on modular exponentiation.
   * @param {string} encryptedText - The encrypted message, represented as a space-separated string of numbers.
   * @param {object} privateKey - The RSA private key {d, n}.
   * @returns {string} - The decrypted plaintext message.
   */
  function rsaDecrypt(encryptedText, privateKey) {
    const { d, n } = privateKey;
    // Convert each number back to its original character using modular exponentiation.
    return encryptedText.split(' ').map(num => {
      let c = BigInt(num);
      return String.fromCharCode(Number(c ** BigInt(d) % BigInt(n)));
    }).join('');
  }
  