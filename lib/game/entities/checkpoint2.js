ig.module
(
	'game.entities.checkpoint2'
)
.requires
(
	'game.entities.checkpoint'
)
.defines(function()
{
	EntityCheckpoint2 = EntityCheckpoint.extend(
	{
		animSheet: new ig.AnimationSheet('media/flag2.png', 8, 16),
	});
});