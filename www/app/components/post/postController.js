import PostService from "./postService.js";

// Private

let _ps = new PostService()

function drawPosts() {

}

function drawActivePost() {

}




// Public

export default class PostController {
    constructor() {
        _ps.addSubscriber('posts', drawPosts)
        _ps.addSubscriber('activePost', drawActivePost)
        _ps.getPosts()
    }

    getPosts() {
        _ps.getPosts()
    }

    addPost(event) {
        event.preventDefault()
        let form = event.target
        let newPost = {
            title: form.title.value,
            description: form.description.value,
            image: form.image.value
        }
        _ps.addPost(newPost)
        form.reset()
    }

    deletePost(_id) {
        _ps.deletePost(_id)
    }

}