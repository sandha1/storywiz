import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["story", "title"]

  touchStartX = 0;
  touchEndX = 0;

  generate() {
    const animationContainer = document.getElementById("animation-container");
    const flipbook = document.getElementById("flipbook");

    flipbook.classList.add("hidden");
    animationContainer.classList.remove("hidden");

    animationContainer.innerHTML = `
      <div class="video-container">
        <video autoplay loop muted>
          <source src="/videos/ink-animation.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="video-color"></div>
      </div>
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

      const story = data.content;
      document.getElementById("story-content").textContent = story.slice(0, 100);
      let generatePage = true;
      let characLength = 101;
      const textLength = story.length;
      let pagesHtml = "";

      if (textLength < characLength) {
        generatePage = false;
      }

      while (generatePage === true) {
        pagesHtml += `<div class="page story-page" data-story-generator-target="story">${story.slice(characLength, characLength + 100)}</div>`;
        characLength = characLength + 100 + 1;
        if (textLength < characLength) {
          generatePage = false;
        }
      }

      flipbook.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
        console.log("touchstart");
      }, false);

      flipbook.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        console.log("touchend");
        this.handleSwipeGesture();
      }, false);

      setTimeout(() => {
        animationContainer.classList.add("hidden");
        animationContainer.innerHTML = "";

        flipbook.classList.remove("hidden");
        flipbook.innerHTML += pagesHtml;

        $("#flipbook").turn({
          height: 600,
          width: 440,
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

//     .then(data => {
//       document.getElementById("story-title").textContent = data.title;
//       const story = data.content
//       const words = story.split(/\s+/);
//       const wordsPerPage = 40;
//       const book = document.getElementById("flipbook");

//       book.innerHTML = "";

//       for (let i = 0; i < words.length; i += wordsPerPage) {
//         const pageText = words.slice(i, i + wordsPerPage).join(" ");
//         book.insertAdjacentHTML(
//           "beforeend",
//           `<div class="page story-page" data-story-generator-target="story">${pageText}</div>`
//         );
//       }

//       document.getElementById("story-content").textContent = words.slice(0, wordsPerPage).join(" ");
//     })
//     .then(() => {
//     })
//     .catch(error => console.error("Erreur :", error))
//     .finally(() => {
//       document.getElementById("home-title").classList.add("d-none");
//     });
//   }
// }
