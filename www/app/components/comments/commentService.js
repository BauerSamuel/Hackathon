import Comment from "../../models/comment.js"

// Private

let _myServer = axios.create({
    baseURL: '//localhost:3000/api'
})

let _state = {
    comments: []
}

let _subscribers = {
    comments: []
}

function _setState(data, val) {
    _state[data] = val
    _subscribers[data].forEach(fn => fn())
}


// Public

export default class CommentService {
    addSubscriber(data, fn) {
        _subscribers[data].push(fn)
    }

    get Comments() {
        return _state.comments
    }

    // Get all comments
    getComments() {
        _myServer.get('comments')
            .then(res => {
                let data = res.data.map(c => new Comment(c))
                _setState('activePosts', data)
            })
    }

    // Add comment
    addComment(comment) {
        let newComment = new Comment(comment)
        _myServer.post('comments', newComment)
            .then(res => {
                this.getComments()
            })
    }

    // Edit comment (Do we want this?)

    // Delete comment
    deleteComment(_id) {
        _myServer.delete('comments/' + _id)
            .then(res => {
                this.getComments()
            })
    }

}