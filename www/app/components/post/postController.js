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
    let active = _ps.ActivePost
    let template = `
        <div class="card" >
            <img class="card-img-top" src="${active.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${active.title}</h5>
                    <p class="card-text">${active.description}</p>
                    <button class="btn btn-outline-dark shadow" onclick="app.controllers.postController.viewActivePost('${this._id}')">View post</button>
                </div>
        </div>
        `

    document.querySelector('#active-post').innerHTML = template


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

    // Delete a post
    deletePost(_id) {
        _ps.deletePost(_id)
    }

    // View a post (active post)
    viewActivePost(_id) {
        _aps.viewActivePost(_id)
    }

}