ig.module
(
	'game.entities.cannon'
)
.requires
(
	'impact.entity',
	'game.entities.cannonball'
)
.defines(function()
{
	EntityCannon = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/cannon.png', 8, 8),
		size: { x: 8, y: 8},
		gravityFactor: 0,
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.FIXED,

		zIndex: 7,

		dir: 1,
		timer: 0,

		shoot_sound: new ig.Sound('media/cannon.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			if (settings.dir)
				this.dir = settings.dir;

			this.addAnim('idle', 1, [0]);
			this.addAnim('fire', 0.2, [1, 0], true);

			this.timer = new ig.Timer(3);
		},

		update: function()
		{
			this.parent();
		
			if (this.dir < 0)
				this.currentAnim.flip.x = true;
			else if (this.dir > 0)
				this.currentAnim.flip.x = false;

			if (this.timer.delta() > 0)
			{
				if (this.distanceTo(ig.game.player) < 55)
					this.shoot_sound.play();

				this.timer.reset();
				ig.game.spawnEntity(EntityCannonball, this.pos.x+(this.dir > 0 ? 7 : -3), this.pos.y+1, { dir: this.dir });
				this.currentAnim = this.anims.fire.rewind();
			}
		},

		kill: function()
		{
		}
	});
});