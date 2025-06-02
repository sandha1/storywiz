import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["wand"]

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
      document.getElementById("story-content").textContent = data.content;
    })
    .catch(error => console.error("Erreur :", error))
  }
}
