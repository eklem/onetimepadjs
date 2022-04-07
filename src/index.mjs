import { codebookRaw } from './codebook-emojis.mjs'
import { eng } from './conversiontable-eng.mjs'
import { encryptabelCharactersRegex } from './unicodeRegex.mjs'
const codebook = codebookRaw.default

// console.log(codebook)

// ### Function: Text to plaincode
function textToPlaincode (text, conversion, codebook) {
  // Joining regular conversion table and codebook
  conversion.table = [...conversion.table, ...codebook]
  text = text.toLowerCase()

  // split into array of characters
  const regex = new RegExp(encryptabelCharactersRegex, 'gu')
  const textArr = text.match(regex)
  console.log('textArr: ' + textArr)

  // convert text to plaincode
  const plaincode = textArr.map((character) => {
    const letterObj = conversion.table.find(obj => obj.unicode === character)
    try {
      return letterObj.plaincode
    } catch (error) {
      return ' '
    }
  })

  return plaincode.join('')
}

// ### Function: Plaincode to text
function plaincodeToText (plaincode, conversion, codebook) {
  // Joining regular conversion table and codebook
  conversion.table = [...conversion.table, ...codebook]

  console.log(plaincode)
  console.log(conversion.plaincodeRegex)
  // finding via regex: plaincode enteties in plaincode string
  const regex = new RegExp(conversion.plaincodeRegex, 'gui')
  console.log(regex)
  const plaincodeArr = plaincode.match(regex)
  console.log(plaincodeArr)

  // convert plaincode to text
  const text = plaincodeArr.map((plaincode) => {
    const letterObj = conversion.table.find(obj => obj.plaincode === plaincode)
    console.log(letterObj.plaincode)
    console.log(letterObj.unicode + '\n')
    return letterObj.unicode
  })
  console.log(text)
  return text.join('')
}

// ### Function: Create one-time pad
function createOnetimePad (length) {
  let otp = ''
  for (let i = 0; i < length; i++) {
    otp = otp + Math.floor(Math.random() * 10)
  }
  return otp
}

const plaincode = '6626969599000009977573696394'
const txt = 'Hello 😀 world!'.toLowerCase()

const plaincodeConverted = textToPlaincode(txt, eng, codebook)
console.log(plaincodeConverted + ' ===\n' + plaincode + ' ?')

if (plaincodeConverted === plaincode) {
  console.log('textToPlaincode works!')
} else {
  console.log('textToPlaincode doesn\'t work!')
}

const textConverted = plaincodeToText(plaincode, eng, codebook)
console.log('converting plaincode: \'' + plaincode + '\' to text: \'' + textConverted + '\'')

if (textConverted === txt) {
  console.log('plaincodeToText works!')
} else {
  console.log('plaincodeToText doesn\'t work!')
}

const otp = createOnetimePad(256)
console.log(otp)

if (otp.length === 256) {
  console.log('createOnetimePad works!')
} else {
  console.log('createOnetimePad doesn\'t work!')
}
