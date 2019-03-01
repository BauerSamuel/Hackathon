import PostController from "./components/post/postController.js";
import CommentController from "./components/comments/commentController.js";



class App {
    constructor() {
        this.controllers = {
            postController: new PostController(),
            commentController: new CommentController()
        }
    }
}

window['app'] = new App()