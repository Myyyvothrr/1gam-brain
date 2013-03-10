ig.module
(
	'game.entities.alien-boss-laser'
)
.requires
(
	'impact.entity',
	'game.entities.pooled'
)
.defines(function()
{
	EntityAlienBossLaser = EntityPooled.extend(
	{
		animSheet: new ig.AnimationSheet('media/boss-laser.png', 16, 8),
		size: { x: 16, y: 8 },
		offset: { x: 0, y: 0 },
		gravityFactor: 0,
		collides: ig.Entity.COLLIDES.NEVER,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		maxVel: { x: 160, y: 0 },

		zIndex: 31,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);

			this.vel.x = -160;
		},

		update: function()
		{
			if (this.destroyed)
				return;

			if (this.pos.x < -16)
				this.kill();

			this.parent_update_modified();
		},

		parent_update_modified: function()
		{
			this.last.x = this.pos.x;
			this.last.y = this.pos.y;
			this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
		
			this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
			this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
		
			this.pos.x += this.vel.x * ig.system.tick;
			this.pos.y += this.vel.y * ig.system.tick;
			
			if(this.currentAnim )
				this.currentAnim.update();
		},

		check: function(other)
		{
			if (this.destroyed)
				return;
			
			if (other instanceof EntityPlayer)
			{
				other.kill();
				this.kill();
			}
		},
	});
});