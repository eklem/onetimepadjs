import { codebook } from './codebook-emojis.mjs'
import { eng } from './conversion-table-eng.mjs'

eng.table = [...eng.table, ...codebook]

// function textToPlaincode (text, conversionTable) {
//   console.log(text, conversionTable)
// }

function plaincodeToText (plaincode, conversion) {
  // finding via regex: plaincode enteties in plaincode string
  const regex = new RegExp(conversion.regex, 'giu')
  const plaincodeArr = plaincode.match(regex)
  console.log(plaincodeArr)

  // replace plaincode with txt
  const text = plaincodeArr.map((plaincode) => {
    const letterObj = conversion.table.find(obj => obj.plaincode === plaincode)
    return letterObj.txt
  })
  return text.join('')
}

const plaincode = '6626969599000009977573696394'
const text = plaincodeToText(plaincode, eng)
console.log('converting plaincode: \'' + plaincode + '\' to text: \'' + text + '\'')

const txt = 'hello 😀 world!'
if (text === txt) {
  console.log('plaincodeToText works!')
}
// textToPlaincode(text, conversion)
