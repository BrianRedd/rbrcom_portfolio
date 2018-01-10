/*--------------------------------------------------------
* Filename: scripts.js
* Description: General scripts for RBrianRedd.com Portfolio

* Author: R. Brian Redd 
--------------------------------------------------------*/

$(document).ready(function() {
	
/*
 Variables
-----------*/
	var DTB = [ //tagline color mapping
			{tag:"dream",color:"#006A5C"}, //green
			{tag:"think",color:"#7C0044"}, //red
			{tag:"build",color:"#0053A7"}, //blue
			{tag:"default",color:"#5E5EAF"} //background purple
		];
	var $body = $("body"), //jQuery variable for "body"
		$DTB = $(".ditibi").parent(), //variable for the div holding each tagline
		$DTBM = $("#ditibi_modal"), //modal
		$DTBC = $DTBM.find("#ditibi_carousel"), //in-modal carousel
		$gryph = $(".gryphon"), //upper background image
		$bacon = $(".bacon"), //content below main page
		$gryphmask = $bacon.find(".gryph_mask"), //lower background image
		$form = $bacon.find("#contactform"),//contact us form
		$imgholder = $(".imgholder");//image holder
		
/*
 Loading Sequence
------------------*/

var gryphPlace = debounce(function() { //places bg image half way off right edge, responsively (with debounce)...
	var w = $(window).width() / 2, //half screen width
		h = $(window).height() / 2, //half screen height
		bh = 0, //total bacon height
		m = (w > h) ? w - h + 80 : 0; //landscape or portrait?
		
	$gryph.animate({ //... via jQuery animation
		left: "50%",
		marginLeft: m + "px"
	}, 1000, function() {
	});
	
	$bacon.find(".container").each(function() { //determines height of bacon gryphon based on content of containers (and min-height)
		$(this).css("minHeight", h * 2);
		var mh = $(this).css("minHeight");
		mh = mh.slice(0,-2);
		var hh = $(this).height();
		var t = (parseInt(mh) > hh) ? parseInt(mh) : hh;
		bh += (t + 20) ;
		
	});
	$gryphmask.css({"backgroundPosition":(w + m) + "px center", "minHeight": bh});
	
}, 250); //run no more than every quarter second

$(window).resize(function () { //repositions bg image when screen size changes
	gryphPlace();
});

gryphPlace();//automatically applies upon load

/*
 Effects
-----------*/
	$DTB.hover(function(){ //when mousing over tag lines, change background color
		var $ths = $(this).find(".ditibi");
		var v = $ths.attr("val");
		$body.css("backgroundColor",DTB[v].color);
	}, function() { //when mouse off, go to background reset
		bgReset();
	}); 
	
	inView(".inview").on('enter',function(el){ //configure "inView" plug-in
		var c = parseInt($(el).attr('data-background-color'));
		$body.css("backgroundColor",DTB[c].color);
	})
	
	$('[data-toggle="tooltip"]').tooltip();//initialize Bootstrap tooltips
	
	$imgholder.each(function() { //initialize hoverdir plug-in
		$(this).hoverdir();
	});
	
/*
 Controls
-----------*/
	//Modal controls
	$DTBM.on('hidden.bs.modal', function (e) {
		bgReset(); //when modal is hidden, reset colors
	});
	
	//Carousel controls
	$DTBC.carousel({interval: false}).on("slid.bs.carousel",function() { //when slide completes, go to carChange
		carChange();
	});
	
	$DTB.find(".ditibi").click(function(){ //onClick for tag lines (opening modal to appropriate slide, changing background)
		var v = parseInt($(this).attr("val"));
		$DTBC.carousel(v);
		modalLoad();
	});
	
	$DTBC.find(".nextprev").click(function() {
		$DTBC.carousel($(this).attr("data-slide"));
	});
	
	$DTBC.find(".carousel-header").click(function() { //clicking on in-modal carousel header closes modal
		modalHide();
	});
	
/*
 Functions
-----------*/

	function debounce(func, wait, immediate) { //debounce function
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	function bgReset() { //reset background color, iff modal is hidden
		if (!$(".modal").is(":visible")) {
			$body.css("backgroundColor",DTB[3].color);
		}
	};
	
	function carChange() { //on carousel change, update bg and header colors
		var c = DTB[$DTBC.find(".carousel-item.active").attr("slide")].color;
		$body.css("backgroundColor",c);
		$DTBC.find(".carousel-header").css("backgroundColor",c);
		$DTBC.find(".carousel-caption").css("color",c);
		$DTBC.find(".carousel-indicators li").css({"borderColor":c,"backgroundColor":"transparent"});
		$DTBC.find(".carousel-indicators .active").css("backgroundColor",c);
		$DTBC.find(".nextprev").css("color",c);
	};
	
	function modalLoad() {//animated modal show
		$DTBM.css({"top": "100%", "opacity": 0}).modal("show").animate({
			top: "50%",
			opacity: 1
		},500);
		carChange();
	}
	
	function modalHide() {//animated modal hide
		//$DTBM.modal("hide");
		$DTBM.animate({
			top: 0,
			opacity: 0
		},500, function() {
			$DTBM.modal("hide").css({"top": "50%", "opacity": 1});
		});
	};
/*
 Contact Me Form
----------------*/
	$form.change(function () {
		var l,
			v = $form.find("select[name='purpose']").val(),
			$cm = $form.find(".form-contact");
		if (v != "unspecified") {
			$form.find(".form-details").css("display","flex");
			switch(v) {
				case "freelance":
					l = "Tell me about your dream:"
					break;
				case "resume":
					l = "Tell me about the job:"
					break;
				case "praise":
					l = "Thank you! Any feedback?"
					break;
				default: 
					l = "Tell me all about it:"
			};
			$form.find("label[for='details']").text(l);
		} else {
			$form.find(".form-details").hide();
		};
		if ($cm.find("select[name='contactmethod']").val() == "telephone") {
			$cm.find(".cm_email").hide();
			$cm.find(".cm_tel").css("display","flex");
			$cm.find(".cm_email input").removeAttr("required");
			$cm.find(".cm_tel input").attr("required","required");
		} else {
			$cm.find(".cm_tel").hide();
			$cm.find(".cm_email").css("display","flex");
			$cm.find(".cm_tel input").removeAttr("required");
			$cm.find(".cm_email input").attr("required","required");
		}
	});

});