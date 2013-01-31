ig.module
(
	'game.entities.brain'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityBrain = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/brain.png', 8, 8),
		size: { x: 8, y: 8},
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 23,

		brain_id: -1,

		pickup_sound: new ig.Sound('media/brain.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			if (ig.game.global_data && ig.game.global_data.brains[this.brain_id] == true)
				ig.game.removeEntity(this);

			this.addAnim('idle', 1, [0]);
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				other.add_brain();
				this.pickup_sound.play();
				ig.game.removeEntity(this);
				ig.game.global_data.brains[this.brain_id] = true;
			}
		},

		kill: function()
		{
		}
	});
});