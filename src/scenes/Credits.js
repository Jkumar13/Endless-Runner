class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    
    preload() {
        // load audio
        this.load.image('background', './assets/CoolerBG.png');
        this.load.audio('StartSound', './assets/StartButton.wav');


    }

    create() {
        let creditsConfig = {
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
        
        // show credits text
        creditsConfig.fontSize = '56px';
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*8, 'CREDITS', creditsConfig).setOrigin(0.5);
        creditsConfig.fontSize = '36px';
        creditsConfig.color = '#000';
        creditsConfig.backgroundColor = '#ffffff';

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Art assets and code: Jay Kumar', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize - borderPadding*4, 'Soundtrack: Marbre by Airmow', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize - borderPadding, 'SFX: Mixkit (Website)', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*2, 'Inspirations: 140, Geometry Dash, Paddle Parkour', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*12, 'Press SPACE to return to MENU', creditsConfig).setOrigin(0.5);

        // // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        mouse = this.input.mousePointer;

    }
    update() {
        if (keySPACE.isDown) {
            this.sound.play('StartSound', {volume: 0.075});
            this.scene.start('menuScene');    
        }
    }
}