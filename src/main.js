// Exercise 02: RNGolf
// Name: Jay Kumar
// Date: 10/27/23

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#d5d5d5',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Play ]
}
let keyRIGHT, keyUP, keyDOWN, mouse, camera
let game = new Phaser.Game(config)

let { width, height } = game.config

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let w = game.config.width;
let h = game.config.height;