import { encryptabelCharactersRegex } from './regex.mjs'
const txt = 'HeLLo 😀👨‍👩‍👦‍👦🏳️‍🌈 world! 123'
const regex = new RegExp(encryptabelCharactersRegex, 'gu')
const testArr = txt.match(regex)
console.log(testArr)
