import CommentService from "./commentService.js";

// Private

let _aps = new CommentService()

function drawComments() {
    let comments = _aps.Comments
    let template = ''
    comments.forEach(c => {
        template += c.getCommentsTemplate()
    })
    document.querySelector('#comments').innerHTML = template
}



// Public

export default class CommentController {
    constructor() {
        _aps.addSubscriber('comments', drawComments)
        _aps.getComments()
    }

    // Get all comments
    getComments() {
        _aps.getComments()
    }

    // Add a post
    addComment(event) {
        event.preventDefault()
        let form = event.target
        let newComment = {
            title: form.title.value,
            description: form.description.value,
            image: form.image.value
        }
        _aps.addComment(newComment)
        form.reset()
    }

    // View a comment (active comment)

    // Delete a comment
    deleteComment(_id) {
        _aps.deleteComment(_id)
    }

}