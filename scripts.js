let jsonArticles;
let idArticleIncrement = 0;
let listeIdArticles = [];
let panierHtml = `<h1>Panier</h1>

<article class="articlePanier">

  <section class="imgArticle">

  </section>

  <section class="titreArticle">
    <p class="intitule">Article</p>
    <p></p>

  </section>
  <section class="quantiteArticle">
    <p class="intitule">Quantité</p>
    <p></p>

  </section>
  <section class="prixArticle">
    <p class="intitule">Prix</p>
    <p></p>

  </section>
  <section class="totalArticle">
    <p class="intitule">Subtotal</p>
    <p></p>

  </section>
  <span class="logoSup">
    <i class="fa-regular fa-trash-can"></i>
  </span>
</article>

<div class="viderPanier">
  <p>Vider Panier</p>
</div>

<article class="validationPanier">
  <section class="totalPanier">
    <p>Total:</p>
  </section>
  <section class="prixPanier">

  </section>
  <section class="payerPanier">
    <p class="payerBtn">Acheter maintenant </p>
  </section>
</article>`;

getJSON('articles.json').then(data => {
    jsonArticles = data;  
    document.getElementById('card').innerHTML = jsonArticles.articles.map((article) => 
            ` 
            <div class="card-body">
            <img src="https://placehold.co/600x400" class="img_item" alt="...">
            <h5>Nom: ${article.nom}</h5>
            <p>Prix: ${article.prix}</p>
            <p>${article.designation}</p>
            <p class="categorie">${article.categorie}</p>
            <a id="${idArticleIncrement++}" onclick="ajouterArticle(this.id)" class="btn btn-primary">Ajouter</a>
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

function chargerPanier(){
    document.getElementById('main').innerHTML = panierHtml;
    listeIdArticles.forEach(id =>{
        document.getElementById('main').insertAdjacentHTML('beforeend',
        ` 
        <div class="card-body">
        <img src="https://placehold.co/600x400" class="img_item" alt="...">
        <h5>Nom: ${jsonArticles.articles[id].nom}</h5>
        <p>Prix: ${jsonArticles.articles[id].prix}</p>
        <p>${jsonArticles.articles[id].designation}</p>
        <p class="categorie">${jsonArticles.articles[id].categorie}</p>
        </div>
        
        `)
    })
}

function ajouterArticle(id){
    listeIdArticles.push(id);
}


