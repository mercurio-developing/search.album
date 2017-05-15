var search;
var needId
var albumId



var searchAlbum = function(){
  search = $('#search').val();
  $.ajax({
          url: "https://api.spotify.com/v1/search?q=album:"+ search +"&type=album",
          method: 'GET',
          dataType: 'json',
          success: function (data) {

                  var albumHTML;
                  var album = data.albums.items;

                $.each(album,function (index, value) {
                  var albumName = value.name;
                  var albumImage = value.images[0].url;
                  var artistName = value.artists[0].name;

                  albumHTML = '<li class="results"><div class="boxes"><div class="album-wrap"><img class="album-art" src="' + albumImage + '"></div>';
                  albumHTML +=  '<div class="album-title">' + albumName + '</div><div class="album-artist">' + artistName + '</div>';
                  albumHTML +=  '<img class="img-detail" src="images/detail.svg"></div></li>'

                  $('#albums').append(albumHTML);

                  });

                  if ($('#albums li').length > 1) {
                  }  else {
                    $('#albums').append("<li class='no-albums desc'><i class='material-icons icon-help'>help_outline</i>No albums found that match: " + search + ".</li>");
                  }
                  albumDetail();

                  // aqui img-detai

              }
            });
          };

          var albumDetail = function(){

                $('.img-detail').click(function( event ) {

                            $('#albums li').hide();

                            var ascendente = $(event.target).parents('div').get(0);
                            var artistName = ($(ascendente).find('.album-artist').text());
                            var albumName = ($(ascendente).find('.album-title').text());
                            var albumImage;
                              console.log(albumName);
                              console.log(artistName);
                                    var searchAlbum = albumName
                                    console.log(searchAlbum)
                                    $.ajax({
                                            url: "https://api.spotify.com/v1/search?q=album:"+ searchAlbum +"&type=album",
                                            method: 'GET',
                                            dataType: 'json',
                                            success: function (detail) {
                                                    var albumHTML;
                                                    var albumName = detail.albums.items[0].name
                                                    var albumImage = detail.albums.items[0].images[0].url;
                                                    var artistName = detail.albums.items[0].artists[0].name;
                                                    var detailHTML ='<div id="detail"><div class="layer"><button id="back-main"> < Search results</button><img class="album-image" src="' + albumImage + '"></div>'
                                                        detailHTML  +='<h4 class="album-name">'+ albumName +  '</h4><h5 class="artist-title">'+ artistName +'</h5><ul class="track-list">Track List</ul></div>'
                                                        $('.main-content').append(detailHTML);
                                                      var albumID = detail.albums.items[0].id;
                                                      console.log(albumID);


                                                                       }
                                                                      });
                                                                    });
                                                                     $.ajax({
                                                                             url: "https://api.spotify.com/v1/albums/"+ albumId +"",
                                                                             method: 'GET',
                                                                             dataType: 'json',
                                                                             success: function (data) {
                                                                                       console.log(albumId)

                                                                                       var year = data.release_date;
                                                                                       var year = year.slice(0, 4);
                                                                                       $('h4').append('<span class="year"> (' + year + ') </span>');
                                                                                       console.log(data.tracks.items[0].name)
                                                                                           $.each(data.tracks.items,function (index, value) {
                                                                                           $('.track-list').append('<li class="track">'+ index +' . '+ value.name + '</li>');
                                                                                           console.log(albumID);

                                                                                       });
                                                                                     }
                                                                                   });
                                                                                 };


                                                                  $("#submit").click(function(){
                                                                        var search = $('#search').val();
                                                                        $('#albums li:first-child').hide();
                                                                        $('.no-albums').remove();
                                                                        $('.results').remove();
                                                                        searchAlbum();
                                                                        albumDetail();
                                                                    event.preventDefault();

                                                                    });
