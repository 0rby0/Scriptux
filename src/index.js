const characterDisplay = document.getElementById("character")
const options = document.getElementById("options")
const button1 = document.getElementById("hira")
const button2 = document.getElementById("kata")
const menu = document.getElementById("charSetPicker")
const game = document.getElementById("characterMenu")
const backButton = document.getElementById("back")

menu.classList.remove("hidden")
game.classList.add("hidden")

let pack

backButton.addEventListener("click", function(){
	menu.classList.remove("hidden")
	game.classList.add("hidden")
})

function choosePack(packChoice) {
	menu.classList.add("hidden")
	game.classList.remove("hidden")
	switch (packChoice) {
		case "hira": 
			pack =  "../characterpacks/charset - Hira.json"
			break
		case "kata":
			pack =  "../characterpacks/charset - Kata.json"
			break
	}
}

button1.addEventListener("click", function(){
	choosePack("hira")
	loadCharacter()
})

button2.addEventListener("click", function(){
	choosePack("kata")
	loadCharacter()
})

function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

async function loadCharacter() {
	characterDisplay.classList.remove("correct")
	characterDisplay.classList.remove("wrong")

	options.innerHTML = ""
	let charList = []

	await fetch(pack)
	.then(response => response.json())
	.then(data => {
		charList = JSON.stringify(data)
		charList = JSON.parse(charList)
	})

	let pickedChar = generateRandomNumber(1, charList.length)

	let pickedChar2
	let pickedChar3
	let pickedChar4

	while(pickedChar2 == undefined || pickedChar2 == pickedChar3 || pickedChar2 == pickedChar4 || pickedChar2 == pickedChar){
		pickedChar2 = generateRandomNumber(1, charList.length)
	}
	while(pickedChar3 == undefined || pickedChar3 == pickedChar2 || pickedChar3 == pickedChar4 || pickedChar3 == pickedChar){
		pickedChar3 = generateRandomNumber(1, charList.length)
	}
	while(pickedChar4 == undefined || pickedChar4 == pickedChar3 || pickedChar4 == pickedChar2 || pickedChar4 == pickedChar){
		pickedChar4 = generateRandomNumber(1, charList.length)
	}

	let correctOption = generateRandomNumber(1,5)
	let correctOptionButton = "option" + correctOption

	let incorrectOptions = []
	incorrectOptions.push(Object.values(charList[pickedChar2]))
	incorrectOptions.push(Object.values(charList[pickedChar3]))
	incorrectOptions.push(Object.values(charList[pickedChar4]))

	
	for(let i = 0; i < 4; i++) {
		const button = document.createElement('button')

		button.id = "option"+(i+1)
		button.classList.add("button")

		button.addEventListener("click", function() {
			if(button.id == correctOptionButton){
				characterDisplay.classList.add("correct")
			} else {
				characterDisplay.classList.add("wrong")
			}
			characterDisplay.innerHTML = translation
			setTimeout(loadCharacter, 1000)
		})

		let translation = Object.values(charList[pickedChar])

		if(correctOption == i+1){
			button.innerHTML = translation
		}
		else {
			button.innerHTML = incorrectOptions[0]
			incorrectOptions.splice(0,1)
		}

		options.appendChild(button)
	}

	let char = Object.keys(charList[pickedChar])
	characterDisplay.innerHTML = char
}