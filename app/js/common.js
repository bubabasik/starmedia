// SLIDER
var slider = (function(){
	// private
	
	return{
		init: function(){
				
			var
				slider = $('#slider'),
				cont = slider.find('.slider-container'),
				width = cont.outerWidth(),
				list = slider.find('.slider-list'),
				items = list.find('li'),
				speed = 500,
				reqPos = 0;

			cont.append('<div class="slider-controls"><a href="#" class="slider-button slider-next">Next</a><a href="#" class="slider-button slider-prev">Prev</a></div>')
			items.addClass('slider-item');
			items.first().clone().prependTo(list).addClass('slider-item no-slide');
			items.last().clone().appendTo(list).addClass('slider-item no-slide');
			items.first().addClass('active');
			$('.slider-item').css('width',width);
			list.css('margin-left','-' + width + 'px');
			
			$('.slider-item').css('width',width);
			$(window).resize(function(){
				width = cont.outerWidth();
				reqPos = items.filter('.active').index()  * width;
				list.css('margin-left','-' + reqPos + 'px');
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

// VALIDATE FORM
$.valid = function(el){
		var
			rule = el.attr('data-rule'),
			val = el.val();
		switch(rule){

			case 'name':
				var rv_name = /^[a-zA-Zа-яА-Я]+$/;

				if(val.length > 2 && val != '' && rv_name.test(val)){
					el.removeClass('f_Error');
				}else{
					el.addClass('f_Error');
				}
				break;

			case 'email':
				var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
				if(val != '' && rv_email.test(val)){
					el.removeClass('f_Error');
				}else{
					el.addClass('f_Error');
				}
				break;

			case 'phone':
				var rv_phone = /^([0-9+()-])+$/;
				if(val.length > 6 && val != '' && rv_phone.test(val)){
					el.removeClass('f_Error');
				}else{
					el.addClass('f_Error');
				}
				break;
		}
	};
// # VALIDATE FORM

$(document).ready(function(){
	
	// scroll to ancor
	$('.goTo').click(function(){
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top}, 800);
		return false;
	});

	slider.init();

	$('.modal').click(function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		$('#overlay').fadeIn(400,
			function(){ 
				$(href) 
				.css('display', 'block')
				.animate({opacity: 1, top: '20%'}, 200);
			});
	});
	$('.modal-close, #overlay').click( function(){
		$('.modal-cont')
		.animate({opacity: 0, top: '15%'}, 200, 
			function(){
				$(this).css('display', 'none'); 
				$('#overlay').fadeOut(400); 
			}
		);
	});

	// validate inputs
	$('input[type="text"]').unbind().blur( function(){
		$.valid($(this));
	});

	$('#form-order').submit(function(e){
		e.preventDefault();
		$.valid($(this).find('.f_Text'));
		if($(this).find('.f_Error').length == 0){
			var form_data = $(this).serialize();
			$.ajax({
				type: "POST", //Метод отправки
				url: "./send.php", //путь до php фаила отправителя
				data: form_data,
				success: function() {
					$('#overlay').fadeIn(400,
						function(){ 
							$('#modal-thank') 
							.css('display', 'block')
							.animate({opacity: 1, top: '20%'}, 200);
						});
				}
			});
		}
	});

});

