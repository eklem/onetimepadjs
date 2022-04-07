import { codebookRaw } from './codebook-emojis.mjs'
import { emojiRegex } from './regex-emojis.mjs'
import { eng } from './conversiontable-eng.mjs'
import { nob } from './conversiontable-nob.mjs'
const codebook = codebookRaw.default

// console.log(codebook)

// ### Function: Text to plaincode
function textToPlaincode (text, conversion, codebook) {
  // Joining regular conversion table and codebook
  conversion.table = [...conversion.table, ...codebook]
  text = text.toLowerCase()

  // split into array of characters
  let regex = emojiRegex + '|' + conversion.textRegex
  regex = new RegExp(regex, 'g')
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
  const regex = new RegExp(conversion.plaincodeRegex, 'g')
  const plaincodeArr = plaincode.match(regex)

  // convert plaincode to text
  const text = plaincodeArr.map((plaincode) => {
    const letterObj = conversion.table.find(obj => obj.plaincode === plaincode)
    return letterObj.unicode
  })
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

// ### Function: Check one-time pad >= plaincode
function checkLength (message, otp) {
  let tooLong = false
  const messageLength = message.length
  const otpLength = otp.length
  if (messageLength > otpLength) {
    tooLong = true
  }

  return { messageLength: messageLength, otpLength: otpLength, tooLong: tooLong }
}

// ### Function: Encrypt
function encryptPlaincode (plaincode, otp) {
  // nothing much yet
}

// ### Function: Decrypt
function decryptEncrypted (message, otp) {
  // nothing much yet
}

export { textToPlaincode, plaincodeToText, createOnetimePad, eng, nob, codebook, checkLength, encryptPlaincode, decryptEncrypted }
