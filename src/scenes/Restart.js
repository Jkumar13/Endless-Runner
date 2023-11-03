class Restart extends Phaser.Scene {
    constructor() {
        super("restartScene");
    }
    
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        let restartConfig = {
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

        // show restart text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Ur bad', restartConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'MOUSE-CLICK to restart', restartConfig).setOrigin(0.5);
        restartConfig.backgroundColor = '#00ff00';
        restartConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Placeholder text for other stuff idk', restartConfig).setOrigin(0.5);
        // // define keys
        // keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (mouse.isDown) {
            // easy mode
            
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            // this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (mouse.isDown) {
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