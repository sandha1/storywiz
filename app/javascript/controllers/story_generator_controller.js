import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["story", "title"]

  touchStartX = 0;
  touchEndX = 0;

  generate() {
    const book = document.getElementById("flipbook")

    book.innerHTML = `
      <video autoplay loop style="width: 100%;">
        <source src="/videos/ink-animation.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;

    fetch("/generate_story", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      }
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById("story-title").textContent = data.title;
      const texte = data.content;
      const words = texte.split(/\s+/);
      const wordsPerPage = 40; // adjust as needed
      let pagesHtml = "";

      for (let i = 0; i < words.length; i += wordsPerPage) {
        const pageText = words.slice(i, i + wordsPerPage).join(" ");
        pagesHtml += `<div class="page story-page" data-story-generator-target="story">${pageText}</div>`;
      }

      setTimeout(() => {
        book.innerHTML = pagesHtml;

        $("#flipbook").turn({
          height: 600,
          autoCenter: true,
          display: 'single',
          gradients: true,
          acceleration: true,
          duration: 600
        });
      }, 500);
    })
    .catch(error => console.error("Erreur :", error))
    .finally(() => {
      document.getElementById("home-title").classList.add("d-none");
    });
  }

  handleSwipeGesture() {
    const threshold = 15;
    if (this.touchEndX < this.touchStartX - threshold) {
      $("#flipbook").turn("next");
    } else if (this.touchEndX > this.touchStartX + threshold) {
      $("#flipbook").turn("previous");
    }
  }

  clickRight() {
    $("#flipbook").turn("next");
  }

  clickLeft() {
    $("#flipbook").turn("previous");
  }
}
