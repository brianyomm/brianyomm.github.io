// (function($) {
//     "use strict"; // Start of use strict
//     // add page-scroll
//     $('page-scroll').bind('click', function(event) {
//         var $anchor = $(this);
//         $('html, body').stop().animate({
//             scrollTop: ($($anchor.attr('href')).offset().top - 50)
//         }, 1250, 'easeInOutExpo');
//         event.preventDefault();
//     });
// })(jQuery); // End of use strict


// add smooth scrolling
// $(function() {
// $('a[href*=#]:not([href=#])').click(function() {
//   if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

//     var target = $(this.hash);
//     target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//     if (target.length) {
//       $('html,body').animate({
//         scrollTop: target.offset().top
//       }, 1000);
//       return false;
//     }
//   }
// });
// });

// add fadeIn
$(window).on("load",function() {
    function fade() {
        $('.fade').each(function() {
            /* Check the location of each desired element */

            var objectBottom = $(this).offset().top + $(this).outerHeight();
            var windowBottom = $(window).scrollTop() + $(window).innerHeight();

            /* If the object is completely visible in the window, fade it in */
            if (objectBottom < windowBottom) { //object comes into view (scrolling down)
                if ($(this).css('opacity')==0) {$(this).stop(true,true).fadeTo("fast",1);}
            } else { //object goes out of view (scrolling up)
                if ($(this).css('opacity')==1) {$(this).stop(true,true).fadeTo("fast",0);}
            }
        });
    }
    fade(); //Fade in completely visible elements during page-load
    $(window).scroll(function() {fade();}); //Fade in elements during scroll
});


// add button show more content
function toggler(divId) {
    $("#" + divId).toggle();
}

// Set up an event listener for the contact form.
$(form).submit(function(event) {
    // Stop the browser from submitting the form.
    event.preventDefault();

    // TODO
});

// Serialize the form data.
var formData = $(form).serialize();

// add google maps ()
$(document).ready(function (){

  // create a LatLng object containing the coordinate for the center of the map
  var latlng = new google.maps.LatLng(40.856057, -73.977883);

  // prepare the map properties
  var options = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    navigationControl: true,
    mapTypeControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  };

  // initialize the map object
  var map = new google.maps.Map(document.getElementById('google_map'), options);

  // add Marker
  var marker1 = new google.maps.Marker({
    position: latlng, map: map
  });

  // add listener for a click on the pin
  google.maps.event.addListener(marker1, 'click', function() {
    infowindow.open(map, marker1);
  });

  // add information window
  var infowindow = new google.maps.InfoWindow({
    content:  '<div class="info"><strong>This is my company</strong><br><br>My company address is here<br> 32846 Sydney</div>'
  });  
});

	
