import * as fs from 'fs'

const input = fs.readFileSync('./templatefile-regex.js', 'utf8').toString().trim()
const pattern = fs.readFileSync('../node_modules/rgi-emoji-regex-pattern/dist/latest/javascript.txt', 'utf8').toString().trim()
const output = input.replace('<% pattern %>', pattern) + '\n'

fs.writeFileSync('../src/regex-emojis.js', output)
