import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["story", "title"]

  touchStartX = 0;
  touchEndX = 0;

  generate() {
    fetch("/generate_story", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      }
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById("story-title").textContent = data.title;
      const texte = data.content
      document.getElementById("story-content").textContent = texte.slice(0,100);
      let besoinPage = true;
      let numCaractere = 101;
      const longueurTexte = texte.length
      const book = document.getElementById("flipbook")
      if (longueurTexte < numCaractere) {
          besoinPage = false;
        }

      while ( besoinPage === true ) {
        console.log("crea nouvelle page")
        book.insertAdjacentHTML("beforeend", `<div class="page story-page" data-story-generator-target="story">${texte.slice(numCaractere , numCaractere + 100)}</div>`)
        numCaractere = numCaractere + 100 + 1
        if (longueurTexte < numCaractere) {
          besoinPage = false;
        }
      };

    })
    // ajout turnjs

    .then (() => {
     console.log("turn.js loaded");
    $("#flipbook").turn({
      // width: 400,
      height: 600,


      autoCenter: true,
      display: 'single',
      gradients: true,
      acceleration: true,
      duration: 600

      });
    })
    // fin ajout turnjs
    //ajout des event listeners
    .then(() => {
      console.log("lancement crea fct swipe");
      const flipbook = document.getElementById("flipbook");

      flipbook.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
        console.log("touchstart");
      }, false);

      flipbook.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        console.log("touchend");
        this.handleSwipeGesture();
      }, false);
    })
    .catch(error => console.error("Erreur :", error))
    .finally(() => {
      document.getElementById("home-title").classList.add("d-none");
    });
  }

  handleSwipeGesture() {
    console.log("swipe détecté");
    const threshold = 15;
    if (this.touchEndX < this.touchStartX - threshold) {
      console.log("page suivante");
      $("#flipbook").turn("next");
    } else if (this.touchEndX > this.touchStartX + threshold) {
      console.log("page precedente");
      $("#flipbook").turn("previous");
    }
  }

  clickRight() {
    console.log("tournage de page suivante");
    $("#flipbook").turn("next");
  }

  clickLeft() {
    console.log("tournage de page précèdente");
    $("#flipbook").turn("previous");
  }

}
