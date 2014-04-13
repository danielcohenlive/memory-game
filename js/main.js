//App
var App = function(view, model){
	this.$el = $("#"+view);
	this.model = model;
	this.tiles = this.model.attributes.tiles;
	this.gridColumns = this.model.attributes.gridColumns;

	this.init();
};

App.prototype = {
	init: function(){
		this.render();
		this.subscribe();
	},
	subscribe: function(){
		Events.broadcaster.on(Events.tileTurnedOver, $.proxy(this.compareTiles, this));
	},
	render: function(){
		//loop through model to create board
		for(var i=0; i < this.tiles.length; i++){
			//create new tile and append it to grid
			var tile = new Tile(this.tiles[i]);
			this.$el.append(tile.$el);
		}
	},
	compareTiles: function(){
		var $activeTiles = $(".tile.active", this.$el);

		if($activeTiles.length === 2){
			isMatch = $activeTiles.eq(0).data("id") === $activeTiles.eq(1).data("id");
			if(isMatch) Events.broadcaster.trigger(Events.correctMatch);
			else Events.broadcaster.trigger(Events.incorrectMatch);
		}
	}
};



var Tile = function(data){
	this.id = data.id;
	this.letter = data.letter;
	this.$el;

	this.init();
};

Tile.prototype = {
	init: function(){
		this.buildTile();
		this.subscribe();
		this.events();
	},
	subscribe: function(){
		Events.broadcaster.on(Events.correctMatch, $.proxy(this.hideTile, this));
		Events.broadcaster.on(Events.incorrectMatch, $.proxy(this.resetTile, this));
	},
	events: function(){
		var self = this;
		self.$el.on("click", $.proxy(self.flipTile, self));
	},
	buildTile: function(){
		var html = '<div class="tile" data-id="' + this.id + '">'+ this.letter +'</div>';
		this.$el = $(html);
	},
	flipTile: function(){
		//check that tile hasn't been flipped and that no more than 2 tiles are already flipped
		if(!this.$el.hasClass("active") && $(".tile.active").length < 2){
			this.$el.addClass("active");
			Events.broadcaster.trigger(Events.tileTurnedOver);
		}
	},
	resetTile: function(){
		var self = this;
		if(this.$el.hasClass("active")){
			setTimeout(function(){
				self.$el.removeClass("active");
			}, 1000);
		}
	},
	hideTile: function(){
		var self = this;
		if(this.$el.hasClass("active")){
			setTimeout(function(){
				self.$el.removeClass("active");
				self.$el.addClass("matched");
			}, 1000);
			
		}
	}
};

var Events = {
	"tileTurnedOver": "tileTurnedOver",
	"correctMatch": "correctMatch",
	"incorrectMatch": "incorrectMatch",
	"broadcaster": $(new Object())
}


var MemoryTiles = function(){
	this.attributes = {
		gridColumns: 2,
		tiles: [
			{
				"id": "001",
				"letter": "A",
				"isMatched": false
			},
			{
				"id": "002",
				"letter": "B",
				"isMatched": false
			}
		]
	};

	this.init();
};

MemoryTiles.prototype = {
	init: function(){
		this.duplicateTiles();
		this.randomizeTiles();
	},
	get: function(attr){
		return this.attributes(attr);
	},
	set: function(attr, value){
		this.attributes[attr] = value;
	},
	duplicateTiles: function(){
		var tiles = this.attributes.tiles,
			tilesCopy = [];
		
		//make copy of tiles in model
		tiles.forEach(function(tile, index){
			tilesCopy.push(tile);
		});

		//push copied tiles to model
		tilesCopy.forEach(function(tile, index, array){
			tiles.push(tile);
		});
	},
	randomizeTiles: function(){		
		/** Inspired by Fisher–Yates Shuffle algorithm
			url: http://bost.ocks.org/mike/shuffle/
		**/

		var tiles = this.attributes.tiles,
			m = tiles.length, t, i;

		// While there remain elements to shuffle…
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = tiles[m];
			tiles[m] = tiles[i];
			tiles[i] = t;
		}		
	}
}

$(function(){
	var memoryTiles = new MemoryTiles();
	var app = new App("memory-game", memoryTiles);
});