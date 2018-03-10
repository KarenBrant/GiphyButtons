var el;
function getGifs() {
    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=Fa70mFCWf8G52I9zVzhUHWRb20hnGjjM&limit=10&q=batman&rating=G";

    $.ajax( {
        url: queryURL,
        method: "GET"
      }).then(function(response) { 
          var gifs = response.data;
          console.log(gifs);
          for (var i=0; i<gifs.length;i++) {
            //   $('#gifs').append('<div class="gif">' + '<img src="' + gifs[i].images.downsized.url + '">' + '</div>')
                var gif = gifs[i];
                var image = gif.images.downsized.url;
                el = $('<div class="gif">' + '<img src="' + image + '">' + '</div>')
                var still = gif.images.downsized_still.url;
                $('#gifs').append(el);
                
            }  
        });
    }
    
    function toggleGif() {
        console.log("toggleGif");
        el.data('active', false);
        el.data('still', still);
        el.data('animated', animated);
        $(document).on('click', '.image', toggleGif);
            if ((this).data('active')) {
                $(this).data('active', false);
                $(this).css('background-image', 'url(' +$(this).data("still") + ')');
            } else {
                $(this).data('active', true);
                $(this).css('background-image', 'url(' +$(this).data("animated") + ')');
            }
    }
    getGifs(); 
    toggleGif();  