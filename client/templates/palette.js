/* Callbacks */
Template.palette.created = function () {
	if (Swatches.find().count() == 0) {
		Router.go('extract')
	};

	sessionGetSet("swatchStyle", "circle");
	sessionGetSet("swatchLabel", "default");
	Session.set("paletteView", "palette");
	
};

Template.palette.rendered = function () {
	$('.gridly').gridly({
	      base: 60, // px 
	      gutter: 20, // px
	      columns: 10,
	      draggable: {
	        zIndex: 800,
	        selector: '> *'
	      }
	  });
	$('.palette .swatch-item').each(function(index, el) {
		setTimeout(function() {
			$(el).addClass('fade-in');
		}, Math.floor(index/5)*100);
		
	});
};

/* Helpers */
Template.palette.helpers({
	swatches: function() {
		return Swatches.find();
	},
	swatchCount: function() {
		return Swatches.find().count();
	},

	/* General Utility helpers */
	pluralize: function(count, singular, plural) {
		if (count == 1) {
			return singular;
		} else {
			return	plural;
		}
	},

	/* Toolbar Toggles */
	paletteViewActive: function() {
		return (Session.get("paletteView") == "code" ? "" : "active");
	},
	codeViewActive: function() {
		return (Session.get("paletteView") == "code" ? "active" : "");
	},

	/* Swatch template helpers */
	// The name or the value of the swatch.
	swatchLabel: function() {
		if (Session.get("swatchLabel") == "colorVal") {
			return this.colorVal;
		} else if (Session.get("swatchLabel") == "varName") {
			return this.varName || "undefined";
		} else {
			return this.varName || this.colorVal;
		}
	},
	// Circle or Square style swatch color
	swatchStyle: function() {
		if (Session.get("swatchStyle") == "square") {
			return	"swatch-item__swatch--square";
		} else {
			return	"swatch-item__swatch--circle";
		}
	}
});

/* Events */
Template.palette.events({
	'click .gridly .swatch-item__swatch': function(event) {
		event.preventDefault();
		event.stopPropagation();
		var $this, height, width;
		$this = $(event.currentTarget).parent();
		$this.toggleClass('small');
		$this.toggleClass('large');
		if ($this.hasClass('small')) {
			width = 140;
			height = 160;
		}
		if ($this.hasClass('large')) {
			width = 300;
			height = 340;
		}
		$this.data('width', width);
		$this.data('height', height);
		return $('.gridly').gridly('layout');
	},
	'click .gridly .delete': function(event) {
		var $this;
		event.preventDefault();
		event.stopPropagation();
		$this = $(event.currentTarget);
		$this.closest('.swatch').remove();
		return $('.gridly').gridly('layout');
	},
	'click .gridly .swatch-item__text': function(event) {
		$this = $(event.currentTarget);
		$this.select()
		console.log($this);
		
	}
	//, 'click .add': function(event) {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	$('.gridly').append(swatch);
	// 	return $('.gridly').gridly();
	// }
})


		// $('.gridly').gridly({
	 //      base: 60, // px 
	 //      gutter: 20, // px
	 //      columns: 12
	 //  });

	    // Generated by CoffeeScript 1.6.3
// 	    (function() {
// 	    	$(function() {
// 	    		var swatch;
// 	    		swatch = "<div class='swatch small'><div class='delete'>&times;</div></div>";
// 	    		// $(document).on("click", ".add", function(event) {
// 	    		// 	event.preventDefault();
// 	    		// 	event.stopPropagation();
// 	    		// 	$('.gridly').append(swatch);
// 	    		// 	return $('.gridly').gridly();
// 	    		// });
// 	    		// return $('.gridly').gridly();
// 	    	});

// }).call(this);