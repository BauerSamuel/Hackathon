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
                let data = res.data.map(p => new Post(p))
                _setState('posts', data)
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
    deletePost(_id) {
        _myServer.delete('/posts/' + _id)
            .then(res => {
                this.getPosts()
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
        _state.activePost.postHot++
        let data = _state.activePost
        _myServer.put(`/posts/${_id}`, data)
            .then(res => console.log(res.data))
        this.getPosts()
    }

    //edit active post, increment cools
    postCool(_id) {
        let data = _state.activePost.postCool++
        _myServer.put(`/posts/${_id}`, data)
            .then(res => console.log(res.data))
        this.getPosts()
    }


}