import { textToPlaincode, plaincodeToText, createOnetimePad, eng, codebook, checkLength } from '../src/index.mjs'

const plaincode = '6626969599000000342299997757369639990190290394'
const txt = 'Hello 😀🇿🇼  world 123!'.toLowerCase()

// ### Testing: Text to plaincode
const plaincodeConverted = textToPlaincode(txt, eng, codebook)
console.log(plaincodeConverted + ' ===\n' + plaincode + ' ?')

if (plaincodeConverted === plaincode) {
  console.log('textToPlaincode works!')
} else {
  console.log('textToPlaincode doesn\'t work!')
}

// ### Testing: Plaincode to text
const textConverted = plaincodeToText(plaincode, eng, codebook)
console.log('converting plaincode: \'' + plaincode + '\' to text: \'' + textConverted + '\'')

if (textConverted === txt) {
  console.log('plaincodeToText works!')
} else {
  console.log('plaincodeToText doesn\'t work!')
}

// ### Testing: Creating a one-time pad
const otp = createOnetimePad(256)
console.log(otp)

const length = checkLength(plaincodeConverted, otp)
console.log(length)
