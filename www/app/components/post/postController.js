import PostService from "./postService.js";

// Private

let _ps = new PostService()

function drawPosts() {
    let posts = _ps.Posts
    let template = ''
    posts.forEach(p => {
        template += p.getPostsTemplate()
    })
    document.querySelector('#main-thread').innerHTML = template
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

    // Get all posts
    getPosts() {
        _ps.getPosts()
    }

    // Add a post
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

    // View a post (active post)

    // Delete a post
    deletePost(_id) {
        _ps.deletePost(_id)
    }

}