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
        this.load.image('rocket', './assets/player5.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('background', './assets/background3.png');
        this.load.image('square', './assets/square-4.png');
        this.load.image('trail', './assets/trail3.png');
        this.load.image('menu1', './assets/menu1.png');
        this.load.image('coin', './assets/coin 1.png');
        this.load.image('projectile', './assets/projectile.png');
        this.load.image('screenHazard', './assets/screenHazard2.png');



    }

    wall() {
        
        this.wallVelocity -= 5
        this.increment += 1
        if (this.increment >= 50) {
            this.wallVelocity -= 10
        }
        if (this.increment >= 75) {
            this.wallVelocity -= 15
        }
        
        
        this.WallProj.body.setImmovable(true)
        console.log(this.increment)
        this.WallProj.body.setVelocityY(-Phaser.Math.Between(this.wallVelocity/1.5, this.wallVelocity))
        //this.Wall.body.setCollideWorldBounds(true)

    }

    create() {


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


        this.wallVelocity = -350
        this.increment = 0

        this.background = this.add.tileSprite(0, 0, 1280, 720, 'background').setOrigin(0, 0).setScale(1)
        this.screenHazard = this.physics.add.image(-2250, 0, "screenHazard").setOrigin(0,0).setScale(1.7);

        
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        mouse = this.input.mousePointer;

        // add ball
        this.ball = this.physics.add.sprite(320, 360, 'trail').setScale(0.4)
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.body.setBounce(0.5)
        //
                            this.ball.body.setImmovable(true)
        //
        this.ball.body.setDamping(true).setDrag(0.5)

        // add walls

        this.wallA = this.physics.add.sprite(0, height / 4, 'rocket').setScale(0.3).setRotation(-1.57);
        this.wallA.setCircle(this.wallA.width/2.5, 75)
        this.wallA.flipX = true;
        this.wallA.setX(640)
        this.wallA.setY(0)
        this.wallA.body.setImmovable(true)
        this.wallA.body.setCollideWorldBounds(true)
        //this.wallA.body.setVelocityX(Phaser.Math.Between(-100, -200))


        this.WallProj = this.physics.add.sprite(-100, -100, 'projectile').setScale(0.2).setTint(0x02a59b);
        this.WallProj.flipX = true;
        this.physics.add.collider(this.ball, this.WallProj, (ball, WallProj) => {
            this.scene.restart("playScene")
            this.scene.start("restartScene") 
        })


        /*this.wallB = this.physics.add.sprite(0, height / 4, 'rocket').setScale(0.3);
        this.wallB.setX(70)
        this.wallB.setY(Phaser.Math.Between(100, 300))
        this.wallB.body.setImmovable(true)
        this.wallB.body.setCollideWorldBounds(true)*/

        /*// one way
        this.wallC = this.physics.add.sprite(0, height / 4 * 3, 'square').setScale(0.1);
        this.wallC.flipX = true;
        this.wallC.setX(Phaser.Math.Between(0 + this.wallC.width / 2, width - this.wallC.width / 2))
        this.wallC.setY(Phaser.Math.Between(100, 680))
        this.wallC.body.setImmovable(true)
        this.wallC.body.setVelocityX(Phaser.Math.Between(-250, -500))

        this.walls = this.add.group([this.wallA, this.wallB, this.wallC])

        this.physics.add.collider(this.ball, this.walls)*/
        this.physics.add.collider(this.ball, this.wallA)

        this.physics.add.collider(this.ball, this.wallA, (ball, wallA) => {
            this.scene.restart("playScene")
            this.scene.start("restartScene") 
        })
        
        this.cooldown = 0
        this.cooldown2 = 0
        this.recentlyPressedX = 0
        this.recentlyPressedY = 0
        this.recentlyPressedVAR = 0


        this.playerVector = new Phaser.Math.Vector2(0, 0)

        this.colors = ["f33838", "ffa500", "79c314", "487de7", "4b369d", "70369d", "02a59b"];
        this.colors2 = [0xf33838, 0xffa500, 0x79c314, 0x487de7, 0x4b369d, 0x70369d, 0x02a59b];
        this.colors3 = [0xffffff, 0x000000, 0xffffff, 0x000000, 0xffffff, 0x000000];
        this.colorsVar = 0

        this.rotationChange = 0

        this.trail1 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "trail").setScale(0.2);
        this.trail2 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "trail").setScale(0.2);
        this.trail3 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "trail").setScale(0.2);
        this.trail4 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "trail").setScale(0.2);
        this.trail5 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "trail").setScale(0.2);
        this.trail6 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "trail").setScale(0.2);
        this.trail7 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "trail").setScale(0.2);
        this.trail8 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "trail").setScale(0.2);
        this.trail9 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "trail").setScale(0.2);
        this.trail10 = this.physics.add.sprite(this.ball.x + 10000, this.ball.y, "trail").setScale(0.2);

        this.startGame = 0
        this.startMovement = 0

        this.pauseWalls = 0
        this.wallTimer = 0

        this.checkpoint1 = 0
        this.projectileCooldown = 0

        this.score = 0
        this.time = 0
        this.text0 = this.add.text(80, 40, "Score", this.createConfig).setOrigin(0.5);
        this.text1 = this.add.text(1200, 40, "Time", this.createConfig).setOrigin(0.5);
        this.scoreText = this.add.text(80, 105, this.score, this.createConfig).setOrigin(0.5);
        this.timeText = this.add.text(1200, 105, this.score, this.createConfig).setOrigin(0.5);
        this.coin1 = this.physics.add.sprite(Phaser.Math.Between(2000, 2500), Phaser.Math.Between(250, 690), 'coin').setScale(0.25).setTint(0xffffff);
        this.coin1.setVelocity(Phaser.Math.Between(-300, -350), 0)
        this.coin2 = this.physics.add.sprite(Phaser.Math.Between(2500, 4000), Phaser.Math.Between(250, 690), 'coin').setScale(0.25).setTint(0xffffff);
        this.coin2.setVelocity(Phaser.Math.Between(-300, -350), 0)
        this.coin3 = this.physics.add.sprite(Phaser.Math.Between(4000, 5500), Phaser.Math.Between(250, 690), 'coin').setScale(0.25).setTint(0xffffff);
        this.coin3.setVelocity(Phaser.Math.Between(-300, -350), 0)
        this.coin4 = this.physics.add.sprite(Phaser.Math.Between(10000, 15000), Phaser.Math.Between(250, 690), 'coin').setScale(0.25).setTint(0xffffff);
        this.coin4.setVelocity(Phaser.Math.Between(-300, -350), 0)
        this.coin5 = this.physics.add.sprite(Phaser.Math.Between(17500, 22500), Phaser.Math.Between(250, 690), 'coin').setScale(0.25).setTint(0xffffff);
        this.coin5.setVelocity(Phaser.Math.Between(-300, -350), 0)
        this.coins = this.add.group([this.coin1, this.coin2, this.coin3, this.coin4, this.coin5])
        this.scoreValue = 1
        this.physics.add.collider(this.ball, this.coin1, (ball, coin1) => {
            this.coin1.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(250, 690))
            this.coin1.setVelocity(Phaser.Math.Between(-300, -650) - this.increment * 3, 0)
            this.score += 1
            this.screenHazard.x -= this.score / this.scoreValue; this.scorePause = 1
            this.scoreText.text = this.score
        })
        this.physics.add.collider(this.ball, this.coin2, (ball, coin2) => {
            this.coin2.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(250, 690))
            this.coin2.setVelocity(Phaser.Math.Between(-300, -650) - this.increment * 3, 0)
            this.score += 1
            this.screenHazard.x -= this.score / this.scoreValue; this.scorePause = 1 
            this.scoreText.text = this.score
        })
        this.physics.add.collider(this.ball, this.coin3, (ball, coin3) => {
            this.coin3.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(250, 690))
            this.coin3.setVelocity(Phaser.Math.Between(-300, -650) - this.increment * 3, 0)
            this.score += 1
            this.screenHazard.x -= this.score / this.scoreValue; this.scorePause = 1 
            this.scoreText.text = this.score
        })
        this.physics.add.collider(this.ball, this.coin4, (ball, coin4) => {
            this.coin4.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(250, 690))
            this.coin4.setVelocity(Phaser.Math.Between(-300, -650) - this.increment * 3, 0)
            this.score += 1
            this.screenHazard.x -= this.score / this.scoreValue; this.scorePause = 1 
            this.scoreText.text = this.score
        })
        this.physics.add.collider(this.ball, this.coin5, (ball, coin5) => {
            this.coin5.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(250, 690))
            this.coin5.setVelocity(Phaser.Math.Between(-300, -650) - this.increment * 3, 0)
            this.score += 1
            this.screenHazard.x -= this.score / this.scoreValue; this.scorePause = 1 
            this.scoreText.text = this.score
        })

        this.spike1 = this.physics.add.sprite(Phaser.Math.Between(4500, 5000), Phaser.Math.Between(250, 690), 'projectile').setScale(0.3).setTint(0xffffff).setRotation(1.57)
        this.spike1.setVelocity(Phaser.Math.Between(-300, -350), 0)
        this.spike2 = this.physics.add.sprite(Phaser.Math.Between(7500, 9000), Phaser.Math.Between(250, 690), 'projectile').setScale(0.3).setTint(0xffffff).setRotation(1.57)
        this.spike2.setVelocity(Phaser.Math.Between(-300, -350), 0)
        this.spike3 = this.physics.add.sprite(Phaser.Math.Between(10000, 11500), Phaser.Math.Between(250, 690), 'projectile').setScale(0.3).setTint(0xffffff).setRotation(1.57)
        this.spike3.setVelocity(Phaser.Math.Between(-300, -350), 0)
        this.spike4 = this.physics.add.sprite(Phaser.Math.Between(16500, 20000), Phaser.Math.Between(250, 690), 'projectile').setScale(0.3).setTint(0xffffff).setRotation(1.57)
        this.spike4.setVelocity(Phaser.Math.Between(-300, -350), 0)
        this.spike5 = this.physics.add.sprite(Phaser.Math.Between(20000, 21500), Phaser.Math.Between(250, 690), 'projectile').setScale(0.3).setTint(0xffffff).setRotation(1.57)
        this.spike5.setVelocity(Phaser.Math.Between(-300, -350), 0)
        this.spikes = this.add.group([this.spike1, this.spike2, this.spike3, this.spike4, this.spike5])

        this.physics.add.collider(this.ball, this.spikes, (ball, spikes) => {
            this.scene.restart("playScene")
            this.scene.start("restartScene")
        })
        this.physics.add.collider(this.ball, this.screenHazard, (ball, screenHazard) => {
            this.scene.restart("playScene")
            this.scene.start("restartScene")
        })

        this.menuText = this.add.sprite(640, 360, "menu1")

        this.scorePause = 0



    }

    update(time, delta) {
        /*if (time > 1000 && this.checkpoint1 == 0) {
            this.checkpoint1 = 1
            this.wall()
        }*/
        console.log(this.screenHazard.x)
        if (this.scorePause == 1 && this.screenHazard.x > -1700) {
            this.screenHazard.x = -1700 + this.score
        }
        if (this.scorePause == 0 || this.screenHazard.x > -1650) {
            this.screenHazard.x += 0.15 + (this.startGame / 1000)
        }
        if (this.score >= 50) {
            this.screenHazard.x += 0.1
            this.scoreValue = 1.1
        }
        if (this.time >= 75) {
            this.screenHazard.x += 0.05
        }
        if (this.score >= 75) {
            this.screenHazard.x += 0.2
            this.scoreValue = 1.25
        }
        if (this.time >= 100) {
            this.screenHazard.x += 0.1
        }
        if (this.score >= 100) {
            this.screenHazard.x += 0.1
            this.scoreValue = 2.5
        }
        if (!game.input.mousePointer.x == 0 && !game.input.mousePointer.y == 0) {
            this.startMovement = 1
            this.menuText.destroy(true)
        }
        else if (time % 1000 < 10){
            this.menuText.tint = (this.colors2[this.colorsVar / 2])
        }
        /*if (this.ball.body.x >= 1280 || this.ball.body.y >= 720 || this.ball.body.x <= 0 || this.ball.body.y <= 0) {
            this.scene.restart("playScene")
            this.scene.start("restartScene")
        }*/
        this.background.tilePositionX += 3
        this.wallTimer += delta
        if (this.wallTimer > 1000) {
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
            if (this.colorsVar < 6) {
                this.colorsVar += 1
            }
            else {
                this.colorsVar = 0
            }
            this.background.tint = (this.colors2[6 - this.colorsVar])
            this.screenHazard.tint = (this.colors3[6 - this.colorsVar])
            this.ball.tint = (this.colors2[this.colorsVar])
            this.wallA.tint = (this.colors2[this.colorsVar])
            
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
   
        this.cooldown += 1
        this.cooldown2 += delta
        if (this.recentlyPressedX != 0) {
            this.recentlyPressedX -= 1
        }
        if (this.recentlyPressedY != 0) {
            this.recentlyPressedY -= 1
        }
        
        if (game.input.mousePointer.x > this.ball.x && this.recentlyPressedX == 0) {
                this.recentlyPressedX = this.recentlyPressedVAR
                this.playerVector.x = 1
        }
        if (game.input.mousePointer.x < this.ball.x && this.recentlyPressedX == 0) {
                this.recentlyPressedX = this.recentlyPressedVAR
                this.playerVector.x = -1
        }
        if (game.input.mousePointer.y < this.ball.y && this.recentlyPressedY == 0) {
                this.recentlyPressedY = this.recentlyPressedVAR
                this.playerVector.y = -1
        }
        if (game.input.mousePointer.y > this.ball.y && this.recentlyPressedY == 0) {
                this.recentlyPressedY = this.recentlyPressedVAR
                this.playerVector.y = 1
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
        if (Phaser.Math.Distance.Between(game.input.mousePointer.x, game.input.mousePointer.y, this.ball.body.x, this.ball.body.y) < 25) {
            this.playerVector.x = 0
            this.playerVector.y = 0
            this.ball.body.setVelocity(0 * this.playerVector.x, 0 * this.playerVector.y)
        }   
        if (this.cooldown2 > 100 && this.cooldown2 < 109 && this.score >= 10) {
            this.trail1.setPosition(this.ball.x, this.ball.y)
            this.trail1.setScale(0.24)
        }
        if (this.cooldown2 > 200 && this.cooldown2 < 209 && this.score >= 10) {
            this.trail2.setPosition(this.ball.x, this.ball.y)
            this.trail2.setScale(0.22)
        }
        if (this.cooldown2 > 300 && this.cooldown2 < 309 && this.score >= 10) {
            this.trail3.setPosition(this.ball.x, this.ball.y)
            this.trail3.setScale(0.20)
        }
        if (this.cooldown2 > 400 && this.cooldown2 < 409 && this.score >= 10) {
            this.trail4.setPosition(this.ball.x, this.ball.y)
            this.trail4.setScale(0.18)
        }
        if (this.cooldown2 > 500 && this.cooldown2 < 509 && this.score >= 25) {
            this.trail5.setPosition(this.ball.x, this.ball.y)
            this.trail5.setScale(0.16)
        }
        if (this.cooldown2 > 600 && this.cooldown2 < 609 && this.score >= 25) {
            this.trail6.setPosition(this.ball.x, this.ball.y)
            this.trail6.setScale(0.14)
        }
        if (this.cooldown2 > 700 && this.cooldown2 < 709 && this.score >= 25) {
            this.trail7.setPosition(this.ball.x, this.ball.y)
            this.trail7.setScale(0.12)
        }
        if (this.cooldown2 > 800 && this.cooldown2 < 809 && this.score >= 50) {
            this.trail8.setPosition(this.ball.x, this.ball.y)
            this.trail8.setScale(0.10)
        }
        if (this.cooldown2 > 900 && this.cooldown2 < 909 && this.score >= 50) {
            this.trail9.setPosition(this.ball.x, this.ball.y)
            this.trail9.setScale(0.08)
        }
        if (this.cooldown2 > 1000) {
            if (this.score >= 50) {
                this.trail10.setPosition(this.ball.x, this.ball.y)
                this.trail10.setScale(0.06)
            }
            this.cooldown2 = 0
        }
        
        if (this.pauseWalls == 0 && this.startGame > 2) {
            if (this.ball.x - this.wallA.x > 10) {
                this.projectileCooldown = 0
                this.wallA.body.setVelocity(250 * 1, 0)
            }
            else if (this.wallA.x - this.ball.x > 10) {
                this.projectileCooldown = 0
                this.wallA.body.setVelocity(250 * -1, 0)
            }
        }
        else if (this.projectileCooldown == 0 && this.startGame > 0){
            this.WallProj.setX(this.wallA.x)
            this.WallProj.setY(this.wallA.y)
            this.wall()
            this.projectileCooldown = 1
            // this.wallA.body.setVelocity(-600, 0)
        }
        if (this.wallA.body.x < 50) {
            this.wallA.body.setVelocityY(0)
            //this.wallA.setX(game.config.width - 30)
        }

        if (this.coin1.body.x < 0) {
            this.coin1.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(100, 600))
            this.coin1.setVelocity(Phaser.Math.Between(-200, -600), 0)
        }
        if (this.coin2.body.x < 0) {
            this.coin2.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(100, 600))
            this.coin2.setVelocity(Phaser.Math.Between(-200, -600), 0)
        }
        if (this.coin3.body.x < 0) {
            this.coin3.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(100, 600))
            this.coin3.setVelocity(Phaser.Math.Between(-200, -600), 0)
        }
        if (this.coin4.body.x < 0) {
            this.coin4.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(100, 600))
            this.coin4.setVelocity(Phaser.Math.Between(-200, -600), 0)
        }
        if (this.coin5.body.x < 0) {
            this.coin5.setPosition(Phaser.Math.Between(1500, 2500), Phaser.Math.Between(100, 600))
            this.coin5.setVelocity(Phaser.Math.Between(-200, -600), 0)
        }
        if (this.spike1.body.x < 0) {
            this.spike1.setPosition(Phaser.Math.Between(2500, 4000), Phaser.Math.Between(100, 690))
            this.spike1.setVelocity(Phaser.Math.Between(-100, -250) + this.wallVelocity/1.3, 0)
        }
        if (this.spike2.body.x < 0) {
            this.spike2.setPosition(Phaser.Math.Between(2500, 4000), Phaser.Math.Between(100, 690))
            this.spike2.setVelocity(Phaser.Math.Between(-100, -250) + this.wallVelocity/1.3, 0)
        }
        if (this.spike3.body.x < 0) {
            this.spike3.setPosition(Phaser.Math.Between(2500, 4000), Phaser.Math.Between(100, 690))
            this.spike3.setVelocity(Phaser.Math.Between(-100, -250) + this.wallVelocity/1.3, 0)
        }
        if (this.spike4.body.x < 0) {
            this.spike4.setPosition(Phaser.Math.Between(2500, 4000), Phaser.Math.Between(100, 690))
            this.spike4.setVelocity(Phaser.Math.Between(-100, -250) + this.wallVelocity/1.3, 0)
        }
        if (this.spike5.body.x < 0) {
            this.spike5.setPosition(Phaser.Math.Between(2500, 4000), Phaser.Math.Between(100, 690))
            this.spike5.setVelocity(Phaser.Math.Between(-100, -250) + this.wallVelocity/1.3, 0)
        }

        
    }
}