import { Controller } from "@hotwired/stimulus"

// export default class extends Controller {
//   connect() {
    console.log("Hello from story_generator controller");
    const gen_button = document.getElementById("generate-story-btn");
    gen_button.addEventListener("click", (event) => {
      console.log(event) ;

        }
      )
//   }
// }
