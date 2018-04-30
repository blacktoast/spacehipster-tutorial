var SpaceHipster = SpaceHipster || {};

SpaceHipster.Boot = function(game){};

//boot.js는 preload자산을 로드 시키는 역할을한다
SpaceHipster.Boot.prototype = {
  preload: function() {
  	//preload에서 쓸 asset들을 로드한다.
    //load.image메서드는 SpaceHipster.game에 있는 메서드가 아닌가 생각이 드는데
    //이렇게 써도 잘 사용이 된다. this.game으로 해도 사용이돤다.
    //어떻게 this가 바인딩이 된걸까?
    this.game.load.image('logo', 'assets/images/logo.png');
    this.game.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },
  create: function() {
  	//배경색을 지정한다
    this.stage.backgroundColor = '#130404';

    //scaling 옵션을 지정한다.
	this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	this.scale.minWidth = 240;
	this.scale.minHeight = 170;
	this.scale.maxWidth = 2880;
	this.scale.maxHeight = 1920;

	//게임의 수평을 잡은변수?
	this.scale.pageAlignHorizontally = true;

	//물리시스템을 적용한다.
	this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.state.start('Preload');
  }
};
//여기서  this 어다에 바인드가 되어있는걸까?
