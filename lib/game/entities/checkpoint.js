ig.module
(
	'game.entities.checkpoint'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityCheckpoint = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/flag.png', 8, 16),
		size: { x: 4, y: 16},
		offset: { x: 0, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 5,

		timer: 0,

		cp_sound: new ig.Sound('media/checkpoint.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			if (ig.game.difficulty < 1)				
				ig.game.removeEntity(this);

			this.addAnim('idle', 1, [0]);
			this.addAnim('flag', 0.35, [1, 2]);

			this.timer = new ig.Timer(0);
		},

		update: function()
		{
			this.parent();
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer && this.timer.delta() > 0)
			{
				this.timer.set(10);
				this.cp_sound.play();
			}
			else if (other instanceof EntityPlayer)
			{				
				ig.game.show_text("You reached a\ncheckpoint!");
				this.currentAnim = this.anims.flag;
				other.checkpoint(this);
			}
		},

		kill: function()
		{
		}
	});
});