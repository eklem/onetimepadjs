const { randomInt } = await import('node:crypto')
  
function random(length) {
  console.log('test')
  return randomInt((length-1)*10, length*10)
}

console.log( random(100) )
