document.addEventListener('DOMContentLoaded', () => {
    const artistasList = document.getElementById('artistasList');

    // Fetch artists from backend
    fetch('http://localhost:4000/artista')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(artists => {
            // Embaralhar artistas (Fisher-Yates)
            for (let i = artists.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [artists[i], artists[j]] = [artists[j], artists[i]];
            }

            // Limitar a 10 artistas
            const artistasExibir = artists.slice(0, 13);

            // Clear loading state (if any)
            artistasList.innerHTML = '';

            // Loop through artists and create <li> elements
            artistasExibir.forEach(artist => {
                const li = document.createElement('li');
                li.className = 'artistas-card';
                li.innerHTML = `
                    <figure 
                      style="background-image: url(${artist.avatar});" 
                      class="artistas-card-img">
                    </figure>
                    <p class="artistas-card-titulo">${artist.nome}</p>
                    <p class="artistas-card-subtitulo">Artista</p>
                `;
                artistasList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching artists:', error);
            artistasList.innerHTML = '<li>Error loading artists</li>';
        });
});
const scrollContainer = document.getElementById("artistasList");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();

    if (evt.deltaY >= -15 && evt.deltaY <= 15) {
        scrollContainer.scrollLeft += (evt.deltaY * 40);
    }

    else {
        scrollContainer.scrollLeft += (evt.deltaY * 5);
    }
});
