import { textToPlaincode, plaincodeToText, createOnetimePad, nob, codebook, checkLength } from '../src/index.mjs'

const plaincode = '72162626399022530316200000034229999806326264999019029039979767394'
const txt = 'Hello 👨‍👩‍👦‍👦🏳️‍🌈😀🇿🇼  world 123 æøå!'

console.log(txt)

// ### Testing: Text to plaincode
const plaincodeConverted = textToPlaincode(txt, nob, codebook)
console.log(plaincodeConverted + ' ===\n' + plaincode + ' ?')

if (plaincodeConverted === plaincode) {
  console.log('\n### textToPlaincode works!\n')
} else {
  console.log('\n### textToPlaincode doesn\'t work!\n')
}

// ### Testing: Plaincode to text
const textConverted = plaincodeToText(plaincode, nob, codebook)
console.log('converted plaincode: \'' + plaincode + '\' back to text: \'' + textConverted + '\'')

if (textConverted === txt.toLowerCase()) {
  console.log('\n### plaincodeToText works!\n')
} else {
  console.log('\n### plaincodeToText doesn\'t work!\n')
}

// ### Testing: Creating a one-time pad
const otp = createOnetimePad(256)
console.log(otp)

const length = checkLength(plaincodeConverted, otp)
console.log('\n### Length of plaincode compared to one-time pad')
console.log(JSON.stringify(length) + '\n')
