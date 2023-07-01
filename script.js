// Fetch the movie data from the JSON file
fetch('bd.json')
  .then(response => response.json())
  .then(data => {
    const films = data.films;

    // Display the first movie's details
    const firstMovie = films[0];
    const movieDetails = document.querySelector('.movie-details');
    movieDetails.innerHTML = `
      <div class="poster">
        <img src="${firstMovie.poster}" alt="${firstMovie.title}">
      </div>
      <div class="details">
        <h2>${firstMovie.title}</h2>
        <p>Runtime: ${firstMovie.runtime} minutes</p>
        <p>Showtime: ${firstMovie.showtime}</p>
        <p>Available Tickets: ${firstMovie.capacity - firstMovie.tickets_sold}</p>
      </div>
    `;

    // Populate the movie menu
    const filmMenu = document.getElementById('films');
    films.forEach(film => {
      const li = document.createElement('li');
      li.classList.add('film', 'item');
      li.textContent = film.title;
      filmMenu.appendChild(li);
    });

    // Handle the "Buy Ticket" button click event
    const buyTicketButton = document.getElementById('buy-ticket');
    buyTicketButton.addEventListener('click', () => {
      const availableTickets = firstMovie.capacity - firstMovie.tickets_sold;
      if (availableTickets > 0) {
        // Decrease the number of available tickets and update the display
        firstMovie.tickets_sold++;
        movieDetails.querySelector('p:last-of-type').textContent = `Available Tickets: ${availableTickets - 1}`;
        alert('Ticket purchased successfully!');
      } else {
        alert('Sorry, the showing is sold out.');
      }
    });
  })
  .catch(error => {
    console.log('Error fetching movie data:', error);
  });
