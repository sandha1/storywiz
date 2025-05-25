import { Controller } from "@hotwired/stimulus"

// export default class extends Controller {
//   connect() {
    // console.log("Hello from story_generator controller");
    // const gen_button = document.getElementById("generate-story-btn");
    // const title = document.querySelector(".title")
    // const content = document.querySelector(".content")
    // gen_button.addEventListener("click", (event) => {
    //   console.log(event) ;
    //   title.value = "titre génération en cours";
    //   content.value = "histoire en cours de génération";
    //     }
    //   )
//   }
// }

console.log("Hello from story_generator controller");

document.addEventListener("DOMContentLoaded", () => {
  const genButton = document.getElementById("generate-story-btn");
  const title = document.querySelector(".title");
  const content = document.querySelector(".content");

  if (!genButton || !title || !content) {
    console.error("Un ou plusieurs éléments n'ont pas été trouvés dans le DOM.");
    return;
  }

  genButton.addEventListener("click", (event) => {
    console.log("Bouton cliqué :", event);
    title.innerHTML = "titre génération en cours";
    content.innerHTML = "histoire en cours de génération";
  });
});
