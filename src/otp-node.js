const crypto = require('crypto').webcrypto

// ### Function: Create one-time pad based on crypto.getRandomValues
function createOnetimePad (length) {
  let otp = ''
  let randomValuesArr = crypto.getRandomValues(new Uint8Array(length));
  // converting to single digits
  for (var i = 0; i < randomValuesArr.length; i++) {
    otp += Math.floor(randomValuesArr[i]/256*10)
  }
  return otp
}

exports.createOnetimePad = createOnetimePad
