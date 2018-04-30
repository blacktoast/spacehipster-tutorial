//게임의 이미지,오디오등을 로드 시키고, 로드되는동안 사용자에게 로깅되고있다는것을 표시해준다.
//boot는 프리로더를 로드하고,프리로더는 game의 자산들을 로드 시킨다 속도를 좀더 빠르게 하기 위해서라고
//하지만 이해가 가지는 않는다.

var SpaceHipster = SpaceHipster || {};

//loading the game assets
SpaceHipster.Preload = function(){};

SpaceHipster.Preload.prototype = {
  preload: function() {
  	//로딩 스크린을 표시한다.
    //flappybird를 만들때 sprite추가들은 careate부분에다 했는데 이번에는 preload부분에다 헀다.

    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    //해당 spirte를 로드 막대로 사용할수있게한다.
    this.load.setPreloadSprite(this.preloadBar);
  	//load game assets
  	this.load.image('space', 'assets/images/space.png');
  	this.load.image('rock', 'assets/images/rock.png');
    this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
    this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
  	this.load.image('playerParticle', 'assets/images/player-particle.png');
    this.load.audio('collect', 'assets/audio/collect.ogg');
    this.load.audio('explosion', 'assets/audio/explosion.ogg');
  },
  create: function() {


  	this.state.start('MainMenu');
  }
};
