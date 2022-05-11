import test from 'ava'
import { textToPlaincode, plaincodeToText, createOnetimePad, nob, codebook, checkLength, encryptPlaincode, decryptEncryptedMsg } from '../dist/otp-ed-lib.nodejs.cjs.js'
const message = 'Hello 👨‍👩‍👦‍👦🏳️‍🌈😀🇿🇼  world, 123:æøå! https://somesecreturl.com/'

test('Text to plaincode + tooLong: false', t => {
  t.plan(2)
  const expected = 'hello 👨‍👩‍👦‍👦🏳️‍🌈😀🇿🇼  world, 123:æøå! https://somesecreturl.com/'
  
  // ### Text to plaincode
  const plaincodeConverted = textToPlaincode(message, nob, codebook)
  console.log('Plaincode:           ' + plaincodeConverted)

  // ### Creating a one-time pad
  const otp = createOnetimePad(128)
  console.log('One-time pad:        ' + otp)

  // ### Checking length of plaincode vs. one-time pad
  const lengthObj = checkLength(plaincodeConverted, otp)
  console.log('Length:              ' + JSON.stringify(lengthObj))

  // ### Encrypting plaincode
  const encryptedMsg = encryptPlaincode(plaincodeConverted, otp)
  console.log('Encrypted plaincode: ' + encryptedMsg.join(''))

  // ### Decrypting encrypted message
  const decryptedPlaincode = decryptEncryptedMsg(encryptedMsg.join(''), otp)
  console.log('Decrypted plaincode: ' + decryptedPlaincode.join(''))

  // ### Plaincode to text - The message delivered!
  const textConverted = plaincodeToText(decryptedPlaincode.join(''), nob, codebook)
  console.log('Decrypted message:   ' + textConverted + '\n\n')
  
  t.deepEqual(lengthObj.tooLong, false)
  t.deepEqual(textConverted, expected)
})
