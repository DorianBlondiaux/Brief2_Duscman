let jsonArticles;

//Creation des cards pour tout les articles 
getJSON('articles.json').then(data => {
    jsonArticles = data;  
    document.getElementById('card').innerHTML = jsonArticles.articles.map(article => 
        ` 
        <div class="card-body">
          <img src="https://placehold.co/600x400" class="img_item" alt="...">
          <h5>Nom: ${article.nom}</h5>
          <p>Prix: ${article.prix}</p>
          <p>${article.designation}</p>
          <p class="categorie">${article.categorie}</p>
          <a href="#" class="btn btn-primary">Ajouter</a>
        </div>
        `
    ).join('')
})

function getJSON(path) {
    return fetch(path).then(response => response.json());
}

function displayOneArticle(categorie){
    //On recupere toutes les cards et on boucle dessus
    document.querySelectorAll('.card-body').forEach(elem => {
    
    //On boucle sur les categorie de chaque card pour obtenir sa valeur
    let isCategorie = false;
    elem.querySelectorAll('.categorie').forEach(elem2 => {
;         isCategorie = elem2.childNodes[0].nodeValue== categorie;
    })

    //Si c'est la bonne categorie on l'affiche, sinon on la cache
    if(isCategorie){
        elem.style.display = 'block';
    }else{
        elem.style.display = 'none';
    }
    });
}


