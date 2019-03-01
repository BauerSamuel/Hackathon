import PostController from "./components/post/postController.js";
import ActivePostController from "./components/activePost/activePostController.js";


class App {
    constructor() {
        this.controllers = {
            postController: new PostController(),
            activePostController: new ActivePostController()
        }
    }
}

window['app'] = new App()