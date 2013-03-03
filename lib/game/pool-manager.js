ig.module
(
	'game.pool-manager'
)
.requires
(
	'impact.entity',
	'game.entities.pooled'
)
.defines(function()
{
	PoolManager = ig.Class.extend(
	{
		_type: null,
		_max: 100,
		_objects: [ ],
		_occupied: 0,

		init: function(type, max)
		{
			this._type = type;
			this._max = max;
			this._objects.length = this._max;
			this._occupied = 0;
		},

		spawn: function(x, y, settings)
		{
			for (var p = 0; p < this._max; ++p)
			{
				if (this._objects[p] instanceof EntityPooled && this._objects[p].destroyed)
				{
					this._objects[p].reset(x, y, settings);
					break;
				}
				else if (this._objects[p] instanceof EntityPooled)
				{
					continue;
				}
				else
				{
					if (this._occupied < this._max)
					{
						this._occupied++;
						this._objects[p] = ig.game.spawnEntity(this._type, x, y, settings);
					}
					else
					{
						// TODO: kein platz mehr...
						ig.log("POOLED ARRAY FILLED! " + this._occupied + " - type=" + this._type);
					}
					break;
				}
			}
		}
	});
});