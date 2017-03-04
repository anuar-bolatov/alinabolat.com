$(document).ready(function(){
	var position = $('#page-top').offset();

	$(document).scroll(function() {

		var y = $(this).scrollTop();

	    if (y > position.top) {
	        $('nav').addClass('sticky');
	    } else {
	        $('nav').removeClass('sticky');
	    }
	});
});