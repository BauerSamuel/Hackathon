import PostService from "./postService.js";

// Private
let _ps = new PostService()

function drawPosts() {
    let posts = _ps.Posts
    let template = ''
    posts.reverse().forEach(p => {
        template += p.getPostsTemplate()
    })
    document.querySelector('#main-thread').innerHTML = template
}

function drawActivePost() {
    let active = _ps.ActivePost
    if (active != '') {
        let comments = active.comments
        let template = ''
        comments.forEach(c => {
            template += `
            <li class="comment-list">${c.description} 
                <button onclick="app.controllers.postController.incremmentHotCold('${c._id}', 'hot')" class="btn btn-sm btn-danger shadow ml-4"><i class="fas fa-fire"></i> &ensp; <span> ${c.commentHot} </span></button>
                <button onclick="app.controllers.postController.incremmentHotCold('${c._id}')" class="btn btn-sm btn-primary shadow ml-2"><i class="fas fa-snowflake"></i> &ensp; <span> ${c.commentCool} </span></button>
            </li>
                `
        })
        document.querySelector('#active-post').innerHTML = active.getActivePostTemplate() + template
    } else {
        document.querySelector('#active-post').innerHTML = ''
    }
}


// Public
export default class PostController {
    constructor() {
        _ps.addSubscriber('posts', drawPosts)
        _ps.addSubscriber('activePost', drawActivePost)
        _ps.addSubscriber('comments', drawActivePost)
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
            image: form.image.value,
            nickname: form.nickname.value
        }
        _ps.addPost(newPost)
        form.reset()
    }

    // Delete a post
    deletePost(event) {
        event.preventDefault()
        let form = event.target
        let nickName = {
            nickname: form.nickname.value

        }
        _ps.deletePost(nickName)
        form.reset()
    }

    // View a post (active post)
    viewActivePost(_id) {
        _ps.viewActivePost(_id)
    }

    //increment post hots
    postHot(_id) {
        _ps.postHot(_id)
    }

    //increment post cools
    postCool(_id) {
        _ps.postCool(_id)
    }

    //create a comment
    createComment(event) {
        event.preventDefault()
        let form = event.target
        let newComment = {
            description: form.description.value
        }
        _ps.createComment(newComment)
        form.reset()
    }

    //increment comment hots/cools
    incremmentHotCold(_id, hot) {
        _ps.incremmentHotCold(_id, hot)
    }

    // creates form to verify nickname before delete
    formDelete(_id) {
        document.getElementById('form-delete').style.display = "inline"
        document.getElementById('comment-input-hide').style.display = "none"
    }

    // sort
    sortByActivity() {
        _ps.sortByActivity()
    }

    //sort
    sortByTime() {
        location.reload()
    }

}