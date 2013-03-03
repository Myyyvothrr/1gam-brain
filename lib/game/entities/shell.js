ig.module
(
	'game.entities.shell'
)
.requires
(
	'impact.entity',
	'game.entities.pooled'
)
.defines(function()
{
	EntityShell = EntityPooled.extend(
	{
		animSheet: new ig.AnimationSheet('media/shell.png', 2, 1),
		size: { x: 2, y: 1 },
		offset: { x: 0, y: 0 },
		zIndex: 39,

		timer: null,

		shell_sound: new ig.Sound('media/shell.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);

			bounciness: 0.3 + 0.6 * Math.random();

			this.vel.x = -20 + 40 * Math.random();		
			this.vel.y = -40 + 80 * Math.random();
			this.accel.x = -60 + 120 * Math.random();			
			this.accel.y = -40 + 80 * Math.random();
			
			if (!this.timer)
				this.timer = new ig.Timer();

			this.timer.set(1 + 1 * Math.random());
		},

		update: function()
		{
			if (this.destroyed)
				return;

			this.parent();

			if (this.timer.delta() > 0)
				this.kill();
		},

		handleMovementTrace: function(res)
		{
			if (this.destroyed)
				return;

		    if(res.collision.y)
		    {
		    	if (this.vel.x != 0)
					this.shell_sound.play();
				
		    	this.vel.x = 0;
		    	this.accel.x = 0;
			}

			this.parent(res);
		},
	});
});