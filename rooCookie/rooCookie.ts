/* http://roocookie.chal.imaginaryctf.org/ */

function createToken(text: string): string {
    let encryptedMessage = "";
  for (let i = 0; i < text.length; i++) {
        console.log(`Character: ${text[i]}`);
        console.log(`Code: ${text[i].charCodeAt(0)}`);
        console.log(`Shifted Code: ${text[i].charCodeAt(0)-43+1337}`);
        let encryptedCharacter = ((text[i].charCodeAt(0)-43+1337) >> 0).toString(2)
        // Encrypted Characters tend to be around 11 characters long
        console.log(`Binary: ${encryptedCharacter}`, `Length: ${encryptedCharacter.length}`);
        encryptedMessage += encryptedCharacter;
  }
  return encryptedMessage;
}

function decryptToken(token: string): string {
    // Check that each character is composed of 11 bits
    console.assert(token.length % 11 == 0)
    let decryptedMessage = "";
    const stride = 11;
    for (let i = 0; i < token.length; i+= stride) {
        let binaryCharacter = token.slice(i, i+stride);
        console.log(`Binary: ${binaryCharacter}, Length: ${binaryCharacter.length}`);
        let decryptedCharCode = parseInt(binaryCharacter, 2);
        console.log(`Char code: ${decryptedCharCode}`);
        decryptedCharCode = decryptedCharCode - 1337 + 43;
        let decryptedChar = String.fromCharCode(decryptedCharCode);
        console.log(`Char: ${decryptedChar}`);
        decryptedMessage += decryptedChar;
    }
    return decryptedMessage;
}


// Test
const testMessage = "WORLDZ!";
console.table({testMessage});

let encryptedMessage = createToken(testMessage);
console.table({encryptedMessage});

let decryptedMessage = decryptToken(encryptedMessage);
console.table({decryptedMessage});

// CTF
const token = "101100000111011000000110101110011101100000001010111110010101101111101011110111010111001110101001011101001100001011000000010101111101101011111011010011000010100101110101001101001010010111010101111110101011011111011000000110110000001101100001011010111110110110000000101011100101010100101110100110000101011101111010111000110110000010101011101001011000100110101110110101001111101010111111010101000001101011011011010100010110101110110101011011111010100010110101101101101100001011010110111110101000011101011111001010100010110101101101101100000101010011111010100111110101011011011010111000010101000010101011100101011000101110100110000";
let decryptedToken = decryptToken(token);
console.table({decryptedToken});