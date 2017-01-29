// SLIDER
var slider = (function(){
	// private
	
	return{
		init: function(){
				
			var
				slider = $('#slider'),
				width = slider.find('.slider-container').outerWidth(),
				list = slider.find('.slider-list'),
				items = list.find('li'),
				speed = 500;


			items.addClass('slider-item');
			items.first().clone().prependTo(list).addClass('slider-item no-slide');
			items.last().clone().appendTo(list).addClass('slider-item no-slide');
			items.first().addClass('active');
			$('.slider-item').css('width',width);
			list.css('margin-left','-' + width + 'px');
			
			$('.slider-item').css('width',width);
			$(window).resize(function(){
				$('.slider-item').css('width',width);
			})


			$('.slider-button').click(function(e){
				e.preventDefault();
				var 
					activeItem = items.filter('.active'),
					nextItem = activeItem.next(),
					prevItem = activeItem.prev(),
					firstItem = items.first(),
					lastItem = items.last();


				if($(this).hasClass('slider-next')){
					if(activeItem.index() == lastItem.index()){return false;}
					nextItem.addClass('active').siblings().removeClass('active');
					list.animate({marginLeft: '-=' + width + 'px'},speed);
				}else{
					if(activeItem.index() == firstItem.index()){return false;}
					prevItem.addClass('active').siblings().removeClass('active');
					list.animate({marginLeft: '+=' + width + 'px'},speed);
				}
				
			})
		}
	}

}());
// # SLIDER

$(document).ready(function(){
	
	// scroll to ancor
	$('.goTo').click(function(){
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top}, 800);
		return false;
	});

	slider.init();
	
});

