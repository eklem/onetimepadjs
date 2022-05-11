const { createOnetimePad } = require('./otp-node.js')
const { codebookRaw } = require('./codebook-emojis.js')
const { emojiRegex } = require('./regex-emojis.js')
const { eng } = require('./conversiontable-eng.js')
const { nob } = require('./conversiontable-nob.js')
const codebook = codebookRaw

// ### Function: Text to plaincode
function textToPlaincode (text, conversionLanguage, codebook) {
  // Joining regular conversion table and codebook
  conversionLanguage.table = [...conversionLanguage.table, ...codebook]
  text = text.toLowerCase()

  // split into array of characters
  let regex = emojiRegex + '|' + conversionLanguage.textRegex
  regex = new RegExp(regex, 'g')
  const textArr = text.match(regex)

  // convert text to plaincode
  const plaincode = textArr.map((character) => {
    const letterObj = conversionLanguage.table.find(obj => obj.unicode === character)
    try {
      return letterObj.plaincode
    } catch (error) {
      return ' '
    }
  })
  return plaincode.join('')
}

// ### Function: Plaincode to text
function plaincodeToText (plaincode, conversionLanguage, codebook) {
  // Joining regular conversion table and codebook
  conversionLanguage.table = [...conversionLanguage.table, ...codebook]
  // finding via regex: plaincode enteties in plaincode string
  const regex = new RegExp(conversionLanguage.plaincodeRegex, 'g')
  const plaincodeArr = plaincode.match(regex)

  // convert plaincode to text
  const text = plaincodeArr.map((plaincode) => {
    const letterObj = conversionLanguage.table.find(obj => obj.plaincode === plaincode)
    return letterObj.unicode
  })
  return text.join('')
}

// ### Function: Check one-time pad >= plaincode
function checkLength (plaincode, otp) {
  let tooLong = false
  const plaincodeLength = plaincode.length
  const otpLength = otp.length
  if (plaincodeLength > otpLength) {
    tooLong = true
  }
  return { plaincodeLength: plaincodeLength, otpLength: otpLength, tooLong: tooLong }
}

// ### Function: Encrypt
function encryptPlaincode (plaincode, otp) {
  // Split string into array
  const plaincodeArr = plaincode.split('')
  const otpArr = otp.split('')

  // Encrypt
  const encryptedMsg = plaincodeArr.map((digit, index) => {
    const encryptedDigit = encryptDecryptDigit(digit, otpArr[index], 'encrypt')
    return encryptedDigit
  })
  return encryptedMsg
}

// ### Function: Decrypt
function decryptEncryptedMsg (encryptedMsg, otp) {
  // Split string into array
  const encryptedMsgArr = encryptedMsg.split('')
  const otpArr = otp.split('')

  // Decrypt
  const decryptedMsg = encryptedMsgArr.map((encryptedDigit, index) => {
    const decryptedDigit = encryptDecryptDigit(encryptedDigit, otpArr[index], 'decrypt')
    return decryptedDigit
  })
  return decryptedMsg
}

// ### Function
function encryptDecryptDigit (digit, otpKey, direction) {
  let encryptedDecrypted
  if (direction === 'encrypt') {
    encryptedDecrypted = (parseInt(digit, 10) + parseInt(otpKey, 10)) % 10
  }
  if (direction === 'decrypt') {
    encryptedDecrypted = (digit - otpKey + 10) % 10
  }
  return encryptedDecrypted
}

exports.textToPlaincode = textToPlaincode
exports.plaincodeToText = plaincodeToText
exports.checkLength = checkLength
exports.encryptPlaincode = encryptPlaincode
exports.decryptEncryptedMsg = decryptEncryptedMsg
exports.eng = eng
exports.nob = nob
exports.codebook = codebook
exports.createOnetimePad = createOnetimePad
