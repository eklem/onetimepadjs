import fetch from 'node-fetch'
import fs from 'fs'

fetch('https://unicode.org/emoji/charts-14.0/emoji-ordering.txt')
  .then(res => res.text())
  .then(content => {
    console.log('Emojis fetched from URL')
    fs.writeFile('./maintenance/emojis.txt', content, err => {
      if (err) {
        console.error('Error writing file: ' + err)
      }
      // file written successfully
      console.log('Emojis written to emojis.txt')
    })
  })
  .catch(err => console.error('Error fetching file: ' + err))
