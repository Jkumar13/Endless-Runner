class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.image('rocket', './assets/player5.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('background', './assets/background3.png');
        this.load.image('square', './assets/square-4.png');
        this.load.image('trail', './assets/trail3.png');

    }

    wall() {
        this.Wall = this.physics.add.sprite(0, height / 4, 'square').setScale(0.5);
        this.Wall.flipX = true;
        this.Wall.setX(1280)
        this.Wall.setY(Phaser.Math.Between(100, 680))
        this.Wall.body.setImmovable(true)
        this.Wall.body.setVelocityX(Phaser.Math.Between(-100, -200))
        this.physics.add.collider(this.ball, this.Wall);
        console.log("ok")
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'background').setOrigin(0, 0).setScale(1)
        
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        mouse = this.input.mousePointer;

        // add ball
        this.ball = this.physics.add.sprite(height - height/1.1, width / 4, 'trail').setScale(0.35)
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)

        // add walls
        this.wallA = this.physics.add.sprite(0, height / 4, 'square').setScale(0.1);
        this.wallA.flipX = true;
        this.wallA.setX(game.config.width - 30)
        this.wallA.setY(Phaser.Math.Between(100, 680))
        this.wallA.body.setImmovable(true)
        this.wallA.body.setCollideWorldBounds(true)
        //this.wallA.body.setVelocityX(Phaser.Math.Between(-100, -200))

        /*this.wallB = this.physics.add.sprite(0, height / 2, 'square').setScale(0.1);
        this.wallB.flipX = true;
        this.wallB.setX(Phaser.Math.Between(0 + this.wallB.width / 2, width - this.wallB.width/2))
        this.wallB.setY(Phaser.Math.Between(100, 680))
        this.wallB.body.setImmovable(true)
        this.wallB.body.setVelocityX(Phaser.Math.Between(-200, -100))

        // one way
        this.wallC = this.physics.add.sprite(0, height / 4 * 3, 'square').setScale(0.1);
        this.wallC.flipX = true;
        this.wallC.setX(Phaser.Math.Between(0 + this.wallC.width / 2, width - this.wallC.width / 2))
        this.wallC.setY(Phaser.Math.Between(100, 680))
        this.wallC.body.setImmovable(true)
        this.wallC.body.setVelocityX(Phaser.Math.Between(-250, -500))

        this.walls = this.add.group([this.wallA, this.wallB, this.wallC])

        this.physics.add.collider(this.ball, this.walls)*/
        this.physics.add.collider(this.ball, this.wallA)
        
        this.cooldown = 0
        this.cooldown2 = 0
        this.recentlyPressedX = 0
        this.recentlyPressedY = 0
        this.recentlyPressedVAR = 30

        /*this.goRight = 0
        this.goLeft = 0
        this.goDown = 0
        this.goUp = 0*/

        this.playerVector = new Phaser.Math.Vector2(0, 0)

        this.colors = ["f33838", "ffa500", "79c314", "487de7", "4b369d", "70369d", "02a59b"];
        this.colors2 = [0xf33838, 0xffa500, 0x79c314, 0x487de7, 0x4b369d, 0x70369d, 0x02a59b];
        this.colorsVar = 0

        this.rotationChange = 0

        this.trail1 = this.physics.add.sprite(this.ball.x, this.ball.y, "trail").setScale(0.2);
        this.trail2 = this.physics.add.sprite(this.ball.x, this.ball.y, "trail").setScale(0.2);
        this.trail3 = this.physics.add.sprite(this.ball.x, this.ball.y, "trail").setScale(0.2);
        this.trail4 = this.physics.add.sprite(this.ball.x, this.ball.y, "trail").setScale(0.2);
        this.trail5 = this.physics.add.sprite(this.ball.x, this.ball.y, "trail").setScale(0.2);
        this.trail6 = this.physics.add.sprite(this.ball.x, this.ball.y, "trail").setScale(0.2);
        this.trail7 = this.physics.add.sprite(this.ball.x, this.ball.y, "trail").setScale(0.2);
        this.trail8 = this.physics.add.sprite(this.ball.x, this.ball.y, "trail").setScale(0.2);
        this.trail9 = this.physics.add.sprite(this.ball.x, this.ball.y, "trail").setScale(0.2);
        this.trail10 = this.physics.add.sprite(this.ball.x, this.ball.y, "trail").setScale(0.2);


    }

    update(time, delta) {
        /*if (this.wallA.x < 0) {
            this.wallA.setX(1280)
        }
        if (this.wallB.x < 0) {
            this.wallB.setX(1280)
        }
        if (this.wallC.x < 0) {
            this.wallC.setX(1280)
        }
        this.physics.add.collider(this.ball, this.walls, (ball, walls) => {
            this.ball.destroy()  
        })*/
        this.background.tilePositionX -= 1
        if (time % 1000 < 10) {
            if (this.colorsVar < 6) {
                this.colorsVar += 1
            }
            else {
                this.colorsVar = 0
            }
            //this.cameras.main.setBackgroundColor(this.colors[this.colorsVar]);
            this.background.tint = (this.colors2[6 - this.colorsVar])
            this.ball.tint = (this.colors2[this.colorsVar])
            
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
        /*if (time % 5000 < 10) {
            this.wall();
        }*/

        /*if (time > 10100) {
            this.recentlyPressedVAR = 30
        }*/
        
        this.cooldown += 1
        this.cooldown2 += delta
        if (this.recentlyPressedX != 0) {
            this.recentlyPressedX -= 1
        }
        if (this.recentlyPressedY != 0) {
            this.recentlyPressedY -= 1
        }
        /*
        if (game.input.mousePointer.y < this.ball.y) {
            this.goDown = 0
            this.goUp = 1
        }
        if (game.input.mousePointer.y > this.ball.y) {
            this.goDown = 1
            this.goUp = 0
        }
        if (game.input.mousePointer.x < this.ball.x) {
            this.goRight = 0
            this.goLeft = 1
        }
        if (game.input.mousePointer.x > this.ball.x) {
            this.goRight = 1
            this.goLeft = 0
        }
        */
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



        /*this.trail = this.add.sprite(this.ball.x, this.ball.y, "trail").setScale(0.1);
        if ((this.playerVector.x == 1 && this.playerVector.y == 1) || (this.playerVector.x == -1 && this.playerVector.y == -1)) {
            this.rotationChange = 1
        }
        else if ((this.playerVector.x == 1 && this.playerVector.y == -1) || (this.playerVector.x == -1 && this.playerVector.y == 1)) {
            this.rotationChange = 0
        }
        if (this.rotationChange == 1) {
            this.trail.setRotation(1.57)
        }
        else {
            this.trail.setRotation(0)
        }*/

        /*console.log((delta) % 1000)
        if ((time % delta) < 10) { 
            console.log("fawfewDEIOAWJFIEWOFJEWIFJAIWEOJFOIAEWf")
        }*/
        if (this.cooldown >= 10) {
            this.cooldown = 0;
            this.playerVector.normalize()
            this.ball.body.setVelocity(1000 * this.playerVector.x, 1000 * this.playerVector.y)
            this.playerVector.x = 0
            this.playerVector.y = 0
        }
        if (this.cooldown2 > 100 && this.cooldown2 < 109) {
            this.trail1.setPosition(this.ball.x, this.ball.y)
            this.trail1.setScale(0.18)
        }
        if (this.cooldown2 > 200 && this.cooldown2 < 209) {
            this.trail2.setPosition(this.ball.x, this.ball.y)
            this.trail2.setScale(0.16)
        }
        if (this.cooldown2 > 300 && this.cooldown2 < 309) {
            this.trail3.setPosition(this.ball.x, this.ball.y)
            this.trail3.setScale(0.14)
        }
        if (this.cooldown2 > 400 && this.cooldown2 < 409) {
            this.trail4.setPosition(this.ball.x, this.ball.y)
            this.trail4.setScale(0.12)
        }
        if (this.cooldown2 > 500 && this.cooldown2 < 509) {
            this.trail5.setPosition(this.ball.x, this.ball.y)
            this.trail5.setScale(0.10)
        }
        if (this.cooldown2 > 600 && this.cooldown2 < 609) {
            this.trail6.setPosition(this.ball.x, this.ball.y)
            this.trail6.setScale(0.09)
        }
        if (this.cooldown2 > 700 && this.cooldown2 < 709) {
            this.trail7.setPosition(this.ball.x, this.ball.y)
            this.trail7.setScale(0.08)
        }
        if (this.cooldown2 > 800 && this.cooldown2 < 809) {
            this.trail8.setPosition(this.ball.x, this.ball.y)
            this.trail8.setScale(0.07)
        }
        if (this.cooldown2 > 900 && this.cooldown2 < 909) {
            this.trail9.setPosition(this.ball.x, this.ball.y)
            this.trail9.setScale(0.06)
        }
        if (this.cooldown2 > 1000 && this.cooldown2 < 1009) {
            this.trail10.setPosition(this.ball.x, this.ball.y)
            this.trail10.setScale(0.05)
            this.cooldown2 = 0
        }
        

        
        
        if (this.ball.y - this.wallA.y > 100) {
            this.wallA.body.setVelocity(0, 500 * 1)
        }
        else if (this.wallA.y - this.ball.y > 100) {
            this.wallA.body.setVelocity(0, 500 * -1)
        }

    }
}