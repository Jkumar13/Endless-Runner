class Restart extends Phaser.Scene {
    constructor() {
        super("restartScene");
    }
    
    preload() {
        // load audio


    }

    create() {
        let restartConfig = {
            fontFamily: 'Fantasy',
            fontSize: '56px',
            //backgroundColor: '#F3B141',
            color: '#ffffff',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'background').setOrigin(0, 0).setScale(2)
        

        // show restart text
        restartConfig.fontSize = '56px';
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*2, 'GAME OVER', restartConfig).setOrigin(0.5);
        this.randomizedText = ["Good effort!", "Not bad!", "So close!", "Watch out for those spikes!", "Try again!"]
        this.randVar = Phaser.Math.Between(0, 4)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + borderPadding * 4, this.randomizedText[this.randVar], restartConfig).setOrigin(0.5);
        restartConfig.fontSize = '28px';
        restartConfig.color = '#000';
        restartConfig.backgroundColor = '#ffffff';

        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding * 8, 'MOUSE-CLICK to restart', restartConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding * 12, 'SPACE to return to the menu', restartConfig).setOrigin(0.5);
        // // define keys
        // keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        mouse = this.input.mousePointer;

    }
    update() {
        //this.background.tilePositionX += 3

        if (mouse.isDown) {
            this.sound.play('StartSound', {volume: 0.075});
            this.scene.start('playScene');    
        }
        if (keySPACE.isDown) {
            this.sound.play('StartSound', {volume: 0.075});
            this.scene.start('menuScene');    
        }
    }
}