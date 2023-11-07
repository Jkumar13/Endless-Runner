class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        // load audio
        this.load.image('background', './assets/CoolerBG.png');
        this.load.audio('StartSound', './assets/StartButton.wav');


    }

    create() {
        let menuConfig = {
            fontFamily: 'Fantasy',
            fontSize: '56px',
            //backgroundColor: '#F3B141',
            color: '#800080',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'background').setOrigin(0, 0).setScale(2)
        
        // show menu text
        menuConfig.fontSize = '112px';
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*9, 'TECHNICOLOR ESCAPE', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '36px';
        menuConfig.color = '#fff';
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*1.5, 'INSTRUCTIONS', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*1.5, '____________', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '28px';
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + borderPadding*1.5, 'Move the mouse to control the player', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize - borderPadding*1.8, 'Get the gold coins to increase your score and to drive back the STORM!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'The enemies might act according to the beat so TURN ON MUSIC!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*3.7, 'Avoid the projectiles and SURVIVE!', menuConfig).setOrigin(0.5);
        menuConfig.color = '#000';
        menuConfig.backgroundColor = '#ffffff';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*8, 'Press SPACE to START', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*12, 'Press -> for CREDITS', menuConfig).setOrigin(0.5);

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
            this.scene.start('playScene');    
        }
        if (keyRIGHT.isDown) {

            this.sound.play('StartSound', {volume: 0.075});
            this.scene.start('creditsScene');    
        }
    }
}