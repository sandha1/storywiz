import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["story", "title"]

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
        book.insertAdjacentHTML("beforeend", `<div class="story-page" data-story-generator-target="story">${texte.slice(numCaractere , numCaractere + 100)}</div>`)
        numCaractere = numCaractere + 100 + 1
        if (longueurTexte < numCaractere) {
          besoinPage = false;
        }
      };

    })
    .catch(error => console.error("Erreur :", error))
    .finally(() => {
      document.getElementById("home-title").classList.add("d-none");
    });
  }
}
