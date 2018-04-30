var SpaceHipster = SpaceHipster || {};

//시작할떄의 화면을 보여준다.
SpaceHipster.MainMenu = function(){};

SpaceHipster.MainMenu.prototype = {
  init: function(score) {
    var score = score || 0;
    this.highestScore = this.highestScore || 0;

    this.highestScore = Math.max(score, this.highestScore);
   },
  create: function() {
  	//배경을 spans 타일로 반복시킨다.
    //tilesprite 매서드는 특정 이미지를 여러번 반복시킨다,그리고 autoscroll이라는 메서드들통해서
    //무한스크롤 효과를 만들어 낼수있다.
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

    //give it speed in x
    this.background.autoScroll(-20, 50);

    //게임의 점수,시작 텍스트를 추가시킨다.
    var text = "Tap to begin";
    var style = { font: "30px Arial", fill: "#fff", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);

    //highest score
    text = "Highest score: "+this.highestScore;
    style = { font: "15px Arial", fill: "#fff", align: "center" };

    var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
    h.anchor.set(0.5);
  },
  update: function() {
    //아무런 장소에 클릭하게되면
    //game state를 실행한다.
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};
