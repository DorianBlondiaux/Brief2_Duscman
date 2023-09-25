let jsonArticles;

function getJSON(path) {
    return fetch(path).then(response => response.json());
}

getJSON('articles.json').then(data => {
    jsonArticles = data;  
    document.getElementById('card').innerHTML = jsonArticles.articles.map(article => 
        `  
          <img src="https://placehold.co/600x400" class="img_item" alt="...">
          <h5>Name: ${article.nom}</h5>
          <p>Prix: ${article.prix}</p>
          <p>Description: ${article.designation}</p>
        `
    ).join('')
})

