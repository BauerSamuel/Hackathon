import Post from "../../models/post.js"

// Private

let _myServer = axios.create({
    baseURL: '//localhost:3000/api'
})

let _state = {
    posts: [],
    activePost: {}
}

let _subscribers = {
    posts: [],
    activePost: []
}

function setState(data, val) {
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
        _myServer.get('posts')
            .then(res => {
                let data = res.data.map(p => new Post(p))
            })
    }

    // Add post
    addPost(post) {
        let newPost = new Post(post)
        _myServer.post('posts', newPost)
            .then(res => {
                this.getPosts()
            })
    }

    // Edit post (don't think we want)


    // Delete post
    deletePost(_id) {
        _myServer.delete('posts/' + _id)
            .then(res => {
                this.getPosts()
            })
    }

}