
//Grid
var Grid = function(id, tiles){
	this.$el = $("#"+id);
	this.tiles = tiles;
	this.render = function(){
		for(var i = 0; this.tiles.length; i++){
			if(i % 3){

			}
			console.log("tile: ", this.tiles[i])
		}
	}
};

var memoryTiles = [
	{
		"letter": "A"
	},
	{
		"letter": "B"
	},
	{
		"letter": "C"
	},
	{
		"letter": "D"
	}
];







/**
 * Stores active tiles and checks if the match
 * If they do match = hide tiles
 * else flip tiles back over
 */
//MatchHandler
//activeTiles: []
//addTile: function(tile)
	//push to activeTiles
	//check length == 2 then test if match
	//
//isMatch: 
	//compare activeTiles and return boolean
	//
//resolveTiles(boolean)
	//if true call tile.remove
	//else tile.hide
	
	//this.activeTiles.length = 0;


//}

//Tile
var Tile = function(){
	//show : function()
		//on click flip tile
		//MatchHandler.addTile
	//hide:
		//hide tile and retore hidden state
	//remove:
	
};


