// Array of 2 superheroes to start
var topics = ["batman","wonder woman"];

// Function to get the gifs to display
function getGifs() {
    var eachGif = $(this).attr("data-name");
    console.log("eachGif: " + eachGif);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Fa70mFCWf8G52I9zVzhUHWRb20hnGjjM&limit=10&q=" + eachGif + "&rating=G";

    $.ajax( {
        url: queryURL,
        method: "GET"
      }).then(function(response) { 
          var gifs = response.data;
          console.log(gifs);
          $('#gifs').empty();
          
        //  Loop through to get the gifs
          for (var i=0; i<gifs.length;i++) {
                var gif = gifs[i];
                // Create variables for animated gifs and still gifs
                var animated = gif.images.downsized.url;
                var still = gif.images.downsized_still.url;
                // Get the rating for each gif
                var rating = gif.rating;
                // Create the still gifs and add the rating to the html
                var el = $('<div class="image" style="background-image: url(' + still + ')"></div>');
                var rate = $('<p id="rating" class="text-center">').text("Rating: " + rating);
                el.append(rate);
                // Set the data attributes
                el.data('active', false);
                el.data('still', still);
                el.data('animated', animated);
                $('#gifs').append(el);
            }  
        });
    }

    // Function to toggle from animated to still with clicks
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

    // Check for clicks on the gifs
    $(document).on('click', '.image', toggleGif);
    
    // Function to create buttons for everything in the array
    function getButtons() {
        $("#buttons-view").empty();
        for (var i=0; i<topics.length; i++) {
            var btn=$('<button>');
            btn.addClass("gif-btn btn btn-primary");
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            $("#buttons-view").append(btn);
        }
    }

    // Function to add additional items to the array
    $("#add-gif").on("click", function(event){
        event.preventDefault();
        var gifAdd = $("#gif-input").val().trim();
        topics.push(gifAdd);
        getButtons();
        console.log("added to array");
    });
    
    // Check for button clicks to call the getGifs function
    $(document).on("click",".gif-btn", getGifs);
    console.log("when does this happen");

    // Call the getButtons function
    getButtons();
