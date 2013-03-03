ig.module
(
	'game.entities.bullet'
)
.requires
(
	'impact.entity',
	'game.entities.pooled',
	'game.entities.muzzle',
	'game.entities.shell'
)
.defines(function()
{
	EntityBullet = EntityPooled.extend(
	{
		animSheet: new ig.AnimationSheet('media/bullet.png', 2, 1),
		size: { x: 2, y: 1 },
		offset: { x: 0, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.B,

		zIndex: 31,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			if (settings.dir < 0)
				this.currentAnim.flip.x = true;

			this.vel.x = settings.dir * 120;

			if (ig.game.get_pool_manager)
			{
				ig.game.get_pool_manager(EntityMuzzle).spawn(this.pos.x-(settings.dir < 0 ? 3 : 0), this.pos.y-2, settings);
				ig.game.get_pool_manager(EntityShell).spawn(this.pos.x, this.pos.y-2);
			}
		},

		update: function()
		{
			if (this.destroyed)
				return;

			if (this.vel.x == 0)	// hängt an level tile
				this.kill();

			this.parent();
		},

		check: function(other)
		{
			if (this.destroyed)
				return;

			if (other instanceof EntityAlien1 || other instanceof EntityAlien2 || other instanceof EntityPlayer)
			{
				other.kill();
				this.kill();
			}
		},
	});
});