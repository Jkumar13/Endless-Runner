class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ENDLESS RUNNER TITLE', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Move the mouse to control player', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00ff00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Get the gold coins to increase score', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*4, 'Avoid the world bounds and the projectiles!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*10, 'Press SPACE to start game', menuConfig).setOrigin(0.5);
        // // define keys
        // keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        mouse = this.input.mousePointer;

    }
    update() {
        if (keySPACE.isDown) {
            // easy mode
            
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            // this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (keySPACE.isDown) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            }
            // this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
    }
}