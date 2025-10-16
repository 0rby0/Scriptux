const charList = require('./chars.json')

function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

let pickedChar = generateRandomNumber(1, charList.length)
let char = Object.keys(charList[pickedChar])

console.log(char[0])