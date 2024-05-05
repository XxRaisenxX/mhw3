const form = document.querySelector('#newsForm'); 
form.addEventListener('submit', searchNews);

const urlWikipedia = 'https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&format=json&srsearch=';

function searchNews(event) {
    event.preventDefault(); 
    
    const inputSearch = document.querySelector('#newsInput'); // Cambiato da '#searchInput' a '#newsInput'
    const searchTerm = encodeURIComponent(inputSearch.value);

    console.log('Avvio la ricerca di notizie su: ' + searchTerm);

    const restUrl = urlWikipedia + searchTerm; 

    fetch(restUrl)
        .then(onResponse)
        .then(onNewsJson); 
}

function onNewsJson(json) {
    console.log(json);

    const newsContainer = document.querySelector('#newsContainer'); // Cambiato da '#searchResults' a '#newsContainer'
    newsContainer.innerHTML = ''; 

    const searchResults = json.query.search;

    if (searchResults.length === 0) {
        const noResultsMsg = document.createElement('p');
        noResultsMsg.textContent = 'Nessun risultato trovato.';
        newsContainer.appendChild(noResultsMsg);
        return;
    }

    searchResults.forEach(result => {
        const articleTitle = result.title;
        const articleSnippet = result.snippet;

        const articleContainer = document.createElement('div');
        articleContainer.classList.add('article-container');

        const titleElement = document.createElement('h3');
        titleElement.textContent = articleTitle;

        const snippetElement = document.createElement('p');
        snippetElement.textContent = articleSnippet;

        articleContainer.appendChild(titleElement);
        articleContainer.appendChild(snippetElement);

        newsContainer.appendChild(articleContainer);
    });
}

function onResponse(response) {
    return response.json(); 
}
