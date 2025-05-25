// Import and register all your controllers from the importmap via controllers/**/*_controller
console.log("index.js est ok")
import { application } from "controllers/application"
// import { story_generator } from "controllers"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)
