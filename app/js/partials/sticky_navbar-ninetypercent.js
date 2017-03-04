$(document).ready(function(){
  
  // Even when the window is resized, run this code.
  $(window).resize(function(){
    
    // Variables
    var windowHeight = $(window).height();
    
    // Find the value of 90% of the viewport height
    var ninetypercent = 0.9 * windowHeight;
    
    // When the document is scrolled ninety percent, toggle the classes
    // Does not work in iOS 7 or below
    // Hasn't been tested in iOS 8
    $(document).scroll(function(){
      
      // Store the document scroll function in a variable
      var y = $(this).scrollTop();
      
      // If the document is scrolled 90%
      if( y > ninetypercent) {
        
        // Add the "sticky" class
        $('nav').addClass('sticky');
      } else {
        // Else remove it.
        $('nav').removeClass('sticky');
      }
    });

  // Call it on resize.
  }).resize();
  
}); // jQuery