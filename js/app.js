// I declare all global variables
var search;
var albumId;

$("#submit").click(function(){ //when the search button is pressed
      search = $('#search').val(); // I give the input value to search
      searchAlbum(); //the function runs
      event.preventDefault();//prevents data from being lost when submitted

    });


var searchAlbum = function(){
      $("#detail").remove(); //remove the album detail
      $('#albums li:first-child').hide(); // hide the first-child
      $('.no-albums').remove();//I delete the "no album found" message
      $('.results').remove();// and remove the results to begin another search
      search = $('#search').val();

      $.ajax({
              url: "https://api.spotify.com/v1/search?q=album:"+ search +"&type=album", //I request this album from spotify
              method: 'GET',
              dataType: 'json',
              success: function (data) {  //when the request is successful

                      var albumHTML;            // I begin to declare all variables with different value routes in the json file,
                      var album = data.albums.items;

                    $.each(album,function (index, value) { // and the loop gives the values to HTML
                      var albumName = value.name;
                      var albumImage = value.images[0].url;
                      var artistName = value.artists[0].name;
                      var albumID = value.id;
                      var albumHref = value.external_urls.spotify;
                      albumHTML = '<li class="results"><div class="boxes"><div class="album-wrap"><img class="album-art" src="' + albumImage + '"><div class="overlay"></div><button class="spotify-button"><img src="images/spotify.png" class="spotify-button"><a href="'+ albumHref +'"></a></button></div>';
                      albumHTML +=  '<div class="album-title">' + albumName + '</div><div class="album-artist">' + artistName + '</div>';
                      albumHTML +=  '<img class="img-detail" alt="'+ albumID +'" src="images/detail.svg"></div></li>';

                      $('#albums').append(albumHTML); //I append HTML

                      });

                      if ($('#albums li').length > 1) { //I put the message if the search has no results
                      }  else {
                        $('#albums').append("<li class='no-albums desc'><i class='material-icons icon-help'>help_outline</i>No albums found that match: " + search + ".</li>");
                      }

                      // aqui img-detai
                      $('.img-detail').click(function( event ) { //if the user clicks the botton for more detail we run the other request by ID
                              detailAlbum();

                            });
                          }
                      });
                  };

                      var detailAlbum = function(){
                      $('#albums li').hide();         // I hide the results of the search
                      targetID = ($(event.target).attr('alt')); //I give albumID to ALT ATTR in the image of targetID
                      $.ajax({
                              url: "https://api.spotify.com/v1/albums/"+ targetID +"", //with the ID I request this specific album
                              method: 'GET',
                              dataType: 'json',
                              success: function (detail) {   //I declare again diferents values of json file and use these in the HTML
                                      var albumName = detail.name;
                                      var albumImage = detail.images[0].url;
                                      var artistName = detail.artists[0].name;
                                      var year = detail.release_date;
                                          year =year.slice(0, 4);
                                      var detailHTML ='<div id="detail"><div class="layer"><button id="back-main">< Search results</button><img class="album-image" src="' + albumImage + '"></div>';
                                          detailHTML  +='<h4 class="album-name">'+ albumName +  '<span class="year"> (' + year + ') </span><h5 class="artist-title">'+ artistName +'</h5></h4><ul class="track-list">Track List</ul></div>';
                                          $('.main-content').append(detailHTML);
                                              $.each(detail.tracks.items,function (index, value) { // loop for add all tracks to HTML
                                              $('.track-list').append('<li class="track">'+ index +' . '+ value.name + '</li>');
                                              });

                                              $('#back-main').click(function(){ //if the user presses "search results" button they return
                                                searchAlbum();
                                              });
                                            }
                                          });

                                        };
