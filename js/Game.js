var SpaceHipster = SpaceHipster || {};

//title screen
SpaceHipster.Game = function(game){};

SpaceHipster.Game.prototype = {
  create: function() {
  	//게임의 차원 을 설정한다.
    //setbounds는 world의 크기를 확장시키게 한다.
    //그래서 움직이면 카메라와 물리의 경계와 일치시키게한다.
    this.game.world.setBounds(0, 0, 1920, 1920);

    //배경을 만든다.
    this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');

    //플레이어를 만들고 설정한다
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
    this.player.scale.setTo(2);
    //플레이어 이미지 파일은 어려가지 이미로된 시트이인데
    //animations으로 연속적인 이미지를 표현 할수있다.
    this.player.animations.add('fly', [0, 1, 2, 3], 50, true);
    this.player.animations.play('fly');

    //스코어를 0으로 설정한다.
    this.playerScore = 0;

    //플레이어를 물리시스템에 추가한다
    this.game.physics.arcade.enable(this.player);
    this.playerSpeed = 120;
    //맵밖으로 나가지 않게 world경계에서 부딫히게한다.
    this.player.body.collideWorldBounds = true;

    //카메라가 플레이어를 따라오게한다.
    this.game.camera.follow(this.player);

    //게임의 요소들을 생성하는 함수이다.
    this.generateCollectables();
    this.generateAsteriods();

    //show score
    this.showLabels();

    //sounds
    this.explosionSound = this.game.add.audio('explosion');
    console.log(this.explosionSound);
    this.collectSound = this.game.add.audio('collect');
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {

      //마우스를 클릭하면 플레이어를 그쪽으로 옮긴다.
      this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
    }

    //collision between player and asteroids 출돌했을때 hitAsteroid를 호출한다
    this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);

    //overlapping between player and collectables
    this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
  },
  generateCollectables: function() {
    this.collectables = this.game.add.group();

    //그룹이 물리시스템에 영향을 받도록 추가시킨다.
    this.collectables.enableBody = true;
    this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

    //랜덤적으로 수를 생성한뒤 그 수만큼 먹을아이템을 생성한다.
    var numCollectables = this.game.rnd.integerInRange(100, 150)
    var collectable;

    for (var i = 0; i < numCollectables; i++) {
      //sprite 를추가한다.
      collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
      collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
      collectable.animations.play('fly');
    }

  },
  generateAsteriods: function() {
    //소행성 그룹을 생성한다
    this.asteroids = this.game.add.group();

    //물리시스템을 이용하게 한
    this.asteroids.enableBody = true;

    //랜덤한 수로 소행성을 생성한다
    var numAsteroids = this.game.rnd.integerInRange(150, 200)
    var asteriod;

    for (var i = 0; i < numAsteroids; i++) {
      //add sprite
      asteriod = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
      asteriod.scale.setTo(this.game.rnd.integerInRange(10, 40)/10);

      //소행성들의 속도를 랜덤하게 설정
      asteriod.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
      asteriod.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
      //부딫혔을때 밀려나지 않게한다
      asteriod.body.immovable = true;
      //맵밖으로 나가지 않게한다
      asteriod.body.collideWorldBounds = true;
      //맵끝에 부딫혔을때 다시 반대편으로 나가게한다
      asteriod.body.bounce.setTo(0.8,0.8);
    }
  },
  hitAsteroid: function(player, asteroid) {
    //부딫혔을때 터지는 소리
    this.explosionSound.play();

    //make the player explode
    var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
    emitter.makeParticles('playerParticle');
    //터져나가는 파티클의 속도를 지정한다.
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    //파티클들이 떨어지는것을 설정
    emitter.gravity = 1000;
    //emiiter를 실행한다.
    emitter.start(true, 1000, null, 100);
    //플레이어 객체를 삭제한다.
    this.player.kill();

    this.game.time.events.add(800, this.gameOver, this);
  },
  gameOver: function() {
    //pass it the score as a parameter
    this.game.state.start('MainMenu', true, false, this.playerScore);
  },
  collect: function(player, collectable) {
    //소리지정
    this.collectSound.play();

    //먹었을때 점수를 올리고, 점수판을 업데이트한다.
    this.playerScore++;
    this.scoreLabel.text = this.playerScore;

    //sprite를 삭제한다
    collectable.destroy();
  },
  showLabels: function() {
    //점수판
    var text = "0";
    var style = { font: "20px Arial", fill: "#fff", align: "center" };
    this.scoreLabel = this.game.add.text(this.game.width-50, this.game.height - 50, text, style);
    //카메라가 움직일떄 따라간다.
    this.scoreLabel.fixedToCamera = true;
  }
};

/*


-audio
-asteriod bounch
*/
