ig.module
( 
	'game.menu-state' 
)
.requires
(
	'impact.game',
	'game.info-state',
	'game.game-state',
	'game.game-state-chapter2'
)
.defines(function()
{
	MenuState = ig.Game.extend(
	{
		title_img: new ig.Image('media/title_ingame.png'),
		font: new ig.Font('media/04b03.font.png'),

		cursor: 0,

		select_chapter: false,
		chapter: 0,

		init: function()
		{
		},

		update: function()
		{
			if (ig.input.pressed('shoot'))
			{
				if (!this.select_chapter)
				{	
					switch (this.cursor)
					{
						case 0: this.select_chapter = true; break;
						case 1: ig.system.setGame(HelpState); break;
						case 2: ig.system.setGame(CreditsState); break;
					}
				}
				else
				{
					if (this.chapter == 0)
						ig.system.setGame(GameState);
					else
						ig.system.setGame(GameStateChapter2);
				}
			}
			else if (ig.input.pressed('skills'))
			{
				if (this.select_chapter)
					this.select_chapter = false;
			}
			
			if (!this.select_chapter)
			{
				if (ig.input.pressed('down'))
					this.cursor = (this.cursor+1) % 3;
				else if (ig.input.pressed('jump'))
				{
					--this.cursor;
					if (this.cursor < 0)
						this.cursor = 2;
				}
			}
			else
			{
				if (ig.input.pressed('down') || ig.input.pressed('jump'))
					this.chapter == 0 ? this.chapter = 1 : this.chapter = 0;
			}
		},

		draw: function()
		{
			this.parent();
			this.title_img.draw(0, 0);
			
			if (!this.select_chapter)
			{
				this.font.draw((this.cursor == 0) ? '-> Start <-' : 'Start', 50, 46, ig.Font.ALIGN.CENTER);
				this.font.draw((this.cursor == 1) ? '-> Help <-' : 'Help', 50, 54, ig.Font.ALIGN.CENTER);
				this.font.draw((this.cursor == 2) ? '-> Credits <-' : 'Credits', 50, 62, ig.Font.ALIGN.CENTER);
			}
			else
			{
				this.font.draw((this.chapter == 0) ? '-> Chapter 1 <-' : 'Chapter 1', 50, 46, ig.Font.ALIGN.CENTER);
				this.font.draw((this.chapter == 1) ? '-> Chapter 2 <-' : 'Chapter 2', 50, 54, ig.Font.ALIGN.CENTER);
				this.font.draw((this.chapter == 0) ? 'Get Your Brain Back!' : 'Explore The Alien Ship', 50, 65, ig.Font.ALIGN.CENTER);
			}
		}
	});
});