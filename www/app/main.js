import PostController from "./components/post/postController.js";


class App {
    constructor() {
        this.controllers = {
            postController: new PostController()
        }
    }
}

window ['app'] = new App()