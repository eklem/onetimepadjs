import * as fs from 'fs'

const input = fs.readFileSync('./templatefile-regex.mjs', 'utf8').toString().trim()
const pattern = fs.readFileSync('../node_modules/rgi-emoji-regex-pattern/dist/latest/javascript.txt', 'utf8').toString().trim()
const output = input.replace('<% pattern %>', pattern) + '\n'

fs.writeFileSync('./regex.mjs', output)
