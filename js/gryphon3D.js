/*--------------------------------------------------------
* Filename: gryphon3D.js
* Description: Causes Gryphon to move opposite of mouse

* Author: R. Brian Redd 
--------------------------------------------------------*/

$(document).ready(function() {
	$gryph = $(".gryphon"),
	browserPrefix = "",
	usrAg = navigator.userAgent;
	if(usrAg.indexOf("Chrome") > -1 || usrAg.indexOf("Safari") > -1) {
		browserPrefix = "-webkit-";
	} else if (usrAg.indexOf("Opera") > -1) {
		browserPrefix = "-o";
	} else if (usrAg.indexOf("Firefox") > -1) {
		browserPrefix = "-moz-";
	} else if (usrAg.indexOf("MSIE") > -1) {
		browserPrefix = "-ms-";
	}
	
	
	$gryph.css(browserPrefix + "perspective","600px")
    
    $(document).mousemove(function (event) {
        var cx = Math.ceil(window.innerWidth / 2.0),
            cy = Math.ceil(window.innerHeight / 2.0),
            dx = event.pageX - cx,
            dy = event.pageY - cy,
            tiltx = (dy / cy),
            tilty = - (dx / cx),
            radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2)),
            degree = (radius * 15);
        
            shadx = degree*tiltx;   /*horizontal shadow*/
            shady = degree*tilty;   /*vertical shadow*/

        $gryph.css(browserPrefix + 'transform', 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
    });
});