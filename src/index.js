import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './Components/App';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

const score_box = document.getElementById('score_number')

let score = 0

let speed = 200 / parseFloat(prompt('Select speed between 0.25 and 2.0'))


const manzana = "url('https://i.imgur.com/GkenLdI.png')"

const serpiente = {
    cabeza: {
        down: "url('https://i.imgur.com/swYAP3B.png')",
        up: "url('https://i.imgur.com/U8aFmSr.png')",
        left: "url('https://i.imgur.com/L4vhiVv.png')",
        right: "url('https://i.imgur.com/LBh0joH.png')",

    },
    cuerpo: {
        horizontal:"url('https://i.imgur.com/nNtb3r3.png')",
        vertical: "url('https://i.imgur.com/xFi1ox5.png')"
    }
}

let playing_condition = false

let play

const keys_codes = {
    LEFT:37,
    UP:38,
    RIGHT:39,
    DOWN:40,
    ESPACE:32,
    ENTER:13,
}

const n = 'none'

const divRoot = document.querySelector('#root')

let snake_direction = 'down'

let snake_is_alive = true

// let snakePath = [[4,1],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11],[3,12],[4,12],[5,12]]
let snakePath = [[8,7],[8,8],[8,9]]

let appleCoords = [8,8]

// const palete = ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#16a085','#27ae60','#2980b9','#8e44ad','#2c3e50','#f1c40f','#e67e22','#e74c3c','#ecf0f1','#95a5a6','#f39c12','#d35400','#c0392b','#bdc3c7','#7f8c8d']

// import manzana from './assets/Manzana.png'

const decodeCoords = (coords) => {
    return ( 15-coords[0] + coords[1]*16)
} 

const changeBlockBackground = (blockId, background) => {
    document.getElementById(`${blockId}`).style.backgroundImage = background
    // document.getElementById(`${blockId}`).style.backgroundImage = 'none'   
}

const changeBackgroundAll = ( background ) => {
    for (let index = 0; index < 256; index++) {
    
        // let content = document.getElementById(`${index}`)
        // let color = palete[Math.floor(Math.random()*20)]
        // content.style.backgroundImage = serpiente.cabeza
        document.getElementById(`${index}`).style.backgroundImage = background
        // content.style.backgroundRepeat = 'no-repeat'
    }
}

const clear = () => {
    changeBackgroundAll(n)
}

const sendApple = () => {

    appleCoords = [parseInt(Math.random()*16), parseInt(Math.random()*16)]
    
    // if (snakePath.includes(appleCoords)) {
    //     console.log('Cayó dentro pero se cambió')
    //     appleCoords = [parseInt(Math.random()*16), parseInt(Math.random()*16)]
    // }

    changeBlockBackground(decodeCoords(appleCoords), manzana)
}

const headDirection = () => {
    //Left
    if (snakePath[0][1] < snakePath[1][1]) {
        // console.log('left')
        return(serpiente.cabeza.down)
        
    }
    //Right
    if (snakePath[0][1] > snakePath[1][1]) {
        // console.log('left')
        return(serpiente.cabeza.up)
    }
    //Up
    if (snakePath[0][0] < snakePath[1][0]) {
        // console.log('left')
        return(serpiente.cabeza.left)
    }
    //Down
    if (snakePath[0][0] > snakePath[1][0]) {
        // console.log('left')
        return(serpiente.cabeza.right)

    }
}

const createSnake = () => {
    // clear()
    for (let index = 0; index < snakePath.length; index++)
    {
        if (index === 0) {
            changeBlockBackground(  decodeCoords(snakePath[index]) , headDirection())
        }

        else {
            changeBlockBackground(  decodeCoords(snakePath[index]) , serpiente.cuerpo.horizontal)
        }

    }
}

const next_tile = () => {

    if (snake_direction === 'down') {
        return([ snakePath[0][0] ,  snakePath[0][1] - 1 ])
    }
    if (snake_direction === 'up') {
        return([ snakePath[0][0] ,  snakePath[0][1] + 1 ])
    }
    if (snake_direction === 'left') {
        return([ snakePath[0][0]  -  1 ,  snakePath[0][1] ])
    }
    if (snake_direction === 'right') {
        return([ snakePath[0][0]  +  1 ,  snakePath[0][1] ])
    }

}

const moveSnake = () => {
    
    let target = next_tile()
    // console.log(target, appleCoords)

    if ( target[0]<0 || target[1]<0 || target[0]>15 || target[1]>15) {
        snake_is_alive = false
    }
    else {
        if (target[0] === appleCoords[0]   && target[1] === appleCoords[1]) {

            snakePath.unshift(target)
            score+=100
            sendApple()

            document.getElementById('score_number').innerHTML = String(score)

        }

        else {
            snakePath.pop()
            snakePath.unshift(target)
            
        }
    }
}

const game_turn = () => { 
    if (snake_is_alive) {

        clear()

        moveSnake()
    
        createSnake()
    
        changeBlockBackground(decodeCoords(appleCoords), manzana)
    }

    else {

        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'You lose!',
        //   })
        pause()
    }

}


const change_d_left = () => snake_direction = 'left'
const change_d_right = () => snake_direction = 'right'
const change_d_up = () => snake_direction = 'up'
const change_d_down = () => snake_direction = 'down'

const space_functions = () => {
    if (snake_is_alive) {
        if (playing_condition === false) {
            start()
        }
        else {
            pause()
        }
    }
    else {
        setTimeout (restart, 1000)
    }
}
const enter_functions = () => {
    pause()
    speed = 200 / parseFloat(prompt('Select speed between 0.25 and 2.0'))
}


const listenKey = (event) => {

    // console.log('Holii')

    let key = event.keyCode;

    // console.log(key)

    if (key === keys_codes.LEFT) {
        // console.log('Presionó  izquierda')
        // snake_direction = 'left'
        change_d_left()
    }
    if (key === keys_codes.RIGHT) {
        // console.log('Presionó  derecha')
        // snake_direction = 'right'
        change_d_right()
    }
    if (key === keys_codes.DOWN) {
        // console.log('Presionó  abajo')
        // snake_direction = 'down'
        change_d_down()
    }
    if (key === keys_codes.UP) {
        // console.log('Presionó  arriba')
        // snake_direction = 'up'
        change_d_up()
    }
    if (key === keys_codes.ESPACE) {

        // if (snake_is_alive) {
        //     if (playing_condition === false) {
        //         start()
        //     }
        //     else {
        //         pause()
        //     }
        // }
        // else {
        //     setTimeout (restart, 1000)
        // }
        space_functions()
    }

    
    if (key === keys_codes.ENTER) {
        // pause()
        // speed = 200 / parseFloat(prompt('Select speed between 0.25 and 2.0'))
        enter_functions()
    }


}

const appRender = async () => {
    await ReactDOM.render( <App score= {score}/> , divRoot);
}

const exe = async() => {
    await appRender()
    await createSnake()
    await sendApple()
    var button_up = document.getElementById('arrow_1') 
    var button_left = document.getElementById('arrow_2') 
    var button_right = document.getElementById('arrow_3') 
    var button_down = document.getElementById('arrow_4')
    var button_space = document.getElementById('space')
    var button_enter = document.getElementById('enter')

    button_up.addEventListener('click', change_d_up)
    button_left.addEventListener('click', change_d_left)
    button_right.addEventListener('click', change_d_right)
    button_down.addEventListener('click', change_d_down)
    button_space.addEventListener('click', space_functions)
    button_enter.addEventListener('click', enter_functions)
}

window.onkeydown = listenKey;

const start = () => {
    play = setInterval( game_turn, speed )
    playing_condition = true
}
const pause = () => {
    clearInterval(play)
    playing_condition = false
}
const restart = () => {
    clear()
    
    score = 0
    document.getElementById('score_number').innerHTML = String(score)

    snake_direction = 'down'
    snakePath = [[8,7],[8,8],[8,9]]
    createSnake()
    sendApple()
    snake_is_alive = true
    start()
}

exe()

