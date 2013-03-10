ig.module
(
	'game.entities.alien-boss-tentacle'
)
.requires
(
	'impact.entity',
	'game.entities.pooled'
)
.defines(function()
{
	EntityAlienBossTentacle = EntityPooled.extend(
	{
		animSheet: new ig.AnimationSheet('media/boss-tentacle.png', 8, 56),
		size: { x: 4, y: 56 },
		offset: { x: 2, y: 0 },
		gravityFactor: 0,
		collides: ig.Entity.COLLIDES.NEVER,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		maxVel: { x: 0, y: 80 },

		zIndex: 30,

		timer: null,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('remove', 0.25, [0, 1, 2, 3], true);

			this.timer = new ig.Timer(5 + Math.random() * 5)

			this.accel.y = -10;

			this.currentAnim = this.anims.idle;
		},

		update: function()
		{
			if (this.destroyed)
				return;

			if (this.pos.y <= 240-56)
				this.accel.y = this.vel.y = 0;

			this.parent_update_modified();

			if (this.timer.delta() > 0 && this.currentAnim != this.anims.remove)
				this.currentAnim = this.anims.remove.rewind();

			if (this.timer.delta() > 1)
				this.kill();
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