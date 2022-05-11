// ### Function: Create one-time pad based on crypto.getRandomValues
function createOnetimePad (length) {
  let otp = ''
  let randomValuesArr = window.getRandomValues(new Uint8Array(length));
  // converting from 0-255 to single digits (0-9)
  for (var i = 0; i < randomValuesArr.length; i++) {
    otp += Math.floor(randomValuesArr[i]/256*10)
  }
  return otp
}
  
exports.createOnetimePad = createOneTimePad
