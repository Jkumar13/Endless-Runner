// ENDLESS RUNNER
// Name: Jay Kumar
// Date: 11/6/23

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#797979',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Menu, Credits, Play, Restart ]
}
let keyRIGHT, keyUP, keyDOWN, mouse, camera, keySPACE
let game = new Phaser.Game(config)

let { width, height } = game.config

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let w = game.config.width;
let h = game.config.height;