// i declare all global variables
var search;
var albumId;

$("#submit").click(function(){ //when the button the search is pressed
      search = $('#search').val(); // i give input value to search
      searchAlbum(); //and run the function whit a search the album
      event.preventDefault();//when is submit this prevent the lost all the data

    });


var searchAlbum = function(){
      $("#detail").remove(); //remove the detail of the album
      $('#albums li:first-child').hide(); // hide first-child child how have the message of search album
      $('.no-albums').remove();//i delete the message of dont found album
      $('.results').remove();// and remove the results for begin another search
      search = $('#search').val();

      $.ajax({
              url: "https://api.spotify.com/v1/search?q=album:"+ search +"&type=album", //i make request of this album to spotify
              method: 'GET',
              dataType: 'json',
              success: function (data) {  //when the request is success

                      var albumHTML;            // i begin to declare all variables with the diferents routes of the values in the json file,
                      var album = data.albums.items;

                    $.each(album,function (index, value) { // and the loop  for give the values to HTML
                      var albumName = value.name;
                      var albumImage = value.images[0].url;
                      var artistName = value.artists[0].name;
                      var albumID = value.id;
                      var albumHref = value.external_urls.spotify;
                      albumHTML = '<li class="results"><div class="boxes"><div class="album-wrap"><img class="album-art" src="' + albumImage + '"><div class="overlay"></div><button class="spotify-button"><img src="images/spotify.png" class="spotify-button"><a href="'+ albumHref +'"></a></button></div>';
                      albumHTML +=  '<div class="album-title">' + albumName + '</div><div class="album-artist">' + artistName + '</div>';
                      albumHTML +=  '<img class="img-detail" alt="'+ albumID +'" src="images/detail.svg"></div></li>';

                      $('#albums').append(albumHTML); //i append HTML

                      });

                      if ($('#albums li').length > 1) { //if the search not give any result i put the message
                      }  else {
                        $('#albums').append("<li class='no-albums desc'><i class='material-icons icon-help'>help_outline</i>No albums found that match: " + search + ".</li>");
                      }

                      // aqui img-detai
                      $('.img-detail').click(function( event ) { //if the user click in the botton for more detail we run the other request by ID
                              detailAlbum();

                            });
                          }
                      });
                  };

                      var detailAlbum = function(){
                      $('#albums li').hide();         // i hide the results of the search
                      targetID = ($(event.target).attr('alt')); //i give to albumID in ALT ATTR in the image to targetID
                      $.ajax({
                              url: "https://api.spotify.com/v1/albums/"+ targetID +"", //with the ID i make request of this specific album
                              method: 'GET',
                              dataType: 'json',
                              success: function (detail) {   //i declare again diferents values of json file and i use in the HTML
                                      var albumName = detail.name;
                                      var albumImage = detail.images[0].url;
                                      var artistName = detail.artists[0].name;
                                      var year = detail.release_date;
                                          year =year.slice(0, 4);
                                      var detailHTML ='<div id="detail"><div class="layer"><button id="back-main">< Search results</button><img class="album-image" src="' + albumImage + '"></div>';
                                          detailHTML  +='<h4 class="album-name">'+ albumName +  '<span class="year"> (' + year + ') </span></h4><h5 class="artist-title">'+ artistName +'</h5><ul class="track-list">Track List</ul></div>';
                                          $('.main-content').append(detailHTML);
                                              $.each(detail.tracks.items,function (index, value) { // loop for add all tracks to HTML
                                              $('.track-list').append('<li class="track">'+ index +' . '+ value.name + '</li>');
                                              });

                                              $('#back-main').click(function(){ //if the button of search result is pressed the user come back to the main search
                                                searchAlbum();
                                              });
                                            }
                                          });

                                        };
