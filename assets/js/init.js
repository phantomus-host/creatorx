/*
	CreatorX - a photography theme by Phantomus
	phantomus.com | @phantomus_host
*/

(function($) {

	var settings = {
		fullScreen: true,
		fadeInSpeed: 1000
	};

	skel.init({
		reset: 'full',
		breakpoints: {
			'max': { range: '*', href: '/assets/css/style.css', containers: 1440, viewport: { scalable: false }, grid: { gutters: 40 } },
			'wide': { range: '-1920', href: '/assets/css/style-wide.css', containers: 1360 },
			'normal': { range: '-1680', href: '/assets/css/style-normal.css', containers: 1200 },
			'narrow': { range: '-1280', href: '/assets/css/style-narrow.css', containers: 960 },
			'narrower': { range: '-1000', href: '/assets/css/style-narrower.css', containers: '95%' },
			'mobile': { range: '-736', href: '/assets/css/style-mobile.css', grid: { gutters: 20 } },
			'mobile-narrow': { range: '-480', grid: { collapse: true, gutters: 10 } }
		}
	});
	
	$(function() {
	
		$("#mobile-menu").mmenu({
			offCanvas : {
				position	: "right",
				zposition	: "front"
			}
		});

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$all = $body.add($header),
			sectionTransitionState = false;

			if (skel.vars.isTouch) {
				$body.addClass('touch');
			}

			$all.addClass('is-loading').fadeTo(0, 0.0001);
			$window.load(function() {
				window.setTimeout(function() {
					$all.fadeTo(settings.fadeInSpeed, 1, function() {
						$all.removeClass('is-loading');
						$all.fadeTo(0, 1);
					});
				}, settings.fadeInSpeed);
			});

			skel.change(function() {
				
				if (skel.isActive('mobile'))
					$body.addClass('touch');
				else if (!skel.vars.isTouch)
					$body.removeClass('touch');
				
			});

			var resizeTimeout;
				
			$window.resize(function() {
				$body.addClass('is-loading');
				clearTimeout(resizeTimeout);
				resizeTimeout = window.setTimeout(function() {
				
					if (settings.fullScreen && !skel.isActive('mobile')) {
						$('.fullscreen').each(function() {								
							var $t = $(this),
								$c = $t.children('.content'),
								x = Math.max(100, Math.round(($window.height() - $c.outerHeight() - $header.outerHeight()) / 2) + 1);
								$t.css('padding-top', x).css('padding-bottom', x);
						});
					} else {
						$('.fullscreen').css('padding-top', '').css('padding-bottom', '');
					}
					
					$('.post-cover-image').each(function() {
						var $t = $(this), 
							$c = $t.children('.content'), 
							wheight = $window.height();
						$t.css('height', wheight + 'px');
						$header.css('margin-bottom', (wheight - $header.outerHeight() - 32) + 'px');
						var x =  Math.round((wheight - $c.height()) / 2) + 1;
						$c.css('padding-top', x).css('padding-bottom', x);
					});
					
					$all.removeClass('is-loading');
						
				}, 100);

			});
			
			$('.home-image').click(function(e) {
				e.preventDefault();
				window.location.href = $(this).data('url');
			});
			
			$('.author-lnk').click(function(e) {
				e.stopPropagation();
			});
			
			var addAlignClass = null, prevElement = null;
			$('.post-content > p').each(function() {
				var $p = $(this);
				if ($p.children('img').length > 0) {
					$p.addClass('img');
					var i = $p.children().first()[0], alt = $(i).attr('alt');
					
					function addCaption() {
						if ($.trim(alt).length > 0) {
							$('<span class="caption">' + $.trim(alt) + '</span>').insertAfter($(i));
						}
					}
					
					if (addAlignClass && prevElement) {
						prevElement.removeClass('right-image').addClass('left-image').addClass('left-as-image');
						alt = alt.replace('left|','').replace('right|','');
						$(i).attr('alt', alt);
						$p.addClass('right-as-image');
						addCaption();
						$('<p class="clear"></p>').insertAfter($p);
						addAlignClass = null;
						prevElement = null;
						return;
					}
					
					if (alt.indexOf('left|') !== -1) {
						$p.addClass('left-image');
						$(i).attr('alt', alt.replace('left|',''));
						addAlignClass = 'left-image-desc';
					} else if (alt.indexOf('right|') !== -1) {
						$p.addClass('right-image');
						$(i).attr('alt', alt.replace('right|',''));
						addAlignClass = 'right-image-desc';
					}
					
					alt = $(i).attr('alt');
					addCaption();
					prevElement = $p;
					
				} else {
					if (addAlignClass) {
						$p.addClass(addAlignClass);
						$('<p class="clear"></p>').insertAfter($p);
						addAlignClass = null;
						prevElement = null;
					}
				}
			});
				
			$window.load(function() {
				$window
					.trigger('resize')
					.trigger('scroll');
			
			});

	});
	
})(jQuery);