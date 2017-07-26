/*
 * Petrichor
 * (c) 2013, Web factory Ltd
 */

$(function() {
  // flex slider
  if ($('.flexslider').length) {
    $('.flexslider').flexslider({
      animation: "slide",
      directionNav: true,
      controlNav: false,
      pauseOnAction: true,
      pauseOnHover: true,
      direction: "horizontal",
      slideshowSpeed: 5500
    });
  }

  // blockquote rotator
  $('section blockquote').quovolver(500, 6000);

  // Twitter feed
  if ($('#tweet').length) {
    $('#tweet').tweet({
            username: 'rainingfm',
            join_text: 'auto',
            avatar_size: 32,
            count:1,
            auto_join_text_default: ' we said, ',
            auto_join_text_ed: ' we ',
            auto_join_text_ing: ' we were ',
            auto_join_text_reply: ' we replied to ',
            auto_join_text_url: ' from rainingfm on twitter ',
            loading_text: 'Loading tweets...'
        });
  };
  
}); // onload

// Sharrre Social Count
$(function() {
    //the top count only
    $('#rfmshare').sharrre({
    shorterTotal: true,
    enableHover: false,
    share: {
    googlePlus: true,
    facebook: true,
    twitter: true
    },
    buttons: {
    googlePlus: {size: 'tall', annotation:'bubble'},
    facebook: {layout: 'box_count'},
    twitter: {count: 'vertical', via: 'rainingfm'}
    },
    enableTracking: true
    });

    //the base count only
    /*
    $('#rfmshare2').sharrre({
    shorterTotal: true,
    enableHover: false,
    share: {
    googlePlus: true,
    facebook: true,
    twitter: true
    },
    buttons: {
    googlePlus: {size: 'tall', annotation:'bubble'},
    facebook: {layout: 'box_count'},
    twitter: {count: 'vertical', via: 'rainingfm'}
    },
    enableTracking: true
    });
    */
    $('#rfmshare2').sharrre({
      share: {
        twitter: true,
        facebook: true,
        googlePlus: true
      },
      template: '<div class="rfmsharebox"><div class="left">{total}</div><div class="networks"><a href="#" class="facebook">f</a><a href="#" class="twitter">t</a><a href="#" class="googleplus">+1</a></div></div>',
      enableHover: false,
      enableTracking: true,
      render: function(api, options){
      $(api.element).on('click', '.twitter', function() {
        api.openPopup('twitter');
      });
      $(api.element).on('click', '.facebook', function() {
        api.openPopup('facebook');
      });
      $(api.element).on('click', '.googleplus', function() {
        api.openPopup('googlePlus');
      });
    }
    });

    //the base buttons
    $('#rfmshare3').sharrre({
    share: {
    googlePlus: true,
    facebook: true,
    twitter: true
    },
    buttons: {
    googlePlus: {size: 'tall', annotation:'bubble'},
    facebook: {layout: 'box_count'},
    twitter: {count: 'vertical', via: 'rainingfm'}
    },
    shorterTotal: false,
    enableHover: false,
    enableCounter: false,
    enableTracking: true
    });

}); // onload
