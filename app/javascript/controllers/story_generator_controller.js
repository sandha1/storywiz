import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["story", "title"]

  connect() {
    this.currentPage = 0
    this.pages = []
  }

  generate() {
    fetch("/generate_story", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      }
    })
    .then(response => response.json())
    .then(data => {
      this.titleTarget.textContent = data.title;
      this.pages = this.paginateContent(data.content);
      this.currentPage = 0;
      this.displayPage();
    })
    .catch(error => console.error("Erreur :", error));
  }

  paginateContent(content) {
    // Split story into sentences for pages (adjust as needed)
    return content.match(/[^.!?]+[.!?]/g) || [content];
  }

  displayPage() {
    this.storyTarget.textContent = this.pages[this.currentPage];
  }

  next() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      this.displayPage();
    }
  }

  prev() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.displayPage();
    }
  }
}
