const emojiRegex = ['<% pattern %>']
const therestRegex = '|\\p{Emoji_Component}|\\p{Alpha}|\\p{Number}|\\p{P}'
const encryptabelCharactersRegex = `${emojiRegex}${therestRegex}`

export { emojiRegex, encryptabelCharactersRegex }
