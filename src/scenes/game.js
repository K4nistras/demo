import Phaser from 'phaser';

import sky from '../assets/sky.png';
import ground from '../assets/platform.png';
import dude from '../assets/dude.png';


class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  

  preload() {
    this.load.image('sky', sky);
    this.load.image('ground', ground);
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
  }

  create() {

    this.maxjumps = 2;
    this.jumps = 0;
    //defining the keys
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    // let key1 = new Key(Game, A);
    // let key2 = new Key(this, D);
    // let key3 = new Key(this, W);
    
    
    this.input.keyboard.on('keydown_W', function(event){
      this.jumps += 1;
      if (this.jumps <= this.maxjumps) {
        this.player.setVelocityY(-350);
      }
      
    },this);
    

    // add Sky background sprit
    this.add.image(400, 300, 'sky');

    // Create ground platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(400, 568, 'ground')
      .setScale(2)
      .refreshBody();
    this.platforms.create(400, 400, 'ground');
    this.platforms.create(800, 20, 'ground');
    this.platforms.create(750, 220, 'ground');

    // Create Player
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.body.setGravityY(300);
    this.player.setBounce(1);
    this.player.setCollideWorldBounds(true);

    // Create player animation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // set collides between Player and grounds
    this.physics.add.collider(this.player, this.platforms);
  }


  
  update() {
    
    console.log(this.jumps,+' '+this.key_W.processKeyUp);


    var onTheGround = this.player.body.touching.down;

    
    if (onTheGround) {
        this.jumps = 0;

        
    }

      // Create movement controller
    this.player.body.setGravityY(300);

    if (this.key_A.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.key_B.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true); 
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.key_W.downDuration && this.jumps < this.maxjumps) {
      this.player.setVelocityY(-250); 
     
    } 
    
    if (this.key_S.isDown) {
      this.player.body.setGravityY(1800);
    } 
  }
}

export default Game;
