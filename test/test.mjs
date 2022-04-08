import { textToPlaincode, plaincodeToText, createOnetimePad, nob, codebook, checkLength, encryptPlaincode, decryptEncryptedMsg } from '../src/index.mjs'

const txt = 'Hello 👨‍👩‍👦‍👦🏳️‍🌈😀🇿🇼  world 123 æøå!'

console.log('\n\nMessage:             ' + txt)

// ### Testing: Text to plaincode
const plaincodeConverted = textToPlaincode(txt, nob, codebook)
console.log('Plaincode:           ' + plaincodeConverted)

// ### Testing: Creating a one-time pad
const otp = createOnetimePad(100)
console.log('One-time pad:        ' + otp)

const lengthObj = checkLength(plaincodeConverted, otp)
console.log('Length:              ' + JSON.stringify(lengthObj))

// ### Testing: Encrypting plaincode
const encryptedMsg = encryptPlaincode(plaincodeConverted, otp)
console.log('Encrypted plaincode: ' + encryptedMsg.join(''))

// ### Testing: Decrypting encrypted message
const decryptedPlaincode = decryptEncryptedMsg(encryptedMsg.join(''), otp)
console.log('Decrypted plaincode: ' + decryptedPlaincode.join(''))

// ### Testing: Plaincode to text
const textConverted = plaincodeToText(decryptedPlaincode.join(''), nob, codebook)
console.log('Decrypted message:   ' + textConverted + '\n\n')
