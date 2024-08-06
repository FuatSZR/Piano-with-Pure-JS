let pianoNotes = ['C','D','E','F','G','A','B']
let controls = document.querySelectorAll('.piano_control_option')
let keyboard = document.querySelector('.piano_keyboard')
let keys = []
let keyboarMap = ['1','1','1','1','1','1','1','1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N']
let init = () => {
    for (let i = 2; i <7 ; i++) {
        for (let j = 0; j < 7; j++) {
            let key = createKey('white', pianoNotes[j], i)
            key.dataset.keyboard = keyboarMap[j + (i-1) * 7]
            keyboard.appendChild(key)

            if (j!=2 && j!=6) {
                key = createKey('black', pianoNotes[j], i)
                key.dataset.keyboard = '⇧+' +keyboarMap[j + (i-1) * 7]
                let emptySpace = document.createElement('div')
                emptySpace.className ='empty-space'
                emptySpace.appendChild(key)
                keyboard.appendChild(emptySpace)
            }
        }
        
    }
}


let createKey = (type, note, octave) => {
    let key = document.createElement('button')
    key.className = `piano_key piano_key-${type}`
    key.dataset.letterNote = type =="white" ? note +octave : note + "#" +octave
    key.dataset.letterNoteFileName = type =="white" ? note +octave : note + "s" +octave
    key.textContent = key.dataset.letterNote
    keys.push(key)
    key.addEventListener('mousedown', () => {
        playSound(key)
        key.classList.add('piano_key-playing')
    })
    key.addEventListener('mouseup', () => {
        key.classList.remove('piano_key-playing')
    })
    key.addEventListener('mouseleave', () => {
        key.classList.remove('piano_key-playing')
    })
    return key;
}

document.addEventListener('keydown', (e) => {
    if(e.repeat){
        return
    }
    let lastletter = e.code.substring(e.code.length-1)
    let isShift = e.shiftKey
    let selector 
    if (isShift) {
        selector =`[data-keyboard="⇧+${lastletter}"]`
    }
    else{
        
        selector =`[data-keyboard="${lastletter}"]`
    }
    console.log(selector)
    let key = document.querySelector(selector)
    console.log(key)
    if (key != null) {
        let mousedown = new Event('mousedown')
        key.dispatchEvent(mousedown)
    }
})

document.addEventListener('keyup', (e) => {
    let lastletter = e.code.substring(e.code.length-1)
    let isShift = e.shiftKey
    let selector 
    if (isShift) {
        selector =`[data-keyboard="⇧+${lastletter}"]`
    }
    else{
        
        selector =`[data-keyboard="${lastletter}"]`
    }
    console.log(selector)
    let key = document.querySelector(selector)
    console.log(key)
    if (key != null) {
        let mouseup = new Event('mouseup')
        key.dispatchEvent(mouseup)
    }
})

let playSound = (key) => {
    let audio = document.createElement('audio')
    audio.src = 'sounds/' + key.dataset.letterNoteFileName + '.wav'
    audio.play().then(()=>audio.remove())

}

controls.forEach((input) => {
    input.addEventListener('input', () => {
        let value = input.value
        let type
        switch(value)
        {
            case 'letter_notes': type = 'letterNote'; break
            case 'keyboard': type ='keyboard' ; break
            case 'none': type = ''; break
        }
        keys.forEach((key)=> {
            key.textContent = key.dataset[type]
        })
    })
})

init()