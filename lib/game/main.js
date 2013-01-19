ig.module
( 
	'game.main' 
)
.requires
(
	'impact.game',
//	'impact.debug.debug',
	'game.levels.test2'
)
.defines(function()
{
	VERSION = 'One Game A Month 1: Where The Fuck Is My Brain? v0.1.5';

	OGAM1 = ig.Game.extend(
	{
		title_img: new ig.Image('media/title_ingame.png'),
		font: new ig.Font('media/04b03.font.png'),

		cursor: 0,

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

			ig.input.bind(ig.KEY.SPACE, 'shoot');
			ig.input.bind(ig.KEY.ENTER, 'shoot');

			ig.input.bind(ig.KEY.SHIFT, 'run');

			ig.input.bind(ig.KEY.ESC, 'skills');
		},

		update: function()
		{
			if (ig.input.pressed('shoot'))
			{
				switch (this.cursor)
				{
					case 0: ig.system.setGame(GameState); break;
					case 1: ig.system.setGame(HelpState); break;
					case 2: ig.system.setGame(CreditsState); break;
				}
			}
			
			if (ig.input.pressed('down'))
				this.cursor = (this.cursor+1) % 3;
			else if (ig.input.pressed('jump'))
			{
				--this.cursor;
				if (this.cursor < 0)
					this.cursor = 2;
			}
		},

		draw: function()
		{
			this.parent();
			this.title_img.draw(0, 0);

			this.font.draw((this.cursor == 0) ? '-> Start' : 'Start', 98, 52, ig.Font.ALIGN.RIGHT);
			this.font.draw((this.cursor == 1) ? '-> Help' : 'Help', 98, 60, ig.Font.ALIGN.RIGHT);
			this.font.draw((this.cursor == 2) ? '-> Credits' : 'Credits', 98, 68, ig.Font.ALIGN.RIGHT);
		}
	});

	GameState = ig.Game.extend(
	{

		gravity: 160,
		sortBy: ig.Game.SORT.Z_INDEX,
		autoSort: true,

		skills_img: new ig.Image('media/skills.png'),
		show_skills: false,

		font: new ig.Font('media/04b03.font.png'),

		player: null,

		init: function()
		{
			this.loadLevel(LevelTest2);
		},

		draw: function()
		{
			if (this.show_skills)
			{
				this.skills_img.draw(0, 0);
		
				this.font.draw((this.player.learned >= this.player.LEARNED.WALKING ? "Sure" : "Hmm?!"), 14, 12, ig.Font.ALIGN.LEFT);
				this.font.draw((this.player.learned >= this.player.LEARNED.JUMPING ? "Done." : "Soon..."), 14, 39, ig.Font.ALIGN.LEFT);
				this.font.draw((this.player.learned >= this.player.LEARNED.RUNNING ? "Ok..." : "Why?"), 14, 64, ig.Font.ALIGN.LEFT);
				this.font.draw((this.player.learned >= this.player.LEARNED.SLIDING ? "Nice." : "Later..."), 62, 12, ig.Font.ALIGN.LEFT);
				this.font.draw((this.player.learned >= this.player.LEARNED.SHOOTING ? "Yeah!" : "???"), 62, 39, ig.Font.ALIGN.LEFT);

			}
			else
				this.parent();
		},

		update: function()
		{
			if (ig.input.pressed('skills'))
				this.show_skills = !this.show_skills;

			if (!this.show_skills)
				this.parent();
		},
	});

	InfoState = ig.Game.extend(
	{
		font: new ig.Font('media/04b03.font.png'),

		update: function()
		{
			if (ig.input.pressed('shoot'))
				ig.system.setGame(OGAM1);
		},
	});

	FinishedState = InfoState.extend(
	{			
		draw: function()
		{
			this.parent();
			
			this.font.draw('Thank you for playing\nthis Beta!\n\nOne Game A Month\nJanuary Entry\n\nonegameamonth.com/\nMyyyvothrr', ig.system.width*0.5, 2, ig.Font.ALIGN.CENTER);
		},
	});

	HelpState = InfoState.extend(
	{			
		draw: function()
		{
			this.parent();
			
			this.font.draw('Collect your missing\nbrain parts to learn\nnew skills: Escape\nWalk: W+D/Left+Right\nJump: W/Up\nRun: Hold Shift\nSlide: Run+S/Down\nShoot: Space', ig.system.width*0.5, 2, ig.Font.ALIGN.CENTER);
		},
	});

	CreditsState = InfoState.extend(
	{			
		draw: function()
		{
			this.parent();
			
			this.font.draw('Game createt by\nDaniel Baumartz\n\nOne Game A Month\nJanuary Entry\n\nonegameamonth.com/\nMyyyvothrr', ig.system.width*0.5, 2, ig.Font.ALIGN.CENTER);
		},
	});

	ig.log(VERSION);

	ig.main('#canvas', OGAM1, 60, 100, 75, 8);
});