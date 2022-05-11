// ### Function: Create one-time pad based on crypto.getRandomValues
function createOnetimePad (length) {
  let otp = ''
  let array = new Uint8Array(128)
  window.getRandomValues(array)

  for (var i = 0; i < array.length; i++) {
    // converting from 0-255 to single digits (0-9)
    otp += Math.floor(array[i]/256*10)
  }
  return otp
}
  
exports.createOnetimePad = createOneTimePad
