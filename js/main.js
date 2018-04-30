//다른 라이브럴리와 충돌하지 않을수있게 고유 namesapce를 만든다
//객체가 존재한다면 사용하고, 없다면 새로운 객체를 생성하게된다
var SpaceHipster = SpaceHipster || {};

//윈도우 사이즈로 생성한다, phaser.auto의 기능은 canvas요소나 webgl를 사용할수있으면 쓰게하는
//옵션이라고 한다.
//webGl은 브라우저에서 아무런 플러그인없이 그래픽을 그리게 해주는것이다.
//즉 속도를 높여주는 역활을 하는것같다.
SpaceHipster.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

SpaceHipster.game.state.add('Boot', SpaceHipster.Boot);
SpaceHipster.game.state.add('Preload', SpaceHipster.Preload);
SpaceHipster.game.state.add('MainMenu', SpaceHipster.MainMenu);
SpaceHipster.game.state.add('Game', SpaceHipster.Game);

SpaceHipster.game.state.start('Boot');
