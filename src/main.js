// ENDLESS RUNNER
// Name: Jay Kumar
// Date: 11/6/23

// Technical tilt: I utilized the (time, delta) arguments in the Update() method in the following ways:
    // To activate certain "events" based on how far into the game the player is.
        // At in-game-time == roughly 47 seconds (when the soundtrack's beat drop occurs), I activate various events such as a changing-color background, a speed boost to enemy projectiles, a screen shake, etc.
    // To activate certain "events" roughly every song beat (115 bpm, or a litle over every second)
        // Utilizing this, I can trigger color changes to the background, player, and enemy ship roughly every second, in a way that feels in sync with the current soundtrack
        // I can also utilize this code to make the enemy ship alternate between two behaviors: moving after the player, and attacking the player by shooting a projectile
    // I had to do much research into how to utilize the time and delta variables in update(), in order to make these features work.

// Creative tilt: 
    // I added a trail that follows the main character. This should allow the player to get a feel for where and how their character is moving.
    // A clever idea I wanted to try was making color and movement changes sync up to the current beat of the song (this was also menntioned above in technical tilt)
    // Many endless runners that I have seen don't really allow free aerial and directional movement via mouse control, so I wanted to experiment with this kind of movement system
    // Also briefly mentioned above, but at around 47 seconds (in-game time) when the beat drop occurs, I completely shake up the color scheme of much of the background assets
        // I also utilize camera shake to sync up with the laser that happens at time = 47 seconds, which creates this decently cool moment where the song's beat drop changes the entire game
    
        // In order to make score (the yellow coins) matter, I added a temple-run-like STORM that slowly approaches the player from off-screen.
        // If the player is not collecting coins, the storm will show up on the screen and slowly consume the entire screen
        // Collecting coins drives back the storm
        // Any coins or spikes that collide with the storm are "destroyed" (in reality, their positions are reset)
        // As the game progresses and the player's in-game score and time count goes higher, the storm will travel faster, which further incentivizes the player to collect more and more coins

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