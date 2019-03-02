import Post from "../../models/post.js"

// Private
let _myServer = axios.create({
    baseURL: '//localhost:3000/api'

})

let _state = {
    posts: [],
    activePost: {},
    comments: []
}

let _subscribers = {
    posts: [],
    activePost: [],
    comments: []
}

function _setState(data, val) {
    _state[data] = val
    _subscribers[data].forEach(fn => fn())
}


// Public
export default class PostService {
    addSubscriber(data, fn) {
        _subscribers[data].push(fn)
    }

    get Posts() {
        return _state.posts
    }

    get ActivePost() {
        return _state.activePost
    }

    // Get all posts
    getPosts() {
        _myServer.get('/posts')
            .then(res => {
                console.log(res)
                let data = res.data.map(p => new Post(p))
                _setState('posts', data)
            })
    }

    // Get active post
    getActivePost() {
        debugger
        _myServer.get('/posts/' + _state.activePost._id)
            .then(res => {
                debugger
                let data = new Post(res.data)
                _setState('activePost', data)
            })
    }

    // Add post
    addPost(post) {
        let newPost = new Post(post)
        _myServer.post('/posts', newPost)
            .then(res => {
                this.getPosts()
            })
    }

    // Delete post
    deletePost(nickName) {
        let id = _state.activePost._id
        _myServer.delete(`/posts/${id}/${nickName.nickname}`)
            .then(res => {
                this.getPosts()
                if (id != _state.posts.find(p => p._id == id)) {
                    _setState('activePost', '')
                }
            })
            .catch(err => {
                err.status(218).send('Not authorized')
            })

    }


    // view active post in right side window
    viewActivePost(_id) {
        let data = _state.posts.find(a => a._id == _id)
        data.hot++
        _setState('activePost', data)
    }

    //edit active post, increment hots
    postHot(_id) {
        let post = _state.posts.find(p => p._id == _id)
        post.postHot++
        _myServer.put(`/posts/${_id}`, post)
            .then(res => {
                console.log('return incrementer bingo')
                this.getPosts()
                this.getActivePost()
            })
    }

    //edit active post, increment cools
    postCool(_id) {
        let post = _state.posts.find(p => p._id == _id)
        post.postCool++
        _myServer.put(`/posts/${_id}`, post)
            .then(res => {
                this.getPosts()
                this.getActivePost()
            })
    }

    //create comment
    createComment(newComment) {
        let id = _state.activePost._id
        _myServer.put(`/posts/${id}/comments`, newComment)
            .then(res => {
                this.getActivePost()
            })
    }

    //increment hot cold
    incremmentHotCold(_id, hot) {
        let commentVote = _state.activePost.comments.find(c => c._id == _id)
        commentVote[hot] = true
        _myServer.put(`/posts/${_state.activePost._id}/hot-cool`, commentVote)
            .then(res => {
                this.getActivePost()
                console.log('incremment bingo')
            })
    }

    sortByActivity() {
        let array = this.Posts
        array.sort((a, b) => {
            let aquotient = (a.comments.length + a.postHot + a.postCool)
            let bquotient = (b.comments.length + b.postHot + b.postCool)
            let difference = aquotient - bquotient
            if (difference > 0) {
                return -1
            } else {
                return 1
            }
        })
        _setState('posts', array)
    }

}