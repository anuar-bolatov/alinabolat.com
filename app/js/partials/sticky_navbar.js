$(document).ready(function(){

	$(window).resize(function() {

		var position = $('nav').offset();

		$(document).scroll(function(){
			
			var y = $(this).scrollTop();

		    if (y > position.top) {
		        $('nav').addClass('sticky');
		    } else {
		        $('nav').removeClass('sticky');
		    }
		});

	// Call it on resize.
	}).resize();
}); // jQuery