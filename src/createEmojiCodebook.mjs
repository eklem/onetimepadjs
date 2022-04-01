import { extract, emojis } from 'words-n-numbers'
import fs from 'fs'

fs.readFile('./emojis.txt', 'utf8', (err, rawEmojis) => {
  if (err) {
    console.error(err)
    return
  }
  const emojisArr = extract(rawEmojis, { regex: emojis, toLowercase: true })
  let emojisCodebook = emojisArr.map((element, index) => {
    index = String(index).padStart(5, '0')
    element = { txt: element, plaincode: index }
    return element
  })
  emojisCodebook = JSON.stringify(emojisCodebook, null, 2)

  fs.writeFile('./emojis.json', emojisCodebook, err => {
    if (err) {
      console.error('Error writing file: ' + err)
    }
    // file written successfully
    console.log('Emojis JSON written')
  })
})