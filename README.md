# otp-encryption-decryption-lib
Library of small snippets, tools and helper-functions for encrypting and decrypting messages with OTPs - One-time pads. Check [issues](https://github.com/eklem/otp-encryption-decryption-lib/issues) to see what's comming and `/src` or API dockumentation for what's already done.

Will be core functionality for [otp-encryption-decryption-toy](https://github.com/eklem/otp-encryption-decryption-toy)

## Example usage
[Is comming soon]

## API

### textToPlaincode
```javaScript
textToPlaincode(text, conversionLanguage, codebook)
```
Returns plaincode string from text.

### plaincodeToText
```javaScript
plaincodeToText(plaincode, conversionLanguage, codebook)
```
Returns text string from plaincode string.

### createOnetimePad
```javaScript
createOnetimePad(length)
```
Return a one-time pad of desired length.

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
```
Returns encrypted message as an array of numbers.

### decryptEncryptedMsg
```javaScript
decryptEncryptedMsg(encryptedMsg, otp)
```
Returns message as an array of characters.

## Maintenance
If unicode emojis are updated (to i.e. v.15 or v.14.1)

```console
node ./maintenance/fetch-emojis.mjs && node ./maintenance/create-emoji-codebook.mjs
```
