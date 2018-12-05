// Nav Search Box open
$('.al-search-desk').on('click', function(){
	$(this).parent().addClass('search-on');
	//$('#search').addClass('active-search');
	$('.search-inner input').focus();
});
$('.close-search').on('click', function(){
	$('.al-link > div').removeClass('search-on');
});

// Left Floating button for Desktop
var floatPosition = parseInt($("#floating-banner").css('top'));
$(window).scroll(function() {
	var scrollTop = $(window).scrollTop();
	var newPosition = scrollTop + floatPosition + "px";
	$("#floating-banner").stop().animate({
		"top" : newPosition
	}, 100);
}).scroll();

// Mobile Menu aFix
$(window).scroll(function(){
	var sticky = $('body'),
	scroll = $(window).scrollTop();
	if (scroll >= 300) sticky.addClass('header-afix');
	else sticky.removeClass('header-afix');
});

//Mobile Menu Open
$( document ).ready(function() {
	var $menuMask = $( "<div id='mask'></div>" );
	$("body" ).append($menuMask);
	
	function MobileMenu(){
		$('.mobile-menu-btn').toggleClass('menu-on');
		$('.mobile-nav').toggleClass('mobile-menu-on');
		$('body').toggleClass('active-mobile-menu-on');
		$('#mask').fadeToggle();
	}

	function RemoveOpenMenu(){
		$('.mobile-menu-btn').removeClass('menu-on');
		$('.mobile-nav').removeClass('mobile-menu-on');
		$('body').removeClass('active-mobile-menu-on');
		$('#mask').fadeOut();
	}

	$('.mobile-menu-btn, #mask').on('click', function(){
		MobileMenu();
	});
	
	/* Mobile menu button action*/
	$('#mask, .m-nav .open-link').click(function(){
			RemoveOpenMenu();
	});
	$( window ).resize(function() {
		var windowWidth = $( window ).width();
		if(windowWidth > 1023 ) RemoveOpenMenu();
		//$('body').removeClass('header-afix');
	});

	//Mobile Nav list open 
	$('.m-nav .nav-cate-tit').on('click', function(){
		$(this).parent().toggleClass('active');
	});

	//Mobile Nav sub menu open
	$('.depth02 li > a').on('click', function(){
		$(this).next('ul').fadeIn();
	});
	$('.depth03 li > a').on('click', function(){
		//$(this).closest('.depth01').find('.depth03 li > ul').fadeOut();
		//$(this).addClass('selected').next('ul').fadeIn();
		$(this).closest('.depth01').find('.depth02').addClass('open-depth04');
		$(this).closest('.depth01').find('.depth03 li').removeClass('selected');
		$(this).parent().addClass('selected');
		var depth03Height = $(this).next('ul').height();
		var depth02Height = 0;
		$(this).closest('.depth01').find('.depth02 > li').each(function(){
			depth02Height += $(this).height();
		});
		//alert(depth03Height +','+depth02Height);
		if (depth03Height > depth02Height ){
			$(this).closest('.depth02').animate({
				height: depth03Height,
			}, 500);
		}else {
			$(this).closest('.depth02').animate({
				height: depth02Height,
			}, 500);
		}
		//alert(depth03Height);
	});

	//Mobile Footer menu open 
	$('.footer-nav').find('.nav-cate-tit').on('click', function(){
			$('.footer-nav').find('.nav-cate').removeClass('footer-menu-on');
			$(this).parent().addClass('footer-menu-on');
	});
});

//Main Banner Ico Select
$(".ico-banner").on('click', function(){
	var icoNum = $(this).attr('data-ico-id');
	$(".ico-banner:not('." + icoNum +"')").toggleClass('ico-disappear');
	$(".subcont-ico").toggleClass("selected");
});

//Main Banner Text effect
//consoleText(['a wedding'], 'textwords');
function consoleText(words, id, colors) {
	if (colors === undefined) colors = ['#fff'];
	var visible = true;
	var con = $('console');
	var letterCount = 1;
	var x = 1;
	var waiting = false;
	var target = document.getElementById(id);
	target.setAttribute('style', 'color:' + colors[0])
	setInterval(function() {
	if (letterCount === 0 && waiting === false) {
	  waiting = true;
	  target.innerHTML = words[0].substring(0, letterCount)
	  window.setTimeout(function() {
		var usedColor = colors.shift();
		colors.push(usedColor);
		var usedWord = words.shift();
		words.push(usedWord);
		x = 1;
		target.setAttribute('style', 'color:' + colors[0])
		letterCount += x;
		waiting = false;
	  }, 1000)
	} else if (letterCount === words[0].length + 1 && waiting === false) {
	  waiting = true;
	  window.setTimeout(function() {
		x = -1;
		letterCount += x;
		waiting = false;
	  }, 1000)
	} else if (waiting === false) {
		target.innerHTML = words[0].substring(0, letterCount)
		letterCount += x;
	}
  }, 120)
	setInterval(function() {
	if (waiting === true) {
		$('#console').attr('class','console-underscore hidden');
	} else {
		$('#console').attr('class','console-underscore');
	}
	}, 400)
}

//Scroll down apear text
$.fn.isInViewport = function() {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();
	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();
	return elementBottom > viewportTop && elementTop < viewportBottom;
};
$(window).on('scroll.CustomScroll', function() {
	 if ($('#console').isInViewport()) {
		consoleText(['a wedding.', 'my annual dinner.', 'a day time event.', 'an evening event.', 'a gala.', 'a cocktail party.', 'graduation party.', 'a girls night out.'], 'textwords01');
		consoleText(['special occasion.', 'vacation.', 'bridal shower.', 'festival.', '.black tie dinner.'], 'textwords02');
		consoleText(['first date.','deluxe holiday.', 'overseas wedding party.', 'IG post.', 'senior prom.', 'masquerade ball.'], 'textwords03');
		$(window).off('scroll.CustomScroll');
	}
});

// Stack Gallery
!function($){
  var defaults = {
	direction: "forward",
	flipDirection: "center",
	selector: "> a",
	spacing: 25,
	showMaximum: 15,
	enableScroll: true,
	autoplay: false
	};
	
  $.fn.flipping_gallery = function(options){
	var settings = $.extend({}, defaults, options),
		el = $(this),
		total = el.find(settings.selector).length,
		space = 0,
		scale = 0.5 / total, 
		opacity = 1 / total,
		lastAnimation = 0,
		quietPeriod = 2000;  
	  
	if (total > settings.showMaximum) opacity = 1 / settings.showMaximum
	el.addClass("fg-body")
	
	
	$.fn.realignCards = function() {
	  var el = $(this);
	  $.each(el.find(settings.selector), function(i) {
		if (i == 0) {
		  $(this).addClass("active " + settings.flipDirection)
		  el.find(".fg-caption").remove()
		  if($(this).data("caption")) {
			el.append("<div class='fg-caption' style='opacity: 0;'>" + $(this).attr("data-caption") + "</div>")
			el.find(".fg-caption").css({
			  "opacity": "1"
			});
		  }
		}

		space = space + settings.spacing
		new_scale = 1 - (scale * i)
		new_opacity = 1 - (opacity * i)
		if (i >= settings.showMaximum) {
		  $(this).css("opacity", 0)
		} else {
		   $(this).css("opacity", 1)
		}
		$(this).addClass("animate fg-card").css({
		  "z-index": 5 - i,
		  "margin-left": space + "px",
		  "-webkit-transform": "scale(" + new_scale + ")",
		  "-moz-transform": "scale(" + new_scale + ")",
		  "-o-transform": "scale(" + new_scale + ")",
		  "transform": "scale(" + new_scale + ")",
		  "transform-origin:": "top right",
		  //
		  "opacity": "1",
		});
		$(this).click(function() {
		  return false;
		});
	  });
	  el.find("> .fg-card.active").click(function() {
		if (settings.direction == "forward") {
		  el.flipForward();
		} else {
		  el.flipBackward();
		}
		return false;
	  })
	}
	
	function init_scroll(event, delta) {
		deltaOfInterest = delta;
		var timeNow = new Date().getTime();
		// Cancel scroll if currently animating or within quiet period
		if(timeNow - lastAnimation < quietPeriod + settings.animationTime) {
			event.preventDefault();
			return;
		}
		if (deltaOfInterest < 0) {
		  el.flipForward()
		} else {
		  el.flipBackward()
		}
		lastAnimation = timeNow;
	}
	
	$.fn.flipForward = function() {
	  if (!el.hasClass("animating")) {
		el.addClass("animating")
		el.find(".fg-caption").remove();
		var card = el.find("> .fg-card").first();
		card.addClass("fg-flipping").css("opacity", "0");
		card.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		  var save_card = card.removeClass("animate active fg-flipping [class^='fg-count-'] " + settings.flipDirection).clone();
		  card.remove();
		  el.append(save_card.hide());
		  
		  el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
			space = 0;
			el.realignCards()
		  });
		  
		  el.find("> .fg-card").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e) {
			el.find("> .fg-card").fadeIn()
			el.removeClass("animating")
		  });
		});
	  }
	}
	
	$.fn.flipBackward = function() {
	  if (!el.hasClass("animating")) {
		el.addClass("animating")
		var prev_card = el.find("> .fg-card").last();
		var new_prev_card = prev_card.clone()
		prev_card.remove()
		el.find(".active").removeClass("active "  + settings.flipDirection)
		el.prepend(new_prev_card.attr("style", "").css({
		  "opacity": "0",
		  "z-index": "99"
		}).hide().addClass("active fg-flipping "  + settings.flipDirection))
		el.find("> .fg-card.active").addClass("animate").show().removeClass("fg-flipping").css("opacity", "1")
		space = 0;
		el.realignCards();
		el.find("> .fg-card").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e) {
		
		  el.removeClass("animating")
		});
	  }
	}
	el.realignCards();
	if (settings.enableScroll == true) {
	  $(el).bind('mousewheel DOMMouseScroll', function(event) {
		event.preventDefault();
		var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
		init_scroll(event, delta);
	  });
	}
	
	if(settings.autoplay != 0 && settings.autoplay != false) {
	  setInterval(function() {
		
		if($(el.selector + ":hover").length < 1) el.flipForward()
	  }, settings.autoplay);
	}
	
  }
}(window.jQuery);

//open link assets
function openAsset(){
	var assetID = $(this).attr('data-asset-id');
	var trigger = 'asset-on';
	//alert(assetID);
	$('.open-asset').removeClass('selected');
	$('.link-asset-box').fadeOut().removeClass(trigger);
	$('.open-asset[data-asset-id='+ assetID +']').addClass('selected');
	//$('.link-asset-box[data-asset-id='+ assetID +']').addClass(trigger);
	$('.link-asset-box[data-asset-id='+ assetID +']').fadeIn(function(){
		setTimeout(function(){
			$(this).addClass(trigger);
		}, 1000);
	});
}
$('.open-asset').on('click', openAsset);
$('.link-asset-close').on('click', function(){
	var trigger = 'asset-on';
	$('.open-asset').removeClass('selected');
	$('.link-asset-box').fadeOut(function(){
		setTimeout(function(){
			$(this).removeClass(trigger);
		}, 1000);
	});
});

$(function() {
	// init 
	$('.js-carousel').slick({
		dots: true,
		infinite: true,
		fade: true,
		arrows: false,
		draggable: false,
		speed: 1000,
	});

	$('.js-carousel-auto').slick({
		dots: true,
		infinite: true,
		fade: true,
		arrows: false,
		draggable: false,
		speed: 2000,
		autoplay: true,
		autoplaySpeed: 5000,
	});

	var videobanner = $('.js-carousel-mb01');
	function playPauseVideo(slick, control){
		var currentSlide;
		currentSlide = slick.find(".slick-current");
		video = currentSlide.find("video").get(0);
		if (video != null) {
		  if (control === "play"){
			video.play();
			videobanner.slick('slickSetOption', 'autoplay', false).slick('slickPause');
			$('video').on('ended', function(){
				$('#play-button').removeClass('hide');
				$('#stop').addClass('hide');
				videobanner.slick('slickSetOption', 'autoplay', true).slick('slickPlay').slick("slickNext");
			});
		  } else {
			video.pause();
		  }
		}
	}

	videobanner.on("init", function(slick){
		slick = $(slick.currentTarget);
		setTimeout(function(){
			playPauseVideo(slick,"play");
		}, 1000);
	});
	videobanner.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		//console.log('out');
		slick = $(slick.$slider);
		playPauseVideo(slick,"stop");
		$('#play-button').removeClass('hide');
		$('#stop').addClass('hide');
		slick.slick('slickSetOption', 'autoplay', true).slick('slickPlay');
	});
	videobanner.on("afterChange", function(event, slick, currentSlide, nextSlide) {
		//console.log('in');
		slick = $(slick.$slider);
		playPauseVideo(slick,"play");
		$('#play-button').addClass('hide');
		$('#stop').removeClass('hide');
	});

	videobanner.slick({
		dots: true,
		infinite: true,
		fade: true,
		arrows: false,
		draggable: false,
		speed: 2000,
		autoplay: true,
		autoplaySpeed: 5000,
		asNavFor: '.js-carousel-mb01-info',
		pauseOnHover:true,
		responsive: [
			{
			  breakpoint: 1023,
			  settings: {
				autoplay: false,
			  }
			},
		]
	});
	
	$('.js-carousel-mb01-info').slick({
		dots: false,
		infinite: false,
		fade: true,
		arrows: false,
		draggable: false,
		speed: 2000,
		asNavFor: '.js-carousel-mb01',
		pauseOnHover:true,
		adaptiveHeight: false,
		responsive: [
			{
			  breakpoint: 767,
			  settings: {
				  adaptiveHeight: true,
			  }
			},
		]
	});	

	$('.js-carousel-mb02').slick({
		dots: true,
		infinite: true,
		fade: true,
		arrows: false,
		draggable: false,
		speed: 2000,
		autoplay: true,
		autoplaySpeed: 5000,
		asNavFor: '.js-carousel-mb02-info',
		pauseOnHover:true,
	});	
	
	$('.js-carousel-mb02-info').slick({
		dots: false,
		infinite: false,
		fade: true,
		arrows: false,
		draggable: false,
		speed: 2000,
		asNavFor: '.js-carousel-mb02',
		pauseOnHover:true,
		adaptiveHeight: false,
		responsive: [
			{
			  breakpoint: 767,
			  settings: {
				  adaptiveHeight: true,
			  }
			},
		]
	});	

	$('.js-carousel-mb03').slick({
		dots: true,
		infinite: true,
		fade: true,
		arrows: false,
		draggable: false,
		speed: 2000,
		autoplay: true,
		autoplaySpeed: 5000,
		asNavFor: '.js-carousel-mb03-info',
		pauseOnHover:true,
	});	
	
	$('.js-carousel-mb03-info').slick({
		dots: false,
		infinite: false,
		fade: true,
		arrows: false,
		draggable: false,
		speed: 2000,
		asNavFor: '.js-carousel-mb03',
		pauseOnHover:true,
		adaptiveHeight: false,
		responsive: [
			{
			  breakpoint: 767,
			  settings: {
				  adaptiveHeight: true,
			  }
			},
		]
	});	

	$('.js-carousel-product').slick({
		dots: false,
		arrows: false,
		draggable: false,
		speed: 2000,
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover:true,
		adaptiveHeight: false,
		responsive: [
			{
			  breakpoint: 1023,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 2,
			  }
			},{
			  breakpoint: 767,
			  settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
			  }
			},
		]
	});	

	$('.js-video').lightGallery({
		videoMaxWidth: '1250px',
	});
	AOS.init({
		once: true,
		duration: 1500,
	});
	$(".js-stack").flipping_gallery({
		enableScroll: false,
		autoplay: 5000,
	});

	//floating banner - dot color
	$('#floating-banner .slick-dots li').on('click', function(){
		var dot_num = $(this).find('button').html();
		$('#floating-banner').attr('class', 'slide' + dot_num);
	});
	//floating banner - hidden
	$('.floating-banner-close').on('click', function(){
		$('#floating-banner').toggleClass('floating-hidden');
	});

	$('#logo').mouseover(function() {
		$('.desktop-nav').addClass('desktop-menu-on');
	});
	$('.desktop-nav').mouseleave(function() {
	  $('.desktop-nav').removeClass('desktop-menu-on');
	});
	//open extra product 
	$('.open-ex-pd').on('click', function(){
		$('.extra-product').addClass('ex-pd-open');
		$('html, body').animate({
			scrollTop: $('#rel-product').offset().top - 90
		}, 1500);
	});
	$('.extra-prodcut-close').on('click', function(){
		$('.extra-product').removeClass('ex-pd-open');
	});

	//Area Center 
	$.fn.extend({
		center: function (options) {
			 var options =$.extend({ // Default values
					inside:window, // element, center into window
					transition: 0, // millisecond, transition time
					minX:0, // pixel, minimum left element value
					minY:0, // pixel, minimum top element value
					withScrolling:true, // booleen, take care of the scrollbar (scrollTop)
					vertical:true, // booleen, center vertical
					horizontal:true // booleen, center horizontal
			 }, options);
			 return this.each(function() {
					var props = {position:'absolute'};
					if (options.vertical) {
						 var top = ($(options.inside).height() - $(this).outerHeight()) / 2;
						 if (options.withScrolling) top += $(options.inside).scrollTop() || 0;
						 top = (top > options.minY ? top : options.minY);
						 $.extend(props, {top: top+'px'});
					}
					if (options.horizontal) {
						var left = ($(options.inside).width() - $(this).outerWidth()) / 2;
						if (options.withScrolling) left += $(options.inside).scrollLeft() || 0;
						left = (left > options.minX ? left : options.minX);
						$.extend(props, {left: left+'px'});
					}
					if (options.transition > 0) $(this).animate(props, options.transition);
					else $(this).css(props);
					return $(this);
			 });
		}
	});

	//need to cookie set up.
	var cookieCheck = Cookies.get('popup');
	function openEmailSub(){
		var $lightMask = $( "<div id='mask2'></div>" );
		$("body").append($lightMask);
		$('#mask2').fadeIn();
		$('body').addClass('mask-on');
		setTimeout(function(){
			$('#light_mask').addClass('mask_on');
		}, 100);
		$('#light_wrap').fadeIn().center();
	}
	if(cookieCheck != 'email-sub'){
		openEmailSub();
	}
	$('.openEmailSub').on('click', openEmailSub);

	// Position change for window resize
	$(window).bind('resize', function() {
		$('#light_wrap').center({transition:30});
	});

	$('.subscribe-close, #mask2').on('click', function(){
		$('#mask2').fadeOut();
		$('#light_wrap').fadeOut();
		$('body').removeClass('mask-on');
		Cookies.set('popup', 'email-sub');
	});

	//html5 video control
	var video = $('.slick-current video').get(0);
	$(document).delegate('#play-button', 'click', function() {
		//video.load();
		video.play();
		$('#play-button').addClass('hide');
		$('#stop').removeClass('hide');
	});
	$(document).delegate('#stop', 'click', function() {
		video.pause();
		//video.currentTime = 0;
		$('#play-button').removeClass('hide');
		$('#stop').addClass('hide');
	});


	//stack slide new
	function detect_active(){
		// get active
		var get_active = $("#dp-slider .dp_item:first-child").data("class");
		$("#dp-dots li").removeClass("active");
		$("#dp-dots li[data-class="+ get_active +"]").addClass("active");
	}
	$("#dp-next, #dp-btn-next").click(function(){
		var total = $(".dp_item").length;
		$("#dp-slider .dp_item:first-child").hide().appendTo("#dp-slider").fadeIn();
		$.each($('.dp_item'), function (index, dp_item) {
			$(dp_item).attr('data-position', index + 1);
		});
		detect_active();
	});

	$("#dp-prev").click(function(){
		var total = $(".dp_item").length;
		$("#dp-slider .dp_item:last-child").hide().prependTo("#dp-slider").fadeIn();
		$.each($('.dp_item'), function (index, dp_item) {
			$(dp_item).attr('data-position', index + 1);
		});
		detect_active();
	});
	function showDiv(){
		var total = $(".dp_item").length;
		$("#dp-slider .dp_item:first-child").hide().appendTo("#dp-slider").fadeIn();
		$.each($('.dp_item'), function (index, dp_item) {
			$(dp_item).attr('data-position', index + 1);
		});
		detect_active();
	}
	setInterval(showDiv, 5000);

	$("#dp-dots li").click(function(){
		$("#dp-dots li").removeClass("active");
		$(this).addClass("active");
		var get_slide = $(this).attr('data-class');
		console.log(get_slide);
		$("#dp-slider .dp_item[data-class=" + get_slide + "]").hide().prependTo("#dp-slider").fadeIn();
		$.each($('.dp_item'), function (index, dp_item) {
			$(dp_item).attr('data-position', index + 1);
		});
	});
	$("body").on("click", "#dp-slider .dp_item:not(:first-child)", function(){
		var get_slide = $(this).attr('data-class');
		console.log(get_slide);
		$("#dp-slider .dp_item[data-class=" + get_slide + "]").hide().prependTo("#dp-slider").fadeIn();
		$.each($('.dp_item'), function (index, dp_item) {
			$(dp_item).attr('data-position', index + 1);
		});
		detect_active();
	});

});


$(function(){
	$(".goSection").on('click',function(e) {
		var windowWidth = $( window ).width();
		if(windowWidth > 996) {
			var headerH = 60;
		} else if(windowWidth <= 996 & windowWidth > 639) {
			var headerH = 60;
		}else if(windowWidth < 640) {
			var headerH = 60;
			var url = e.target.href;
			var hash = url.substring(url.indexOf("#")+1);
			$('html, body').animate({
				scrollTop: $('#'+hash).offset().top - headerH
			}, 500);
			return false;
		}
	});
	$(".goTop").on('click',function() {
		$('html, body').animate({scrollTop:0}, 1500);
		return false;
	});
});


