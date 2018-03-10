var el;
var still;
var gifArr = ["batman","wonder woman"];

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
                var image = gif.images.downsized.url;
                console.log(gif);
                el = $('<div class="gif">' + '<img src="' + image + '">' + '</div>')
                still = gif.images.downsized_still.url;
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
    
    function getButtons() {
        $("#buttons-view").empty();
        for (var i=0; i<gifArr.length; i++) {
            var btn=$('<button>');
            btn.addClass("gif-btn btn btn-success");
            // btn.addClass("btn");
            // btn.addClass("btn-success");
            btn.attr("data-name", gifArr[i]);
            btn.text(gifArr[i]);
            $("#buttons-view").append(btn);
        }
    }

    $("#add-gif").on("click", function(event){
        event.preventDefault();
        var gifAdd = $("#gif-input").val().trim();
        gifArr.push(gifAdd);
        getButtons();
        console.log("added to array");
        $('#gif-input').empty();
    });
    
    $(document).on("click",".gif-btn", getGifs);
    console.log("when does this happen");

    getButtons();
    // getGifs(); 
    // toggleGif();  