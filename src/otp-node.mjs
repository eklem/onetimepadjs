const { getRandomValues } = await import('node:crypto')

// ### Function: Create one-time pad based on crypto.getRandomValues
function createOnetimePad (length) {
  let otp = ''
  let array = new Uint8Array(128)
  getRandomValues(array)
  
  for (var i = 0; i < array.length; i++) {
  // converting to single digits  
  otp += Math.floor(array[i]/256*10)
  }
  return otp
}

export { createOnetimePad }
