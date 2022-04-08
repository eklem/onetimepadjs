# otp-encryption-decryption-lib
Library of small snippets, tools and helper-functions for encrypting and decrypting messages with OTPs - One-time pads. Check [issues](https://github.com/eklem/otp-encryption-decryption-lib/issues) to see what's comming and `/src` or API dockumentation for what's already done.

![Example-code](https://github.com/eklem/otp-encryption-decryption-tools/blob/trunk/otp-library-03.png)

Will be core functionality for [otp-encryption-decryption-toy](https://github.com/eklem/otp-encryption-decryption-toy)

## Example usage
```sh
npm install otp-encryption-decryption-lib
```

index.mjs:
```javaScript
import { textToPlaincode, plaincodeToText, createOnetimePad, nob, codebook, checkLength, encryptPlaincode, decryptEncryptedMsg } from '../src/index.mjs'

const plaincode = '72162626399022530316200000034229999806326264999019029039979767394'
const txt = 'Hello 👨‍👩‍👦‍👦🏳️‍🌈😀🇿🇼  world 123 æøå!'

console.log('\n\nInput:               ' + txt)

// ### Testing: Text to plaincode
const plaincodeConverted = textToPlaincode(txt, nob, codebook)
console.log('Plaincode:           ' + plaincode)

if (plaincodeConverted === plaincode) {
  // console.log('\n### textToPlaincode works!\n')
} else {
  console.log('\n### textToPlaincode doesn\'t work!\n')
}

// ### Testing: Creating a one-time pad
const otp = createOnetimePad(96)
console.log('One-time pad:        ' + otp)

const lengthObj = checkLength(plaincodeConverted, otp)
console.log('Length:              ' + JSON.stringify(lengthObj))

// ### Testing: Encrypting plaincode
const encryptedMsg = encryptPlaincode(plaincodeConverted, otp)
console.log('Encrypted plaincode: ' + encryptedMsg.join(''))

// ### Testing: Decrypting encrypted message
const decryptedPlaincode = decryptEncryptedMsg(encryptedMsg.join(''), otp)
console.log('Decrypted plaincode: ' + decryptedPlaincode.join(''))

// ### Testing: Plaincode to text
const textConverted = plaincodeToText(decryptedPlaincode.join(''), nob, codebook)
console.log('Decrypted msg:       ' + textConverted + '\n\n')

if (textConverted === txt.toLowerCase()) {
  // console.log('\n### plaincodeToText works!\n')
} else {
  console.log('\n### plaincodeToText doesn\'t work!\n')
}
```

Run it with:
```sh
node --experimental-json-modules index.mjs
```

## API

### textToPlaincode
```javaScript
textToPlaincode(text, conversionLanguage, codebook)
// Returns plaincode string from text.
```

### plaincodeToText
```javaScript
plaincodeToText(plaincode, conversionLanguage, codebook)
// Returns text string from plaincode string.
```

### createOnetimePad
```javaScript
createOnetimePad(length)
// Return a one-time pad of desired length.
```

### eng
```javaScript
eng.textRegex // regex pattern for converting english text, numbers and punctuation into single characters
eng.plaincodeRegex // regex pattern for converting english plaincode string into array of plaincodes
eng.table // unicode <-> plaincode conversion table for english
```

### nob
```javaScript
nob.textRegex // regex pattern for converting norwegian text, numbers and punctuation into single characters
nob.plaincodeRegex // regex pattern for converting norwegian plaincode string into array of plaincodes
nob.table // unicode <-> plaincode conversion table for norwegian
```

### codebook
```javaScript
codebook // conversion table for emoji <-> plaincode
```

### checkLength
```javaScript
checkLength(plaincode, otp)
// returns { plaincodeLength: plaincodeLength, otpLength: otpLength, tooLong: tooLong }
```
Helper function to check if plaincode length (and thus your message length) is too long, and also show the user how close they are to exceed length of one-time pad.

### encryptPlaincode
```javaScript
encryptPlaincode(plaincode, otp)
// Returns encrypted message as an array of numbers.
```

### decryptEncryptedMsg
```javaScript
decryptEncryptedMsg(encryptedMsg, otp)
// Returns message as an array of characters.
```

## Maintenance
If unicode emojis are updated (to i.e. v.15 or v.14.1)

```console
node ./maintenance/fetch-emojis.mjs && node ./maintenance/create-emoji-codebook.mjs
```
