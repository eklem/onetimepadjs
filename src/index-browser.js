const { textToPlaincode, plaincodeToText, eng, nob, codebook, checkLength, encryptPlaincode, decryptEncryptedMsg } = require('./otp-functions.js')
const { createOnetimePad } = require('./otp-browser.js')

exports.createOnetimePad = createOnetimePad
exports.textToPlaincode = textToPlaincode
exports.plaincodeToText = plaincodeToText
exports.eng = eng
exports.nob = nob
exports.codebook = codebook
exports.checkLength = checkLength
exports.encryptPlaincode = encryptPlaincode
exports.decryptEncryptedMsg = decryptEncryptedMsg