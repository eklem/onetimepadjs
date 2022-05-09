const { getRandomValues } = await import('node:crypto')
let otp = ''
let array = new Uint8Array(128)
getRandomValues(array)

for (var i = 0; i < array.length; i++) {
    otp += Math.floor(array[i]/256*10)
  
}

console.log(otp)