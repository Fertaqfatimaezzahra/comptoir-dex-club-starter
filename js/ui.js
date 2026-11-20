// =============================================================
// ui.js — fonctions d'AFFICHAGE
// Elles reçoivent des données et modifient la page. Elles ne changent jamais les données.
// Utilisez createElement, textContent, classList, setAttribute / dataset, append.
// (Pas de innerHTML avec des données : seulement innerHTML = "" pour vider une zone.)
// =============================================================

// import { createElement } from "react";


const typesBox = document.querySelector("#types");
const grid = document.querySelector("#grid");
const count = document.querySelector("#count");
const detail = document.querySelector("#detail");
const cartList = document.querySelector("#cart-list");
const cartCountEl = document.querySelector("#cart-count");
const cartTotalEl = document.querySelector("#cart-total");
const statsBox = document.querySelector("#stats");

// -------------------------------------------------------------
// Petites aides (déjà écrites, utilisez-les)
// -------------------------------------------------------------

/** 1 → "#001" */
export const formatNumero = (id) => "#" + String(id).padStart(3, "0");

/** 12 → "12 DH" */
export const formatPrix = (prix) => prix + " DH";

/** "Électrik" → "type-electrik" (la classe CSS de couleur du type) */
export const typeClass = (type) =>
  "type-" + type.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Crée un élément avec une classe et un texte : el("p", "card__num", "#001") */
export function el(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}

// -------------------------------------------------------------
// PALIER 1
// -------------------------------------------------------------

/**
 * Affiche les boutons de type dans #types.
 * counts = { Feu: 3, Eau: 3, … } (résultat de countByType) ; activeType = "Tous" ou un type.
 * Modèle d'un bouton :
 *   <button class="type-btn is-active" type="button" data-type="Feu">Feu (3)</button>
 * Le premier bouton est « Tous (12) » avec data-type="Tous" (12 = la somme des compteurs).
 * Seul le bouton du type actif a la classe is-active.
 */
export function renderTypes(counts, activeType) {
  // TODO 1. Videz #types
  typesBox.innerHTML="";
  // TODO 2. Créez le bouton « Tous (…) »
  const tous = createElement("button")
  tous.textContent= `Tous (${counts.Feu +counts.Eau +counts.Plante + counts.Électrik })`
  tous.className= "type-btn"
  tous.type = "button"
  tous.dataset.type= "Tous"
  // TODO 3. Pour chaque type de counts (for...in ou Object.keys), créez un bouton
  const feu = createElement("button")
  feu.textContent= `Feu (${counts.Feu})`
  feu.className= "type-btn"
  feu.type = "button"
  feu.dataset.type= "Feu"

  const eau = createElement("button")
  eau.textContent= `Eau(${counts.Eau})`
  eau.className= "type-btn"
  eau.type = "button"
  eau.dataset.type= "Eau"

  const plante= createElement("button")
  plante.textContent= `Plante (${counts.Plante}) `
  plante.className= "type-btn"
  plante.type = "button"
  feu.dataset.type= "Plante"

  const electrik = createElement("button")
  electrik.textContent= `Électrik (${counts.Électrik})`
  electrik.className= "type-btn"
  electrik.type = "button"
  electrik.dataset.type= "Électrik"

  if(activeType === "Tous"){
    tous.classList.add("is-active")
  }
  if(activeType === "Feu"){
    feu.classList.add("is-active")
  }
  if(activeType === "Eau"){
    eau.classList.add("is-active")
  }
  if(activeType === "electrik"){
    electrik.classList.add("is-active")
  }
  if(activeType === "Plante"){
    plante.classList.add("is-active")
  }
}

/**
 * Affiche le nombre de cartes visibles dans #count : "5 cartes", "1 carte" ou "Aucune carte".
 */
export function renderCount(n) {
    




  // TODO
}

/**
 * Affiche les cartes dans #grid.
 * list = les cartes à afficher ; cart = le panier (pour la classe is-selected, palier 2).
 * Si list est vide : un <p class="empty">Aucune carte trouvée</p>.
 * Modèle d'une carte :
 *   <article class="card" data-id="1">
 *     <img class="card__img" src="images/emberkit.svg" alt="Emberkit">
 *     <p class="card__num">#001</p>
 *     <h3 class="card__name">Emberkit</h3>
 *     <p class="card__meta"><span class="badge type-feu">Feu</span> <span class="rarity">Commune</span></p>
 *     <p class="card__price">12 DH</p>
 *     <button class="btn btn--primary" type="button" data-add="1">Ajouter</button>
 *   </article>
 * - stock 0 : classe out-of-stock sur l'article ET bouton désactivé (disabled = true)
 * - palier 2 : classe is-selected si la carte est dans le panier (cart.some(...))
 */
export function renderGrid(list, cart) {
  // TODO 1. Videz #grid
  grid.innerHTML=""
  // TODO 2. Liste vide : ajoutez le message et arrêtez (return)
  if(list.length===0){
    grid.innerHTML= "<p class='empty'> les cartes indisponible</p>"
    return;

  }
  

  // TODO 3. Pour chaque carte : créez l'article et ses enfants, puis grid.append(article)
  list.forEach(element => {
    
    const article = createElement("article")
    article.className= "card"
    article.dataset.id= element.id;

    const image = createElement("img")
    image.className="card__img"
    image.src = element.image
    image.alt = element.nom;

    const p1 = createElement("p")
    p1.className="card__num"
    p1.textContent = typeClass(element.id)

    const H3 = createElement("h3")
    H3.className= "card__name";
    H3.textContent = element.nom;


    const p2 = createElement("p")
    p2.className="card__meta"

    const span1 = createElement("span")
     span1.className=`badge ${typeClass(element.type)}`
     span1.textContent = element.type;
     const span2 = createElement("span")
     span2.className="rarity"
     span2.textContent = element.rarete ;

            p2.append(span1,span2)

    const p3 = createElement("p")
    p3.className="card__price"
    p3.textContent =formatPrix ( element.prix);

    const button = createElement("button")
    button.className= "btn"
    button.classList.add( "btn--primary")
    button.type= "button"
    button.dataset.add = element.id
    button.textContent= "ajouter"
    if(element.stock===0){
      button.disabled =true;
      article.classList.add("out-of-stock");
    }

    article.append(image,p1,H3,p2,p3,button);
    grid.append(article)

  });
}

/**
 * Affiche la fiche d'une carte dans #detail : image, nom (h3), numéro + badge du type,
 * description, puis une liste <dl> : Rareté, Prix, Stock (« Rupture » si 0).
 */
export function renderDetail(card) {
  // TODO

}

// -------------------------------------------------------------
// PALIER 2
// -------------------------------------------------------------

/**
 * Affiche le panier.
 * cart = [{ id, quantite }] ; cards = toutes les cartes (pour le nom, le prix, le stock).
 * Modèle d'une ligne :
 *   <li class="cart-line" data-id="1">
 *     <span class="cart-line__name">Emberkit</span>
 *     <button class="btn btn--small" type="button" data-action="minus">−</button>
 *     <span class="cart-line__qty">2</span>
 *     <button class="btn btn--small" type="button" data-action="plus">+</button>
 *     <button class="btn btn--small" type="button" data-action="remove">Retirer</button>
 *   </li>
 * - le bouton + est désactivé quand la quantité atteint le stock
 * - panier vide : <li class="empty">Votre panier est vide</li>
 * - #cart-count : "3 cartes" (ou "1 carte", "0 carte") ; #cart-total : "54 DH"
 *   → total et nbCards sont déjà calculés par main.js (cartTotal et cartCount de cart.js)
 * - pour le nom et le stock d'une ligne, retrouvez la carte dans cards avec find
 */
export function renderCart(cart, cards, total, nbCards) {
  // TODO
}

// -------------------------------------------------------------
// PALIER 3 (bonus)
// -------------------------------------------------------------

/**
 * Affiche les statistiques dans #stats : 4 blocs
 *   <div class="stat"><p class="stat__value">1 234 DH</p><p class="stat__label">Valeur du stock</p></div>
 */
export function renderStats(stats) {
  // TODO
}

/**
 * Affiche les erreurs du formulaire : errors = { nom: "…", prix: "…" }
 * Pour chaque champ (nom, prix, stock) : écrit le message dans [data-error-for="…"]
 * et ajoute ou retire la classe field-error sur le champ #form-….
 */
export function showFormErrors(errors) {
  // TODO
}
