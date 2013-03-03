ig.module
(
	'game.entities.pooled'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityPooled = ig.Entity.extend(
	{
		destroyed: false,

		old_type: 0,
		old_collides: 0,
		old_check: 0,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);
		},

		draw: function()
		{
			if (this.destroyed)
				return;

			this.parent();
		},

		update: function()
		{
			if (this.destroyed)
				return;
			
			this.parent();
		},

		check: function(other)
		{
			if (this.destroyed)
				return;

			this.parent();
		},

		kill: function()
		{
			if (this.destroyed)
				return;

			/*for (var v in this)
				ig.log(v);
			ig.log("-----------------");*/

			this.old_type = this.type;
			this.old_collides = this.collides;
			this.old_check = this.checkAgainst;

			this.destroyed = true;

			this.type = ig.Entity.TYPE.NONE;
			this.collides = ig.Entity.COLLIDES.NEVER;
			this.checkAgainst = ig.Entity.TYPE.NONE;
		},

		reset: function(x, y, settings)
		{
			this.type = this.old_type;
			this.collides = this.old_collides;
			this.checkAgainst = this.old_check;

			this.destroyed = false;

			this.init(x, y, settings);
		}
	});
});