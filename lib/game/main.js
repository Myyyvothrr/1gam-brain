ig.module
( 
	'game.main' 
)
.requires
(
	'impact.game',
//	'impact.debug.debug',
	'game.levels.test'
)
.defines(function()
{
	OGAM1 = ig.Game.extend(
	{		
		gravity: 160,
		sortBy: ig.Game.SORT.Z_INDEX,
		autoSort: true,

		init: function()
		{
			ig.input.bind(ig.KEY.A, 'left');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');

			ig.input.bind(ig.KEY.D, 'right');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

			ig.input.bind(ig.KEY.S, 'down');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');

			ig.input.bind(ig.KEY.W, 'jump');
			ig.input.bind(ig.KEY.UP_ARROW, 'jump');
			ig.input.bind(ig.KEY.SPACE, 'jump');
			ig.input.bind(ig.KEY.ENTER, 'jump');

			ig.input.bind(ig.KEY.SHIFT, 'run');

			this.loadLevel(LevelTest);
		},
	});

	FinishedState = ig.Game.extend(
	{
		font: new ig.Font('media/04b03.font.png'),

		init: function()
		{
			ig.input.bind(ig.KEY.SPACE, 'jump');
			ig.input.bind(ig.KEY.ENTER, 'jump');
		},
			
		draw: function()
		{
			this.parent();
			
			this.font.draw('Beta Version!\nOne Game A Month\nJanuary Entry \n\nThanks for playing!\n\nonegameamonth.com/\nMyyyvothrr', ig.system.width*0.5, 2, ig.Font.ALIGN.CENTER);
		},

		update: function()
		{
			if (ig.input.pressed('jump'))
				ig.system.setGame(OGAM1);
		},
	});

	ig.main('#canvas', OGAM1, 60, 100, 75, 8);
});