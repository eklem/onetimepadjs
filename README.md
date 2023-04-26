# otp-encryption-decryption-lib

[![NPM version](http://img.shields.io/npm/v/otp-encryption-decryption-lib.svg?style=flat)](https://npmjs.org/package/otp-encryption-decryption-lib)
[![NPM downloads](http://img.shields.io/npm/dm/otp-encryption-decryption-lib.svg?style=flat)](https://npmjs.org/package/otp-encryption-decryption-lib) 
[![jSDelivr CDN](https://data.jsdelivr.com/v1/package/npm/otp-encryption-decryption-lib/badge?style=rounded)](https://www.jsdelivr.com/package/npm/otp-encryption-decryption-lib)
[![tests](https://github.com/eklem/otp-encryption-decryption-lib/actions/workflows/tests.yml/badge.svg)](https://github.com/eklem/otp-encryption-decryption-lib/actions/workflows/tests.yml)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

Library of small snippets, tools and helper-functions for encrypting and decrypting messages with OTPs - One-time pads.

![Example-code](https://github.com/eklem/otp-encryption-decryption-lib/blob/trunk/otp-library-03.png)

Will be core functionality together with [nfc-json-transfer](https://github.com/eklem/nfc-json-transfer) for creating [otp-encryption-toy](https://github.com/eklem/otp-encryption-toy)

## Getting the script in your environment

### CJS - CommonJS

```javaScript
const { textToPlaincode, plaincodeToText, createOnetimePad, nob, codebook, checkLength, encryptPlaincode, decryptEncryptedMsg } = require('otp-encryption-decryption-lib')
```

### ESM - Ecmascript Modules

```javaScript
import { textToPlaincode, plaincodeToText, createOnetimePad, nob, codebook, checkLength, encryptPlaincode, decryptEncryptedMsg } from 'otp-encryption-decryption-lib'
```


## Usage

index.mjs:
```javaScript
import { textToPlaincode, plaincodeToText, createOnetimePad, nob, codebook, checkLength, encryptPlaincode, decryptEncryptedMsg } from 'otp-encryption-decryption-lib'

// The message
const txt = 'Hello 👨‍👩‍👦‍👦🏳️‍🌈😀🇿🇼  world 123 æøå!'
console.log('\n\nInput:               ' + txt)

// ### Text to plaincode
const plaincodeConverted = textToPlaincode(txt, nob, codebook)
console.log('Plaincode:           ' + plaincodeConverted)

// ### Creating a one-time pad
const otp = createOnetimePad(96)
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
console.log('Decrypted msg:       ' + textConverted + '\n\n')
```

When doing ESM-version of the library, run it with:

```sh
node --experimental-json-modules index.mjs
```



## API

### textToPlaincode

Converts plaintext to plaincode. Plaincode is just numbers, and not encrypted. It's a step that uses a conversion table to change the text, numbers and emojis into numbers, which makes it possible to do one-time-pad encryption.

```javaScript
textToPlaincode(text, conversionLanguage, codebook)
// Returns plaincode string from text.
```

### plaincodeToText

Converts plaincode back to plaintext.

```javaScript
plaincodeToText(plaincode, conversionLanguage, codebook)
// Returns text string from plaincode string.
```

### createOnetimePad

The length of the should be equal to or larger than your plaincode. And it should only be used once. This ensures that it is impossible to break the code and read the encrypted message.

```javaScript
createOnetimePad(length)
// Return a one-time pad of desired length.
```

### Language conversion tables and regexes

Table + regular expression for different languages. Most used letters differs from language to language. To be able to keep the plaincode short and thus needing shorter one-time-pads, the five most used letters are assigned to 0-5 in plaincode. Numbers starts with the digit `9` and consists of 3 digits.

The table is used for converting letters, digits and emojis to plaincode and the other way around. There are two regular expressions for each language. One is to split up text strings containing text, numbers and emojis into single letters, digits and emojis. The other one is to split up a plaincode-string into an array of plaincodes so that you it can use the conversion table to get a plaincode-string to a text-string (text, numbers and emojis).

##### General layout of conversion table

* **00000 - 09999:**
  Codebook, which consists of Unicode emojis
* **1 - 5:**
  5 most used letters for this language
* **60 - 89:**
  Other letters and symbols
* **900 - 909:**
  Numbers from 0-9
* **91 -99:**
  More symbols

##### `textRegex` for English. It differs a little bit for each language.

```javaScript
eng.textRegex: '[a-z0-9\\s]|[,@#+-/.:!(=?)]'
```

##### `plaincodeRegex` for English, which for latin character based languages should be mostly the same.

```javaScript
eng.plaincodeRegex: '0\\d{4}|[1-5]|(90[0-9]{1})|(6[0-9]{1})|(7[0-9]{1})|(8[0-9]{1})|(9[1-9]{1})'
```

#### eng

Conversion table and matching regular expression for the English language.

```javaScript
eng.textRegex // regex pattern for converting english text, numbers and punctuation into single characters
eng.plaincodeRegex // regex pattern for converting english plaincode string into array of plaincodes
eng.table // unicode <-> plaincode conversion table for english
```

#### nob

Conversion table and matching regular expression for the Norwegian language.

```javaScript
nob.textRegex // regex pattern for converting norwegian text, numbers and punctuation into single characters
nob.plaincodeRegex // regex pattern for converting norwegian plaincode string into array of plaincodes
nob.table // unicode <-> plaincode conversion table for norwegian
```

### codebook

Code book for emojis. Starts with a `0` in plaincode and then 4 digits. Traditionallhy it has been used to be able to write shorter messages, having a short code for longer, often used words. Here it is to be able to express all Unicode emojis.

```javaScript
codebook // conversion table for all (almost) unicode emojis <-> plaincode
```

### checkLength

Helper function to check if plaincode length (and thus your message length) is too long, and also show the user how close they are to exceed length of one-time pad.

```javaScript
checkLength(plaincode, otp)
// returns { plaincodeLength: plaincodeLength, otpLength: otpLength, tooLong: tooLong }
```

### encryptPlaincode

Encrypt the plaincode using a one-time-pad.

```javaScript
encryptPlaincode(plaincode, otp)
// Returns encrypted message as an array of numbers.
```

### decryptEncryptedMsg

Decrypts the encrypted message with the same one-time-pad that it was encrypted with.

```javaScript
decryptEncryptedMsg(encryptedMsg, otp)
// Returns message as an array of characters.
```

## Maintenance

If unicode emojis are updated (to i.e. v.16 from v.15)

```console
cd scipts
node ./fetch-emojis.mjs && node ./create-emoji-regex.mjs && node ./create-emoji-codebook.mjs
```

## Possible issue

Haven't found a unique way of numbering/addressing the unicode emojis that will work cross unicode emoji versions, so then stuff won't encrypt/decrypt properly if you use different versions of the library.
