let jsonArticles;
let idArticleIncrement = 0;
//let listeIdArticles = [];
let mapListeIdArticles = new Map();
let isPagePanier = false;
let panierHtml = `<h1>Panier</h1>

<article class="articlePanier">

  <section class="imgArticle">

  </section>

  <section class="titreArticle">
    <p id="nomArticle" class="intitule">Article</p>

  </section>
  <section class="quantiteArticle">
    <p id="quantite" class="intitule">Quantité</p>

  </section>
  <section class="prixArticle">
    <p id="prix" class="intitule">Prix</p>

  </section>
  <section class="totalArticle">
    <p id="soustotal" class="intitule">Subtotal</p>

  </section>
  <section class="logoSup">
    <p id="supp" class = "intitule">Supprimer</p>
  </section>
</article>

<div class="viderPanier">
  <p>Vider Panier</p>
</div>

<article class="validationPanier">
  <section class="totalPanier">
    <p id="total">Total:</p>
  </section>
  <section class="prixPanier">

  </section>
  <section class="payerPanier">
    <p class="payerBtn">Acheter maintenant </p>
  </section>
</article>`;

chargerArticlesJson();

function chargerArticlesJson() {
  getJSON("articles.json").then((data) => {
    jsonArticles = data;
    chargerArticles();
  });
}

function chargerArticles() {
  document.getElementById("main").innerHTML = ` 
    <h2 id="titre" class="titre_principal">Tous les articles</h2>
    <div class="valise_items">
      <div id="card" class="card_item" style="width: 18rem;"></div>
    </div>
    `;
  document.getElementById("card").innerHTML = jsonArticles.articles
    .map(
      (article) =>
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
    )
    .join("");
}

function getJSON(path) {
  return fetch(path).then((response) => response.json());
}

function displayOneArticle(categorie) {
  //Si on vient de panier on doit de nouveau récupérer la data
  if (isPagePanier) {
    chargerArticles();
  }

  let titreHtml = "Tous les articles";
  //On met le titre de la categorie de l'article
  switch (categorie) {
    case "costume":
      titreHtml = "Costumes";
      break;
    case "robe":
      titreHtml = "Robes";
      break;
    case "chemise":
      titreHtml = "Chemises";
      break;
    case "jupe":
      titreHtml = "Jupes";
      break;
    case "manteau":
      titreHtml = "Manteaux";
      break;
    case "pantalon":
      titreHtml = "Pantalons";
      break;
    case "blouse":
      titreHtml = "Blouses";
      break;
    case "cravate":
      titreHtml = "Cravates";
      break;
    case "chaussure":
      titreHtml = "Chaussures";
      break;
  }
  document.getElementById("titre").innerHTML = titreHtml;

  //On recupere toutes les cards et on boucle dessus
  document.querySelectorAll(".card-body").forEach((elem) => {
    //On boucle sur les categorie de chaque card pour obtenir sa valeur
    let isCategorie = false;
    elem.querySelectorAll(".categorie").forEach((elem2) => {
      isCategorie = elem2.childNodes[0].nodeValue == categorie;
    });

    //Si c'est la bonne categorie on l'affiche, sinon on la cache
    if (isCategorie) {
      elem.style.display = "block";
    } else {
      elem.style.display = "none";
    }
  });

  isPagePanier = false;
}

function chargerPanier(){
    document.getElementById('main').innerHTML = panierHtml;
    mapListeIdArticles.forEach((value, key )=>{
        document.getElementById('prix').insertAdjacentHTML('beforeend','<p>' + jsonArticles.articles[key].prix + '</p>')
    })
    isPagePanier = true;
}

function displayAllArticle() {
  //Si page panier on doit recharger les elements
  if (isPagePanier) {
    chargerArticles();
  } else {
    //Sinon on peut juste les rendre visible
    document.querySelectorAll(".card-body").forEach((elem) => {
      elem.style.display = "block";
    });
  }
}

function chargerPanier() {
    let total = 0;
  document.getElementById("main").innerHTML = panierHtml;
  mapListeIdArticles.forEach((value, key) => {
    document
      .getElementById("nomArticle")
      .insertAdjacentHTML(
        "beforeend",
        "<p>" + jsonArticles.articles[key].nom + "</p>"
      );
    document
      .getElementById("quantite")
      .insertAdjacentHTML(
        "beforeend",
        "<p>" + value + "</p>"
      );
    document
      .getElementById("prix")
      .insertAdjacentHTML(
        "beforeend",
        "<p>" + jsonArticles.articles[key].prix + "</p>"
      );
      document
      .getElementById("soustotal")
      .insertAdjacentHTML(
        "beforeend",
        "<p>" + jsonArticles.articles[key].prix * value + "</p>"
      );
    document
      .getElementById("supp")
      .insertAdjacentHTML(
        "beforeend",
        '<p> <i class="fa-regular fa-trash-can"></i> </p>'
      );
      total += jsonArticles.articles[key].prix * value;
  });
  document
      .getElementById("total")
      .insertAdjacentHTML(
        "beforeend",total
      );
}

function ajouterArticle(id){
    if(mapListeIdArticles.has(id)){
        mapListeIdArticles.set(id, mapListeIdArticles.get(id) + 1 );
    }else{
        mapListeIdArticles.set(id, 1);
    }
    console.log(mapListeIdArticles);
    document.getElementById('compteur').innerHTML = mapListeIdArticles.size;
}
