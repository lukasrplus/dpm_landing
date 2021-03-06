// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require turbolinks
//= require photoswipe
//= require rotate
//= require_tree .










$(function() {


$(window).load(function(){
   function show_popup(){

    $('#box_pic1').fadeOut(5000);





   };
   window.setTimeout( show_popup, 1000 ); // 5 seconds
});





var angle = 0;
setInterval(function(){
angle+=1;
$(".brand-logo").rotate(angle);
},100);


// PHOTOSWIPE
var initPhotoSwipeFromDOM = function(gallerySelector) {

  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  var parseThumbnailElements = function(el) {
      var thumbElements = el.childNodes,
          numNodes = thumbElements.length,
          items = [],
          figureEl,
          childElements,
          linkEl,
          size,
          item;

      for(var i = 0; i < numNodes; i++) {


          figureEl = thumbElements[i]; // <figure> element

          // include only element nodes
          if(figureEl.nodeType !== 1) {
        continue;
          }

      linkEl = figureEl.children[0]; // <a> element

          size = linkEl.getAttribute('data-size').split('x');

          // create slide object
          item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
          };



          if(figureEl.children.length > 1) {
            // <figcaption> content
              item.title = figureEl.children[1].innerHTML;
          }

          if(linkEl.children.length > 0) {
            // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute('src');
          }

      item.el = figureEl; // save link to element for getThumbBoundsFn
          items.push(item);
      }

      return items;
  };

  // find nearest parent element
  var closest = function closest(el, fn) {
      return el && ( fn(el) ? el : closest(el.parentNode, fn) );
  };

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;

      var eTarget = e.target || e.srcElement;

      var clickedListItem = closest(eTarget, function(el) {
          return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });

      if(!clickedListItem) {
          return;
      }


      // find index of clicked item
      var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;

      for (var i = 0; i < numChildNodes; i++) {
          if(childNodes[i].nodeType !== 1) {
              continue;
          }

          if(childNodes[i] === clickedListItem) {
              index = nodeIndex;
              break;
          }
          nodeIndex++;
      }



      if(index >= 0) {
          openPhotoSwipe( index, clickedGallery );
      }
      return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function() {
    var hash = window.location.hash.substring(1),
      params = {};

      if(hash.length < 5) {
          return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
          if(!vars[i]) {
              continue;
          }
          var pair = vars[i].split('=');
          if(pair.length < 2) {
              continue;
          }
          params[pair[0]] = pair[1];
      }

      if(params.gid) {
        params.gid = parseInt(params.gid, 10);
      }

      if(!params.hasOwnProperty('pid')) {
          return params;
      }
      params.pid = parseInt(params.pid, 10);
      return params;
  };

  var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
          gallery,
          options,
          items;

    items = parseThumbnailElements(galleryElement);

      // define options (if needed)
      options = {
          index: index,

      // define gallery index (for URL)
          galleryUID: galleryElement.getAttribute('data-pswp-uid'),

          getThumbBoundsFn: function(index) {
              // See Options -> getThumbBoundsFn section of docs for more info
              var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                  pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                  boundingRect = thumbnail.getBoundingClientRect();

              var rect = {x:boundingRect.left, y:boundingRect.top + pageYScroll, w:boundingRect.width};
              var templateBounds = pswpElement.parentElement.getBoundingClientRect();
              rect.x -= templateBounds.left;
              rect.y -= templateBounds.top;


              return rect;
          },

          // history & focus options are disabled on CodePen
            // remove these lines in real life:
       history: false,
       focus: false,

       modal:false,
       closeOnScroll:false

      };

      if(disableAnimation) {
          options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.listen('updateScrollOffset', function(_offset) {
          var r = pswpElement.getBoundingClientRect();
          _offset.x += r.left;
          _offset.y += r.top;
      });
      gallery.init();
  };

  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll( gallerySelector );

  for(var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i+1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if(hashData.pid > 0 && hashData.gid > 0) {
    openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
  }
};

// execute above function
initPhotoSwipeFromDOM('.my-simple-gallery');

// PHOTOSWIPTE END


});
