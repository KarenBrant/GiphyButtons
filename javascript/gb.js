
var topics = ["batman","wonder woman"];

function getGifs() {
    var eachGif = $(this).attr("data-name");
    console.log("eachGif: " + eachGif);
    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=Fa70mFCWf8G52I9zVzhUHWRb20hnGjjM&limit=10&q=" + eachGif + "&rating=G";

    $.ajax( {
        url: queryURL,
        method: "GET"
      }).then(function(response) { 
          var gifs = response.data;
          console.log(gifs);
          $('#gifs').empty();
          for (var i=0; i<gifs.length;i++) {
                console.log("length: " + gifs.length);
                var gif = gifs[i];
                var animated = gif.images.downsized.url;
                var still = gif.images.downsized_still.url;
                var rating = gif.rating;
                // console.log(animated);
                var el = $('<div class="image" style="background-image: url(' + still + ')"></div>');
                var rate = $('<p id="rating" class="text-center">').text("Rating: " + rating);
                el.append(rate);
        
                el.data('active', false);
                el.data('still', still);
                el.data('animated', animated);
                $('#gifs').append(el);
            }  
        });
    }
    
    function toggleGif() {
        console.log("toggleGif");
        if ($(this).data('active')) {
            $(this).data('active', false);
            $(this).css('background-image', 'url(' +$(this).data("still") + ')');
        } else {
            $(this).data('active', true);
            $(this).css('background-image', 'url(' +$(this).data("animated") + ')');
        }
    }
    $(document).on('click', '.image', toggleGif);
    
    function getButtons() {
        $("#buttons-view").empty();
        for (var i=0; i<topics.length; i++) {
            var btn=$('<button>');
            btn.addClass("gif-btn btn btn-primary");
            // btn.addClass("btn");
            // btn.addClass("btn-success");
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            $("#buttons-view").append(btn);
        }
    }

    $("#add-gif").on("click", function(event){
        event.preventDefault();
        var gifAdd = $("#gif-input").val().trim();
        topics.push(gifAdd);
        getButtons();
        console.log("added to array");
        // $('#gif-input').empty();
    });
    
    $(document).on("click",".gif-btn", getGifs);
    console.log("when does this happen");

    getButtons();
