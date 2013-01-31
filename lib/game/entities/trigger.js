ig.module
(
	'game.entities.trigger'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	TeleporterParticle = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/particles.png', 1, 1),
		size: { x: 1, y: 1 },
		offset: { x: 0, y: 0 },
		collides: ig.Entity.COLLIDES.NEVER,
		zIndex: 27,

		timer: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [5+Math.random()*2]);

			this.vel.x = -70 + 140 * Math.random();		
			this.vel.y = -50 + 100 * Math.random();
			this.accel.x = -60 + 120 * Math.random();			
			this.accel.y = -40 + 80 * Math.random();

			this.timer = new ig.Timer(0.1 + 0.2 * Math.random());
		},

		update: function()
		{
			this.parent();

			if (this.timer.delta() > 0)
				this.kill();
		},
	});

	EntityTrigger = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/teleporter.png', 16, 24),
		size: { x: 16, y: 24 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 0.2, [0, 1, 2, 3]);
		},

		update: function()
		{
			this.parent();

			ig.game.spawnEntity(TeleporterParticle, this.pos.x+Math.random()*this.size.x, this.pos.y+Math.random()*this.size.y);
			ig.game.spawnEntity(TeleporterParticle, this.pos.x+Math.random()*this.size.x, this.pos.y+Math.random()*this.size.y);
			ig.game.spawnEntity(TeleporterParticle, this.pos.x+Math.random()*this.size.x, this.pos.y+Math.random()*this.size.y);
		},
		
		check: function(other)
		{
			if (other instanceof EntityPlayer)
				ig.system.setGame(FinishedState);
		},

		kill: function()
		{
		}
	});
});