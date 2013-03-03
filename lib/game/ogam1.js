ig.module
( 
	'game.ogam1' 
)
.requires
(
	'impact.game',
	'game.menu-state'
)
.defines(function()
{
	OGAM1 = ig.Game.extend(
	{
		ogam_img: new ig.Image('media/ogam.png'),

		default_music: new ig.Sound('media/music3.ogg'),
		music4: new ig.Sound('media/music4.ogg'),
		music5: new ig.Sound('media/music5.ogg'),

		timer: null,

		init: function()
		{
			ig.music.add(this.default_music, 'menu');
			ig.music.add(this.music4, 'game2');
			ig.music.add(this.music5, 'game1');

			ig.music.loop = true;

			ig.music.play('menu');

			ig.input.bind(ig.KEY.A, 'left');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');

			ig.input.bind(ig.KEY.D, 'right');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

			ig.input.bind(ig.KEY.S, 'down');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');

			ig.input.bind(ig.KEY.W, 'jump');
			ig.input.bind(ig.KEY.UP_ARROW, 'jump');

			ig.input.bind(ig.KEY.SPACE, 'shoot');
			ig.input.bind(ig.KEY.ENTER, 'shoot');

			ig.input.bind(ig.KEY.SHIFT, 'run');

			ig.input.bind(ig.KEY.ESC, 'skills');

			ig.input.bind(ig.KEY.M, 'mute');

			ig.input.bind(ig.KEY._1, 'weapon1');
			ig.input.bind(ig.KEY._2, 'weapon2');

			this.timer = new ig.Timer(3);
		},

		update: function()
		{
			this.parent();
		
			if (this.timer.delta() > 0)
				ig.system.setGame(MenuState);
		},

		draw: function()
		{
			this.parent();
			this.ogam_img.draw(0, 0);
		}
	});
});