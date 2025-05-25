import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("et la ca marche?")
    this.element.textContent = "Hello World!"
  }
}
