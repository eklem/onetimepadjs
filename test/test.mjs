import { textToPlaincode, plaincodeToText, createOnetimePad, nob, codebook, checkLength, encryptPlaincode, decryptEncryptedMsg } from '../src/index.mjs'

const plaincode = '72162626399022530316200000034229999806326264999019029039979767394'
const txt = 'Hello 👨‍👩‍👦‍👦🏳️‍🌈😀🇿🇼  world 123 æøå!'

console.log('\n\nInput:               ' + txt)

// ### Testing: Text to plaincode
const plaincodeConverted = textToPlaincode(txt, nob, codebook)
console.log('Plaincode:           ' + plaincode)

if (plaincodeConverted === plaincode) {
  // console.log('\n### textToPlaincode works!\n')
} else {
  console.log('\n### textToPlaincode doesn\'t work!\n')
}

// ### Testing: Creating a one-time pad
const otp = createOnetimePad(96)
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
console.log('Decrypted msg:       ' + textConverted + '\n\n')

if (textConverted === txt.toLowerCase()) {
  // console.log('\n### plaincodeToText works!\n')
} else {
  console.log('\n### plaincodeToText doesn\'t work!\n')
}
