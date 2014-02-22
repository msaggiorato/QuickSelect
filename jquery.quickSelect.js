(function($){
	$.fn.onResize = function(callback){
		return $(this).each(function(){
			var thisObj = this;
			var thisElem = $(thisObj);
			var resetTimer;
			var check;
			var timer;

			var lastWidth = thisElem.width(),
				lastHeight = thisElem.height();

			check = function(){
				if(thisElem.width() != lastWidth || thisElem.height() != lastHeight){
					lastWidth = thisElem.width(),
					lastHeight = thisElem.height();
					callback.call(thisObj);
				}
			}

			timer = setInterval(check, 50);
			$(window).resize(function(){
				check();
				clearInterval(timer);
				timer = setInterval(check, 50);
			});
		});
	}
	$.fn.QuickSelect = function(options){
		options = $.extend(true, {
			iconUp: "&#9650;",
			iconDown: "&#9660;",
			minElemsBeforeGoingUp: 3
		}, options);
		$(this).filter("select").each(function(){
			var thisElem = $(this);

			if(typeof thisElem.data("qs-initialized") !== "undefined") return;
			thisElem.data("qs-initialized", true);

			thisElem.hide();
			var main = $("<div class='qs'>").insertAfter(thisElem);
			var fixed = $("<div class='qs-fixed'>").appendTo(main);
			var dropdown = $("<div class='qs-dropdown'>").hide().appendTo(main);

			//var viewportArrow = $("<table class='qs-viewport-arrow' cellspacing='0' cellpadding='0'><tr><td class='qs-viewport-container'><div class='qs-viewport-sub-cont'><div class='qs-viewport'></div></div></td><td class='qs-arrow'></td></tr></table>").appendTo(fixed);
			var viewportArrow = $("<div class='qs-viewport-arrow'><div class='qs-arrow'></div><div class='qs-viewport-container'><div class='qs-viewport'></div><div class='qs-shadow-viewport'></div></div></div>").appendTo(fixed);
			var viewport = viewportArrow.find(".qs-viewport");
			var arrow = viewportArrow.find(".qs-arrow");
			var viewportContainer = viewportArrow.find(".qs-viewport-container");
			var shadowViewport = viewportArrow.find(".qs-shadow-viewport");

			
			var adjustViewport = function(){
				viewportContainer.css({
					marginRight: arrow.outerWidth(true)+"px"
				});
			}

			adjustViewport();

			arrow.html(options.iconDown);

			var thisOptions = thisElem.children('option');


			var getText = function(option){
				var text = option.text();
				if(text.length == 0) text = "&nbsp;";
				return text;
			}
			var getSelected = function(){
				var selected = thisOptions.filter(function(){
					return $(this).prop("selected") === true;
				});
				if(selected.length === 0){
					selected = thisOptions.first().prop("selected", true);
				}
				return selected;
			}
			var setSelected = function(opt, trigger){
				if(typeof trigger === "undefined") trigger = true;
				
				thisOptions.each(function(){
					if($(this).is(opt)){
						if($(this).prop("selected") === true) trigger = false;
						$(this).prop("selected", true);
						$(this).data("qs-mirror").addClass('selected').siblings().removeClass('selected');
						viewport.html(getText(opt));
					} else {
						$(this).prop("selected", false);
					}
				});
				
				if(trigger) thisElem.trigger("change", [true]);
			}
			var testSelected = function(text){
				var oldW = viewport.width();
				var oldText = viewport.html();
				viewport.css("width", "");
				viewport.html(text);
				if(oldW < viewport.width()) {
					viewport.width(viewport.width());
				} else {
					viewport.width(oldW);
				}
				viewport.html(oldText);
			}
			var setHover = function(option){
				option.addClass('hover').siblings().removeClass('hover');
			}

			var getFirstOptionsHeight = function(){
				var height = 0;
				dropdown.children(".qs-option").slice( 0, options.minElemsBeforeGoingUp ).each(function(){
					height += $(this).outerHeight(true);
				});
				return height;
			}

			var heightAsManyOptionsAsPossible = function(heightAvailable){
				var height = 0;
				dropdown.children(".qs-option").each(function(){
					var thisHeight = $(this).outerHeight(true);
					if(thisHeight + height < heightAvailable){
						height += thisHeight;
					}
				});
				return height;
			}

			var checkSize = function(){
				
				var viewportHeight = $(window).height();
				var offset = main.offset();
				var scrollTop = $(window).scrollTop();
				var height = main.height();

				var spaceBelow = viewportHeight - offset.top - height + scrollTop;
				var spaceAbove = offset.top - scrollTop;

				main.removeClass('open-above');
				if(dropdown.is(":visible")){
					dropdown.css("max-height", "");
					var dropdownHeight = dropdown.outerHeight();
					if(dropdownHeight > spaceBelow) {
						var maxHeight = getFirstOptionsHeight();
						if(spaceBelow >= maxHeight || spaceBelow >= spaceAbove){
							dropdown.css("max-height", heightAsManyOptionsAsPossible(spaceBelow)+"px");
						} else if(spaceAbove > spaceBelow) {
							main.addClass('open-above');
							dropdown.css("max-height", heightAsManyOptionsAsPossible(spaceAbove)+"px");
						}
					}
				} else {
					if(150 > spaceBelow) {
						main.addClass('open-above');
					}
				}
			}

			var doDropdown = function(){
				if(dropdown.is(":visible")){
					hideDropdown();
				} else {
					setHover(getSelected().data("qs-mirror"));
					dropdown.show();

					checkSize();

					dropdown.hide();


					dropdown.fadeIn(100);
					main.addClass('opened');
				}
			}
			var hideDropdown = function(){
				dropdown.hide();
				main.removeClass('opened');
			}
			$(window).on("resize", function(){
				checkSize();
			});
			$(window).on("scroll", function(){
				checkSize();
			});
			fixed.on("click", function(){
				doDropdown();
			});

			//detect click outside
			$(document).on("click", function(e){
				var target = $(e.target);
				var matchingParents = target.parents().filter(function(){
					return $(this).is(main);
				}).length;
				if(!target.is(main) && matchingParents == 0){
					hideDropdown();
				}
			});

			thisOptions.each(function(){
				var thisOpt = $(this);
				var optVal = thisOpt.attr("value");
				var option = $("<div class='qs-option'>").appendTo(dropdown);
				var shadowViewportItem = $("<div class='qs-viewport'>").html(getText(thisOpt)).appendTo(shadowViewport);
				thisOpt.data("qs-mirror", option);

				option.html(getText(thisOpt));

				option.attr("data-value", optVal);
				option.data("value", optVal);

				option.on("mouseenter", function(){
					setHover($(this));
				});

				//testSelected(getText(thisOpt));

				if(thisOpt.prop("selected") === true){
					setSelected(thisOpt, false);
				}

				option.on("click", function(){
					setSelected(thisOpt);
					hideDropdown();
				});
			});

			thisElem.on("change", function(e, hasToIgnore){
				if(typeof hasToIgnore !== "undefined") return;
				setSelected(getSelected());
			});


			/*var adjust = function(){
				thisOptions.each(function(){
					testSelected(getText($(this)));
				});
				adjustViewport();
			};
			main.onResize(adjust);
			adjust();*/
			//setTimeout(adjust, 500);
			$(window).one("load", adjust);


		});
		return $(this);
	}
	$(function(){
		$("select.quick-select").QuickSelect();
	})
})(jQuery);
