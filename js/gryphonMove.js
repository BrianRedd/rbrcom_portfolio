/*--------------------------------------------------------
* Filename: gryphonMove.js
* Description: Causes Gryphon to move opposite of mouse

* Author: R. Brian Redd 
--------------------------------------------------------*/

$(document).ready(function() {
	var DX = 0,
		DY = 0,
		x = 0,
		y = 0,
		sensitivity = 1 / 30,
		$gryph = $(".gryphon");
	
	function gryphMove() {
		x += (DX - x) * sensitivity;
		y += (DY - y) * sensitivity;
		
		var delta = "translate(" + x + "px, " + y + "px) scale(1.1)";
		
		$gryph.css({
			"-webit-transform": delta,
			"-moz-transform": delta,
			"transform": delta
		});
		
		window.requestAnimationFrame(gryphMove);
	}
	
	$(window).on("mousemove click", function(e) {
		var MX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
		var MY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
		DX = (20 * MX) / 100;
		DY = (20 * MY) / 100;
	});
	
	gryphMove();
});