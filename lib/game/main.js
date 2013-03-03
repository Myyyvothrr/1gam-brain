ig.module
( 
	'game.main' 
)
.requires
(
//	'impact.debug.debug',
	'game.global',
	'game.ogam1'
//	, 'game.extern.gamejolt'
)
.defines(function()
{
	"use strict";

	ig.log(VERSION);

	if(ig.ua.mobile)
	{
	    ig.Sound.enabled = false;
	}

	ig.Sound.use = [ig.Sound.FORMAT.OGG];

	ig.main('#canvas', OGAM1, 60, 100, 75, 8);
//	ig.main('#canvas', OGAM1, 60, 100, 75, 15); //-> passt für 1920x1280 / große auflösungen ?
});