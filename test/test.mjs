import { textToPlaincode, plaincodeToText, createOnetimePad, eng, codebook, checkLength } from '../src/index.mjs'

const plaincode = '66269695990225303162000000342299997757369639990190290394'
const txt = 'Hello 👨‍👩‍👦‍👦🏳️‍🌈😀🇿🇼  world 123!'

console.log(txt)

// ### Testing: Text to plaincode
const plaincodeConverted = textToPlaincode(txt, eng, codebook)
console.log(plaincodeConverted + ' ===\n' + plaincode + ' ?')

if (plaincodeConverted === plaincode) {
  console.log('\n### textToPlaincode works!\n')
} else {
  console.log('\n### textToPlaincode doesn\'t work!\n')
}

// ### Testing: Plaincode to text
const textConverted = plaincodeToText(plaincode, eng, codebook)
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
