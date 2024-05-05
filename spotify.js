const clientId = "3b6eed8d7949490d9c59bfc5c37ffa55";
const clientSec = "bf8fd6f44fdb4d9c867b7abe58c37c31";
let token_data;

function onResponse(response) {
    return response.json();
}

function onTokenResponse(response) {
    return response.json();
}

function getToken(json) {
    token_data = json;
}

function onJsonSpotify(json) {
    const song = document.querySelector('#song');
    song.innerHTML = '';

    const result = json.tracks.items[0];

    if (result) {
        const image = document.createElement('img');
        image.src = result.album.images[0].url;

        const link = document.createElement('a');
        const url_link = result.preview_url;
        link.textContent = "Click per ascoltare";
        link.href = url_link;

        song.appendChild(image);
        song.appendChild(link);
    } else {
        song.textContent = "Nessun risultato trovato.";
    }
}

function searchSpotify(event) {
    event.preventDefault();

    const song_input = document.querySelector('#author');
    const song_value = encodeURIComponent(song_input.value);

    fetch("https://api.spotify.com/v1/search?type=track&include_external=audio&q=" + song_value, {
        headers: {
            'Authorization': 'Bearer ' + token_data.access_token
        }
    })
    .then(onResponse)
    .then(onJsonSpotify)
    .catch(error => {
        console.error('Errore nella ricerca Spotify:', error);
        song.textContent = "Si è verificato un errore durante la ricerca.";
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const formMusic = document.querySelector('#music');
    formMusic.addEventListener('submit', searchSpotify);
});

fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: 'grant_type=client_credentials',
    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSec)
    }
})
.then(onTokenResponse)
.then(getToken)
.catch(error => console.error('Errore nel recupero del token Spotify:', error));
