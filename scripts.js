let jsonArticles;

//Creation des cards pour tout les articles 
getJSON('articles.json').then(data => {
    jsonArticles = data;  
    document.getElementById('card').innerHTML = jsonArticles.articles.map(article => 
        ` 
        <div class="card-body">
          <img src="https://placehold.co/700x900" class="img_item" alt="...">
            <div class="valise_contenu_card">
                <div class="contenu_card">
                    <h5>${article.nom}</h5>
                    <p class="descr_article">${article.designation}</p>
                    <p class="prix"> ${article.prix} €</p>
                    <p class="categorie">${article.categorie}</p>
                    <button href="#" class="btn btn-primary">Ajouter</button>
                </div>
            </div>
        </div>
        `
    ).join('')
})
        //    Ajoute la clase active dans le boutons de la liste du menu //
const boutonsCategories = document.querySelectorAll(".bouton_cat");

boutonsCategories.forEach(boton =>{
    boton.addEventListener("click", (e) => {

        boutonsCategories.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
    })
})

   //     OPen close menu responsive  //
const openMenu = document.querySelector("#open_menu");
const closeMenu = document.querySelector("#close_menu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside_visible");
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside_visible");
})

boutonsCategories.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside_visible");
}))

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


