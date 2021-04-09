var faces = [];

$('.search').on('click', function() {
  var sha = $('#search-query').val();
  
  $('#search-query').val('');

  fetch(sha);
});

var addFace = function (data) {

  faces.push({
    login: data.author.login,
    avatar_url: data.author.avatar_url
  });

  renderFaces();
}

var fetch = function (sha) {
  $.ajax({
    method: 'GET',
    url: 'https://api.github.com/repos/facebook/react/commits/' + sha,
    dataType: 'json',
    success: function (data) {
      addFace(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  })
}

var renderFaces = function () {
  $('.faces').empty();

  for (let i = 0; i < faces.length; i++) {
    const face = faces[i];

    var source = $('#face-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(face);

    $('.faces').append(newHTML);
  }
}

