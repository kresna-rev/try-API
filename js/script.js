function teangFilem(argument) {
  $('#movie-list').empty()
  $.ajax({
    url: 'http://www.omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': 'b0f26f38',
      's': $('#search-input').val()
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search
        
        $.each(movies, function(i, data) {
          $('#movie-list').append(`
          <div class="col-md-4">
            <div class="card m-2">
              <img src="${data.Poster}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">tahun: ${data.Year}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Tipe: ${data.Type}</h6>
                <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
              </div>
            </div>
          </div>
          `)
        })
        
        $('#search-input').val('')
      } else {
        $('#movie-list').html('<h2 class="text-center">Sayangnya film yang abang cari ga ada Bang :\'\(</h2>')
      }
    }
  })
}

$('#search-btn').on('click', function() {
  teangFilem()
})

$('#search-input').on('keyup', function(e){
  if (e.which === 13) {
    teangFilem()
  }
})

$('#movie-list').on('click', '.see-detail', function() {
  $.ajax({
    url: 'http://www.omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': 'b0f26f38',
      'i': $(this).data('id')
    },
    success: function (film) {
      if (film.Response === "True") {
        $('#modal-title').html(`Detail`)
        $('.modal-body').html(`
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4 mb-2">
              <img src="${film.Poster}" class="img-fluid"/>
            </div>
            
            <div class="col-md-8">
              <ul class="list-group list-group-flush">
                <li class="list-group-item h3">${film.Title}</li>
                <li class="list-group-item">Genre: ${film.Genre}</li>
                <li class="list-group-item">Released on: ${film.Released}</li>
                <li class="list-group-item">Writer: ${film.Writer}</li>
                <li class="list-group-item">Director: ${film.Director}</li>
                <li class="list-group-item">Actors: ${film.Actors}</li>
                <li class="list-group-item">Awards: ${film.Awards}</li>
                <li class="list-group-item">Rating: ✩ ${film.imdbRating} / 10</li>
                <li class="list-group-item">Country: ${film.Country}</li>
                <li class="list-group-item">Type: ${film.Type}</li>
                <li class="list-group-item">Plot: ${film.Plot}</li>
              </ul>
            </div>
          </div>
        </div>
        `)
      }
    }
  })
})