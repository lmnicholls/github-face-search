var users = [
  
];

$('.search').on('click', function () {
  var search = $('#search-query').val();
  
  fetch(search);
});

var addUser = function (data) {
  var search = $('#search-query').val();
  
  data.forEach(commit => {
    if (commit.sha === search) {
      var user = {
        login: commit.author.login ? commit.author.login : null,
        avatar_url: commit.author.avatar_url ? commit.author.avatar_url : null,
      };
      users.push(user);
    }    
  });

  renderUsers();
  $('form :input').val('');
};

var fetch = function (query) {
  $.ajax({
    method: "GET",
    url: "https://api.github.com/repos/facebook/react/commits",
    dataType: "json",
    success: function(data) {
      addUser(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

var renderUsers = function () {
  $('.results').empty();

  for (var i = 0; i < users.length; i++) {
    var source = $('#github-face-search-template').html();
    var template = Handlebars.compile(source);
    var newUser = template(users[i]);
    $('.results').append(newUser);
  }
};

