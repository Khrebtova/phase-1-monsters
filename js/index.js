const container = document.getElementById('monster-container')
const backBtn = document.getElementById('back')
const forwardBtn = document.getElementById('forward')
let i = 0
let numMonsters
const form = document.getElementById('create-form')
const mosterName = document.getElementById('name')
const monsterAge = document.getElementById('age')
const monsterDescription = document.getElementById('description')
getMonsters();
function getMonsters(){
    fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(data => {
        numMonsters = data.length
        printFiftyMonsters(data)
        // console.log(numMonsters)
    })
}

function printFiftyMonsters(arrayAllMonsters){
    const fiftyMonsters = arrayAllMonsters.slice(i, i + 50)
    container.innerHTML = ''
    fiftyMonsters.forEach(monster => printOneMonster(monster))
}

function printOneMonster(monster){
    let div = document.createElement('div')
    div.id = monster.id
        div.innerHTML = `
        <h2>${monster.name} (id: ${monster.id})</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
        <button onclick = "deleteMonster(${monster.id})">Delete</button>
        `
        container.appendChild(div)
}

forwardBtn.addEventListener('click', () => {
    if(i < (numMonsters - 50)){
        i += 50
        getMonsters()
    }
})

backBtn.addEventListener('click', () => {
    if (i > 0){
        i -= 50
        getMonsters()
    }        
})

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let newMonster = {
    "name": mosterName.value,
    "age": monsterAge.value,
    "description": monsterDescription.value
    }
    console.log(newMonster)
    postNewMonster(newMonster);
    form.reset()
})

function postNewMonster(monster){
    fetch('http://localhost:3000/monsters',{
        method : "POST",
        headers : {
            "Content-type" : "application/json",
            Accept : "application/json"
        },
        body: JSON.stringify(monster)
    })
    .then(res => res.json())
    .then(monster => {
        // console.log(monster)
        printOneMonster(monster)
    })
}

function deleteMonster(id){
    let div = document.getElementById(id)
    fetch(`http://localhost:3000/monsters/${id}`,{
        method : "DELETE",
    })
    .then(res => div.remove())
}

