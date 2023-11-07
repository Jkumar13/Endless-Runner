class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    // Things to change when speedup drop happens:
        // recentlyPRessedVar - from 60 -> 30
        // wall speed - wallTimer from 1000 -> 500
        // background color change speed - also changed via wallTimer
        // maybe add second rocket enemy

    preload() {
        this.load.audio('soundtrack', './assets/cmpm120music.wav');
        this.load.audio('CollectCoin', './assets/collectCoin2.wav');
        this.load.audio('Explode', './assets/ExplodeSound.wav');
        this.load.audio('LaserSound', './assets/LaserBeam.wav');
        this.load.audio('LaserTinyShot', './assets/LaserTinyShot.wav');


        this.load.spritesheet('player', './assets/spritesheet(2).png', {
            frameWidth: 156,
            frameHeight: 156
        });

        //this.load.image('player', './assets/PlayerModel3.png');
        this.load.image('enemyShip', './assets/enemyShip.png');
        this.load.image('BG', './assets/backgroundLayer3.png');

        this.load.image('danger', './assets/dangerSign.png');
        this.load.image('trail', './assets/trail3.png');
        this.load.image('menu1', './assets/menu1.png');
        this.load.image('coin', './assets/coin 1.png');
        this.load.image('proj0', './assets/redSpike.png');
        this.load.image('projectile', './assets/redSpike.png');
        this.load.image('screenHazard', './assets/screenHazard2.png');
        this.load.image('laser', './assets/laser 1.png');
        this.load.image('explode', './assets/background (2).png');




    }

    wall() {
        console.log(this.shootLaser)
        this.wallVelocity -= 5
        this.increment += 1
        if (this.increment >= 50) {
            this.wallVelocity -= 10
        }
        if (this.increment >= 75) {
            this.wallVelocity -= 15
        }
        if (this.shootLaser == 0 || this.shootLaser == 2) {
            this.WallProj.body.setImmovable(true)
            this.WallProj.setX(this.wallA.x+5)
            this.WallProj.setY(this.wallA.y+50)
            this.WallProj.body.setVelocityY(-1*Phaser.Math.Between(this.wallVelocity, this.wallVelocity-75))
        }
        else if (this.shootLaser == 1 || this.shootLaser == 3) {
            this.WallProj2.body.setImmovable(true)
            this.WallProj2.setX(this.wallA.x+5)
            this.WallProj2.setY(this.wallA.y+50)
            this.WallProj2.body.setVelocityY(-1*Phaser.Math.Between(this.wallVelocity, this.wallVelocity-75))
        }
        this.sound.play("LaserTinyShot", {volume: 0.09})

    }

    create() {
        this.soundtrack = this.sound.add('soundtrack', {loop: true, volume: 3});
        this.soundtrack.play('');
        
        this.musicTime = this.soundtrack.seek


        this.createConfig = {
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


        this.wallVelocity = -150
        this.increment = 0
        this.stopGame = 0

        this.background = this.add.tileSprite(0, 0, 1280, 720, 'background').setOrigin(0, 0).setScale(2)
        this.backgroundLayer2 = this.add.tileSprite(0, 0, 2560, 1540, 'BG').setOrigin(0, 0).setScale(0.5).setTint(0x000000)
        this.screenHazard = this.physics.add.image(-2750, 0, "screenHazard").setOrigin(0,0).setScale(1.7);

        
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        mouse = this.input.mousePointer;

        // add ball
        this.ball = this.physics.add.sprite(320, 360, 'player').setScale(0.5)
        this.ball.body.setCircle(this.ball.width / 4, 45, 45)
        this.ball.body.setBounce(0.5)
        //
                            this.ball.body.setImmovable(true)
        //
        this.ball.body.setDamping(true).setDrag(0.5)
        

        // add walls

        this.wallA = this.physics.add.sprite(0, height / 4, 'enemyShip').setScale(0.3).setRotation(-1.57).setTint(0xffffff)
        this.wallA.setCircle(this.wallA.width/2.5, 75)
        this.wallA.flipX = true;
        this.wallA.setX(640)
        this.wallA.setY(0)
        this.wallA.body.setImmovable(true)
        this.wallA.body.setCollideWorldBounds(true)


        this.WallProj = this.physics.add.sprite(-100, -100, 'proj0').setScale(0.3).setTint(0xffffff);
        this.WallProj.flipX = true;
        this.physics.add.collider(this.ball, this.WallProj, (ball, WallProj) => {
            this.soundtrack.stop();
            this.soundtrack.destroy(true)
            this.ball.body.setVelocity(0, 0)
            this.stopGame += 1
        })
        this.WallProj2 = this.physics.add.sprite(-100, -100, 'proj0').setScale(0.3).setTint(0xffffff);
        this.WallProj2.flipX = true;
        this.physics.add.collider(this.ball, this.WallProj2, (ball, WallProj2) => {
            this.soundtrack.stop();
            this.soundtrack.destroy(true)
            this.ball.body.setVelocity(0, 0)
            this.stopGame += 1
        })

        this.Laser = this.physics.add.sprite(-100, -100, 'laser').setScale(0.4)
        this.Laser.scaleY = 5
        this.Laser.setTint(0x02a59b);
        this.physics.add.collider(this.ball, this.Laser, (ball, Laser) => {
            this.soundtrack.stop();
            this.soundtrack.destroy(true)
            this.ball.body.setVelocity(0, 0)
            this.stopGame += 1
        })
        this.danger = this.add.image(-3000, -3000, 'danger')

        this.physics.add.collider(this.ball, this.wallA)

        this.physics.add.collider(this.ball, this.wallA, (ball, wallA) => {
            this.soundtrack.stop();
            this.soundtrack.destroy(true)
            this.ball.body.setVelocity(0, 0)
            this.stopGame += 1
        })
        
        this.cooldown = 0
        this.cooldown2 = 0


        this.playerVector = new Phaser.Math.Vector2(0, 0)

        this.colors = [0xfb00fd, 0xffa500, 0x79c314, 0xfb00fd, 0xffa500, 0x79c314, 0x02a59b];
        this.colors2 = [0xf33838, 0xffa500, 0x79c314, 0x487de7, 0x4b369d, 0x70369d, 0x02a59b];
        this.colors3 = [0xffffff, 0xbfbfbf, 0xffffff, 0xbfbfbf, 0xffffff, 0xbfbfbf];
        this.colorsVar = 0

        this.rotationChange = 0

        this.trail1 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "player").setScale(0.2);
        this.trail2 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "player").setScale(0.2);
        this.trail3 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "player").setScale(0.2);
        this.trail4 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "player").setScale(0.2);
        this.trail5 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "player").setScale(0.2);
        this.trail6 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "player").setScale(0.2);
        this.trail7 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "player").setScale(0.2);
        this.trail8 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "player").setScale(0.2);
        this.trail9 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "player").setScale(0.2);
        this.trail10 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "player").setScale(0.2);
        this.trails = this.add.group([this.trail1, this.trail2, this.trail3, this.trail4, this.trail5, this.trail6, this.trail7, this.trail8, this.trail9, this.trail10])

        this.startGame = 0
        this.startMovement = 0

        this.pauseWalls = 0

        this.checkpoint1 = 0
        this.projectileCooldown = 0



        this.anims.create({
            key: 'down-right',
            frameRate: 0, 
            repeat: 1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 2,
                end: 2
            })
        })
        this.anims.create({
            key: 'up-right',
            frameRate: 0, 
            repeat: 1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 1,
                end: 1
            })
        })
        this.anims.create({
            key: 'down-left',
            frameRate: 0, 
            repeat: 1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 5,
                end: 5
            })
        })
        this.anims.create({
            key: 'up-left',
            frameRate: 0, 
            repeat: 1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 4,
                end: 4
            })
        })
        this.anims.create({
            key: 'idle-left',
            frameRate: 0, 
            repeat: 1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 3,
                end: 3
            })
        })
        this.anims.create({
            key: 'idle-right',
            frameRate: 0, 
            repeat: 1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 0
            })
        })
        



        this.score = 0
        this.time = 0
        this.text0 = this.add.text(80, 40, "Score", this.createConfig).setOrigin(0.5);
        this.text1 = this.add.text(1200, 40, "Time", this.createConfig).setOrigin(0.5);
        this.scoreText = this.add.text(80, 105, this.score, this.createConfig).setOrigin(0.5);
        this.timeText = this.add.text(1200, 105, this.score, this.createConfig).setOrigin(0.5);
        this.coin1 = this.physics.add.sprite(Phaser.Math.Between(2000, 2500), Phaser.Math.Between(250, 690), 'coin').setScale(0.25).setTint(0xffffff);
        this.coin1.setVelocity(Phaser.Math.Between(-200, -250), 0)
        this.coin2 = this.physics.add.sprite(Phaser.Math.Between(6000, 7500), Phaser.Math.Between(250, 690), 'coin').setScale(0.25).setTint(0xffffff);
        this.coin2.setVelocity(Phaser.Math.Between(-200, -250), 0)
        this.coin3 = this.physics.add.sprite(Phaser.Math.Between(10000, 12500), Phaser.Math.Between(250, 690), 'coin').setScale(0.25).setTint(0xffffff);
        this.coin3.setVelocity(Phaser.Math.Between(-200, -250), 0)
        this.coin4 = this.physics.add.sprite(Phaser.Math.Between(20000, 22500), Phaser.Math.Between(250, 690), 'coin').setScale(0.25).setTint(0xffffff);
        this.coin4.setVelocity(Phaser.Math.Between(-200, -250), 0)
        this.coin5 = this.physics.add.sprite(Phaser.Math.Between(25000, 35000), Phaser.Math.Between(250, 690), 'coin').setScale(0.25).setTint(0xffffff);
        this.coin5.setVelocity(Phaser.Math.Between(-200, -250), 0)
        this.coins = this.add.group([this.coin1, this.coin2, this.coin3, this.coin4, this.coin5])
        this.scoreValue = 1
        this.physics.add.collider(this.ball, this.coin1, (ball, coin1) => {
            this.coin1.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(250, 690))
            this.coin1.setVelocity(Phaser.Math.Between(-200, -300) + this.wallVelocity/1.6, 0)
            this.score += 1
            this.screenHazard.x -= this.score / this.scoreValue; this.scorePause = 1
            this.scoreText.text = this.score
            this.sound.play('CollectCoin', {volume: 0.07})
        })
        this.physics.add.collider(this.ball, this.coin2, (ball, coin2) => {
            this.coin2.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(250, 690))
            this.coin2.setVelocity(Phaser.Math.Between(-200, -300) + this.wallVelocity/1.6, 0)
            this.score += 1
            this.screenHazard.x -= this.score / this.scoreValue; this.scorePause = 1 
            this.scoreText.text = this.score
            this.sound.play('CollectCoin', {volume: 0.07})
        })
        this.physics.add.collider(this.ball, this.coin3, (ball, coin3) => {
            this.coin3.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(250, 690))
            this.coin3.setVelocity(Phaser.Math.Between(-200, -300) + this.wallVelocity/1.6, 0)
            this.score += 1
            this.screenHazard.x -= this.score / this.scoreValue; this.scorePause = 1 
            this.scoreText.text = this.score
            this.sound.play('CollectCoin', {volume: 0.07})
        })
        this.physics.add.collider(this.ball, this.coin4, (ball, coin4) => {
            this.coin4.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(250, 690))
            this.coin4.setVelocity(Phaser.Math.Between(-200, -300) + this.wallVelocity/1.6, 0)
            this.score += 1
            this.screenHazard.x -= this.score / this.scoreValue; this.scorePause = 1 
            this.scoreText.text = this.score
            this.sound.play('CollectCoin', {volume: 0.07})
        })
        this.physics.add.collider(this.ball, this.coin5, (ball, coin5) => {
            this.coin5.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(250, 690))
            this.coin5.setVelocity(Phaser.Math.Between(-200, -300) + this.wallVelocity/1.6, 0)
            this.score += 1
            this.screenHazard.x -= this.score / this.scoreValue; this.scorePause = 1 
            this.scoreText.text = this.score
            this.sound.play('CollectCoin', {volume: 0.07})
        })
        this.scrollCheck = 0
        this.spike1 = this.physics.add.sprite(Phaser.Math.Between(4500, 5000), Phaser.Math.Between(250, 690), 'projectile').setScale(0.3).setTint(0xffffff).setRotation(1.57)
        this.spike1.setVelocity(Phaser.Math.Between(-100, -200) * (this.scrollCheck+1), 0)
        this.spike2 = this.physics.add.sprite(Phaser.Math.Between(10000, 12000), Phaser.Math.Between(250, 690), 'projectile').setScale(0.3).setTint(0xffffff).setRotation(1.57)
        this.spike2.setVelocity(Phaser.Math.Between(-100, -200) * (this.scrollCheck+1), 0)
        this.spike3 = this.physics.add.sprite(Phaser.Math.Between(13000, 17000), Phaser.Math.Between(250, 690), 'projectile').setScale(0.3).setTint(0xffffff).setRotation(1.57)
        this.spike3.setVelocity(Phaser.Math.Between(-100, -200) * (this.scrollCheck+1), 0)
        this.spike4 = this.physics.add.sprite(Phaser.Math.Between(20000, 24000), Phaser.Math.Between(250, 690), 'projectile').setScale(0.3).setTint(0xffffff).setRotation(1.57)
        this.spike4.setVelocity(Phaser.Math.Between(-100, -200) * (this.scrollCheck+1), 0)
        this.spike5 = this.physics.add.sprite(Phaser.Math.Between(30000, 35000), Phaser.Math.Between(250, 690), 'projectile').setScale(0.3).setTint(0xffffff).setRotation(1.57)
        this.spike5.setVelocity(Phaser.Math.Between(-100, -200) * (this.scrollCheck+1), 0)
        this.spikes = this.add.group([this.spike1, this.spike2, this.spike3, this.spike4, this.spike5])

        this.physics.add.collider(this.ball, this.spikes, (ball, spikes) => {
            this.soundtrack.stop();
            this.soundtrack.destroy(true)
            this.ball.body.setVelocity(0, 0)
            this.stopGame += 1
        })
        this.physics.add.collider(this.ball, this.screenHazard, (ball, screenHazard) => {
            this.soundtrack.stop();
            this.soundtrack.destroy(true)
            this.ball.body.setVelocity(0, 0)
            this.stopGame += 1
        })

        this.menuText = this.add.sprite(640, 360, "menu1")
        this.shootLaser = 3.49
        this.laserWarning = 0
        this.laserSoundDelay = 0
        this.scorePause = 0

        this.timerVariable1 = 0
        this.wallTimer = -325
        this.scroll = 0.75

        
    }

    update(time, delta) {
        if (this.scorePause == 1 && this.screenHazard.x > -1700) {
            this.screenHazard.x = -1700 + this.score
        }
        if (this.scorePause == 0 || this.screenHazard.x > -1650) {
            this.screenHazard.x += 0.15 + (this.score / 1000)
        }
        if (this.score >= 50) {
            this.scoreValue = 1.1
        }
        if (this.score >= 75) {
            this.scoreValue = 1.25
        }
        if (this.score >= 100) {
            this.scoreValue = 2.25
        }
        if (!game.input.mousePointer.x == 0 && !game.input.mousePointer.y == 0) {
            this.startMovement = 1
            this.menuText.destroy(true)
        }
        else if (time % 1000 < 10){
            this.menuText.tint = (this.colors2[this.colorsVar / 2])
        }
        this.background.tilePositionX += this.scroll
        this.backgroundLayer2.tilePositionX += this.scroll
        this.backgroundLayer2.tilePositionY += (this.scroll*-1)/4
        this.wallTimer += delta
        this.timerVariable1 += delta
        if (this.wallTimer > 521.74*2) {
            if (this.colorsVar < 5) {
                this.colorsVar += 1
            }
            else {
                this.colorsVar = 0
            }
            this.shootLaser += 0.5
            if (this.shootLaser > 3.5) {
                this.shootLaser = 0
            }
            if (this.shootLaser == 3 && this.timerVariable1 > 48000) {
                this.laserSoundDelay = 1
            }
            if (this.score >= 100) {
                this.scoreText.tint = (this.colors2[this.colorsVar])
                this.text0.tint = (this.colors2[this.colorsVar])
            }
            if (this.time >= 100) {
                this.timeText.tint = (this.colors2[this.colorsVar])
                this.text1.tint = (this.colors2[this.colorsVar])
            }
            if (this.scorePause == 1) {
                this.scorePause = 0
            }
            this.startGame += 1
            this.time += 1
            this.timeText.text = this.time
            if (this.pauseWalls < 1) {
                this.wallA.body.setVelocity(0, 0)
                this.pauseWalls += 1
            }
            else {
                this.pauseWalls = 0
            }
            this.wallTimer = 0
            if (this.timerVariable1 > 50000) {
                if (this.scrollCheck != 1) {
                    this.scroll += 2
                    this.scrollCheck = 1
                }
                this.scroll += 0.025
                this.background.tint = (this.colors2[6 - this.colorsVar])
                this.backgroundLayer2.tint = (this.colors[this.colorsVar])
            }
            else if (this.timerVariable1 > 8000) {
                this.background.tint = (this.colors3[this.colorsVar+1])
            }
            if (this.timerVariable1 % 75000 < 1500) {
                this.wallTimer += 200
            }
            if (this.timerVariable1 > 8000) {
                this.screenHazard.tint = (this.colors3[6 - this.colorsVar])
                this.ball.tint = (this.colors2[this.colorsVar])
                this.wallA.tint = (this.colors2[this.colorsVar])
                this.Laser.tint = (this.colors2[this.colorsVar])
                
                this.trail1.tint = (this.colors2[this.colorsVar])
                this.trail2.tint = (this.colors2[this.colorsVar])
                this.trail3.tint = (this.colors2[this.colorsVar])
                this.trail4.tint = (this.colors2[this.colorsVar])
                this.trail5.tint = (this.colors2[this.colorsVar])
                this.trail6.tint = (this.colors2[this.colorsVar])
                this.trail7.tint = (this.colors2[this.colorsVar])
                this.trail8.tint = (this.colors2[this.colorsVar])
                this.trail9.tint = (this.colors2[this.colorsVar])
                this.trail10.tint = (this.colors2[this.colorsVar])
            }
        }
   
        this.cooldown += 1
        this.cooldown2 += delta
        let playerDirectionX
        let playerDirectionY
        if (game.input.mousePointer.x > this.ball.x) {
                this.playerVector.x = 1
                playerDirectionX = 'right'
        }
        if (game.input.mousePointer.x < this.ball.x) {
                this.playerVector.x = -1
                playerDirectionX = 'left'
        }
        if (game.input.mousePointer.y < this.ball.y) {
                this.playerVector.y = -1
                playerDirectionY = 'up'
        }
        if (game.input.mousePointer.y > this.ball.y) {
                this.playerVector.y = 1
                playerDirectionY = 'down'
        }
        if (this.cooldown >= 10) {
            this.cooldown = 0;
            this.playerVector.normalize()
            if (this.startMovement > 0) {
                this.ball.body.setVelocity(500 * this.playerVector.x, 500 * this.playerVector.y)
            }
            this.playerVector.x = 0
            this.playerVector.y = 0
        }
        if (Phaser.Math.Distance.Between(game.input.mousePointer.x-15, game.input.mousePointer.y-10, this.ball.body.x, this.ball.body.y) < 25) {
            this.playerVector.x = 0
            this.playerVector.y = 0
            playerDirectionY = 'idle'
            this.ball.body.setVelocity(0 * this.playerVector.x, 0 * this.playerVector.y)
        }   
        this.ball.play(playerDirectionY + '-' + playerDirectionX, true)
        if (this.cooldown2 > 100 && this.cooldown2 < 109/* && this.score >= 10*/) {
            this.trail1.setPosition(this.ball.x, this.ball.y)
            this.trail1.setScale(0.24)
        }
        if (this.cooldown2 > 200 && this.cooldown2 < 209/* && this.score >= 10*/) {
            this.trail2.setPosition(this.ball.x, this.ball.y)
            this.trail2.setScale(0.22)
        }
        if (this.cooldown2 > 300 && this.cooldown2 < 309/* && this.score >= 10*/) {
            this.trail3.setPosition(this.ball.x, this.ball.y)
            this.trail3.setScale(0.20)
        }
        if (this.cooldown2 > 400 && this.cooldown2 < 409/* && this.score >= 10*/) {
            this.trail4.setPosition(this.ball.x, this.ball.y)
            this.trail4.setScale(0.18)
        }
        if (this.cooldown2 > 500 && this.cooldown2 < 509/* && this.score >= 25*/) {
            this.trail5.setPosition(this.ball.x, this.ball.y)
            this.trail5.setScale(0.16)
        }
        if (this.cooldown2 > 600 && this.cooldown2 < 609/* && this.score >= 25*/) {
            this.trail6.setPosition(this.ball.x, this.ball.y)
            this.trail6.setScale(0.14)
        }
        if (this.cooldown2 > 700 && this.cooldown2 < 709/* && this.score >= 25*/) {
            this.trail7.setPosition(this.ball.x, this.ball.y)
            this.trail7.setScale(0.12)
        }
        if (this.cooldown2 > 800 && this.cooldown2 < 809/* && this.score >= 50*/) {
            this.trail8.setPosition(this.ball.x, this.ball.y)
            this.trail8.setScale(0.10)
        }
        if (this.cooldown2 > 900 && this.cooldown2 < 909/* && this.score >= 50*/) {
            this.trail9.setPosition(this.ball.x, this.ball.y)
            this.trail9.setScale(0.08)
        }
        if (this.cooldown2 > 1000) {
            //if (this.score >= 50) {
                this.trail10.setPosition(this.ball.x, this.ball.y)
                this.trail10.setScale(0.06)
            //}
            this.cooldown2 = 0
        }
        let velo = 175
        if (this.pauseWalls == 0 && this.startGame > 2 && this.timerVariable1 > 8000) {
            if (this.shootLaser >= 3.5 && this.timerVariable1 > 50000) {
                velo = 50 + this.score
            }
            else {
                velo = 200 + (this.score * (this.scrollCheck+1))
            }
            if (this.ball.x - this.wallA.x > 10) {
                this.wallA.body.setVelocity(velo * 1, 0)
            }
            else if (this.wallA.x - this.ball.x > 10) {
                this.wallA.body.setVelocity(velo * -1, 0)
            }
            this.projectileCooldown = 0
        }
        else if (this.projectileCooldown == 0 && this.startGame > 0){
            if (this.timerVariable1 > 49000 && this.shootLaser == 3) {
                this.laserWarning = 1
                this.danger.setPosition(this.wallA.x + 7, this.wallA.y)
            }
            else {
                this.danger.setPosition(-3000, -3000)
                this.laserWarning = 0
            }
            if (this.laserWarning == 0) {
                this.wall()
                this.projectileCooldown = 1
            }
        }
        if (this.laserSoundDelay > 0) {
            this.laserSoundDelay += 1
            if (this.laserSoundDelay > 60) {
                this.sound.play("LaserSound", {volume: 0.15})
                this.laserSoundDelay = 0
            }
        }
        if (this.shootLaser == 3.5 && this.startGame > 0 && this.timerVariable1 > 50000) {
            this.danger.setPosition(-3000, -3000)
            this.Laser.setX(this.wallA.body.x+57)
            this.Laser.setY(this.wallA.y+545)
            this.cameras.main.shake(400, 0.005);
        }
        else if (this.shootLaser == 0){
            this.Laser.setX(this.wallA.x+2500)
            this.Laser.setY(this.wallA.y+540)
        }
        if (this.wallA.body.x < 50) {
            this.wallA.body.setVelocityY(0)
        }
        if (this.stopGame > 0) {
            if (this.stopGame == 1) {
                this.sound.play("Explode", {volume: 0.2})
            }
            this.stopGame += 1
            if (this.stopGame >= 5) {
                if (this.stopGame < 6) {
                    this.ball.setVisible(false)
                    this.trails.setVisible(false)
                    this.explode = this.add.image(this.ball.body.x, this.ball.body.y, "explode").setScale(0.3).setRotation(0.75).setTint(0xF33838)
                }
                if (this.stopGame <= 25) {
                    this.explode.setScale(this.stopGame / 50)
                }
                else if (this.stopGame > 25) {
                    this.explode.setScale(0.5 - (this.stopGame / 500))
                }
                if (this.stopGame % 25 == 0) {
                    this.explode.setTint(this.colors[this.stopGame % 3])
                }
                if (this.stopGame > 250) {
                    this.scene.start("restartScene")
                }
                this.explode.setRotation(this.stopGame / 5)
            }
        }
        if (this.coin1.body.x < 0 || this.coin1.body.x < this.screenHazard.x + 1680) {
            this.coin1.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(100, 600))
            this.coin1.setVelocity(Phaser.Math.Between(-200, -300) + this.wallVelocity/1.6, 0)
        }
        if (this.coin2.body.x < 0 || this.coin2.body.x < this.screenHazard.x + 1680) {
            this.coin2.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(100, 600))
            this.coin2.setVelocity(Phaser.Math.Between(-200, -300) + this.wallVelocity/1.6, 0)
        }
        if (this.coin3.body.x < 0 || this.coin3.body.x < this.screenHazard.x + 1680) {
            this.coin3.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(100, 600))
            this.coin3.setVelocity(Phaser.Math.Between(-200, -300) + this.wallVelocity/1.6, 0)
        }
        if (this.coin4.body.x < 0 || this.coin4.body.x < this.screenHazard.x + 1680) {
            this.coin4.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(100, 600))
            this.coin4.setVelocity(Phaser.Math.Between(-200, -300) + this.wallVelocity/1.6, 0)
        }
        if (this.coin5.body.x < 0 || this.coin5.body.x < this.screenHazard.x + 1680) {
            this.coin5.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(100, 600))
            this.coin5.setVelocity(Phaser.Math.Between(-200, -300) + this.wallVelocity/1.6, 0)
        }
        if (this.spike1.body.x < 0 || this.spike1.body.x < this.screenHazard.x + 1680) {
            this.spike1.setPosition(Phaser.Math.Between(2500, 4000), Phaser.Math.Between(100, 690))
            this.spike1.setVelocity(Phaser.Math.Between(-100, -200) + this.wallVelocity/1.6, 0)
        }
        if (this.spike2.body.x < 0 || this.spike2.body.x < this.screenHazard.x + 1680) {
            this.spike2.setPosition(Phaser.Math.Between(2500, 4000), Phaser.Math.Between(100, 690))
            this.spike2.setVelocity(Phaser.Math.Between(-100, -200) + this.wallVelocity/1.6, 0)
        }
        if (this.spike3.body.x < 0 || this.spike3.body.x < this.screenHazard.x + 1680) {
            this.spike3.setPosition(Phaser.Math.Between(2500, 4000), Phaser.Math.Between(100, 690))
            this.spike3.setVelocity(Phaser.Math.Between(-100, -200) + this.wallVelocity/1.6, 0)
        }
        if (this.spike4.body.x < 0 || this.spike4.body.x < this.screenHazard.x + 1680) {
            this.spike4.setPosition(Phaser.Math.Between(2500, 4000), Phaser.Math.Between(100, 690))
            this.spike4.setVelocity(Phaser.Math.Between(-100, -200) + this.wallVelocity/1.6, 0)
        }
        if (this.spike5.body.x < 0 || this.spike5.body.x < this.screenHazard.x + 1680) {
            this.spike5.setPosition(Phaser.Math.Between(2500, 4000), Phaser.Math.Between(100, 690))
            this.spike5.setVelocity(Phaser.Math.Between(-100, -200) + this.wallVelocity/1.6, 0)
        }

        
    }
}