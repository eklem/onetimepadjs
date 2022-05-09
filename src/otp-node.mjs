const { randomInt } = await import('node:crypto')

// ### Function: Create one-time pad
function createOnetimePad (length) {
    let otp = ''
    for (let i = 0; i < length; i++) {
      otp = otp + randomInt(10)
    }
    return otp
  }

  export { createOnetimePad }
