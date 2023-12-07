// Function to update input fields based on selected operation
function updateInputFields() {
  const operation = document.getElementById("operation").value;
  const inputFields = document.getElementById("inputFields");
  inputFields.innerHTML = "";

  switch (operation) {
    case "gcd":
      inputFields.innerHTML =
        '<input type="number" id="inputA" placeholder="Enter number A">' +
        '<input type="number" id="inputB" placeholder="Enter number B">';
      break;
    case "extendedEuclidean":
      inputFields.innerHTML =
        '<input type="number" id="inputA" placeholder="Enter number A">' +
        '<input type="number" id="inputB" placeholder="Enter number B">';
      break;
    case "hillCipherEnc":
      inputFields.innerHTML =
        '<input type="text" id="inputText" placeholder="Enter text (2 characters)">' +
        '<input type="text" id="inputKey" placeholder="Enter key (4 numbers separated by space 2X2 matrix)">';
      break;
      case "hillCipherDec":
        inputFields.innerHTML =
          '<input type="text" id="inputText" placeholder="Enter text (2 characters)">' +
          '<input type="text" id="inputKey" placeholder="Enter key (4 numbers separated by space 2X2 matrix)">';
        break;
    case "rsa":
      inputFields.innerHTML =
        '<input type="number" id="inputP" placeholder="Enter prime number P">' +
        '<input type="number" id="inputQ" placeholder="Enter prime number Q">' +
        '<input type="number" id="inputE" placeholder="Enter \'e\' value">' +
        '<input type="text" id="inputText" placeholder="Enter text to encrypt">';
      break;
  }
}

// Function to perform the selected operation
function performOperation() {
  const operation = document.getElementById("operation").value;
  let result = "";
  let updateResult = true;

  try {
    
  switch (operation) {
    case "gcd":
      const a = parseInt(document.getElementById("inputA").value);
      const b = parseInt(document.getElementById("inputB").value);
      result = "GCD: " + gcd(a, b);
      break;
    case "extendedEuclidean":
      const x = parseInt(document.getElementById("inputA").value);
      const y = parseInt(document.getElementById("inputB").value);
      displayExtendedEuclideanSteps(x, y);
      updateResult = false;
      break;
    case "hillCipherEnc":
      const hillCipherEnc_text = document.getElementById("inputText").value;
      const hillCipherEnc_keyString = document.getElementById("inputKey").value;
      const hillCipherEnc_key = hillCipherEnc_keyString.split(" ").map(Number);
      result =
        "Hill Cipher (Encrypted): " +
        hillCipherEncrypt(hillCipherEnc_text, [
          [hillCipherEnc_key[0], hillCipherEnc_key[1]],
          [hillCipherEnc_key[2], hillCipherEnc_key[3]],
        ]);
      break;
    case "hillCipherDec":
      const hillCipherDec_text = document.getElementById("inputText").value;
      const hillCipherDec_keyString = document.getElementById("inputKey").value;
      const hillCipherDec_key = hillCipherDec_keyString.split(" ").map(Number);
      result =
        "Hill Cipher: (Decrypted)" +
        hillCipherDecrypt(hillCipherDec_text, [
          [hillCipherDec_key[0], hillCipherDec_key[1]],
          [hillCipherDec_key[2], hillCipherDec_key[3]],
        ]);
      break;
    case "rsa":
      const p = parseInt(document.getElementById("inputP").value);
      const q = parseInt(document.getElementById("inputQ").value);
      const e = parseInt(document.getElementById("inputE").value);
      const rsaText = document.getElementById("inputText").value;
      const { publicKey, privateKey } = rsaKeyGeneration(p, q, e);
      const encrypted = rsaEncrypt(rsaText, publicKey);
      const decrypted = rsaDecrypt(encrypted, privateKey);
      result = `RSA Encryption: ${encrypted}, Decryption: ${decrypted}`;
      break;
  }

  if (updateResult) {
    document.getElementById("result").innerText = `Result: ${result}`;
  }
    
  } catch (error) {
    document.getElementById('result').innerText = `Error: ${error.message}`;
  }
}

// Event listener for operation change
document
  .getElementById("operation")
  .addEventListener("change", updateInputFields);

// Initial input fields setup
updateInputFields();
