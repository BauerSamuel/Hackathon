export default class Post {
    constructor(data) {
        this._id = data._id
        this.title = data.title
        this.description = data.description
        this.image = data.image || '../assets/defaultImg.png'
        this.comments = data.comments
        this.postHot = data.postHot || 0
        this.postCool = data.postCool || 0
        this.commentHot = data.commentHot || 0
        this.commentCool = data.commentCool || 0
<<<<<<< HEAD
        this.date = data.date || Date.now()
=======
        this.nickname = data.nickname
>>>>>>> 691ee2682c481caf473249fdc6c5396a6486c185
    }

    getPostsTemplate() {
        return `
        <div class="card">
            <img class="card-img-top" src="${this.image}" alt="Card image cap">
            <div class="card-body">
                <h3 class="card-title">${this.title}</h3>
                <h5 class="card-text">${this.description}</h5>
                <div>
                <button class="mb-3 btn btn-lg btn-light shadow" onclick="app.controllers.postController.viewActivePost('${this._id}')">View peeve!</button>
                <button class="btn btn btn-danger shadow mb-3 ml-2" onclick="app.controllers.postController.postHot('${this._id}')"><i class="fas fa-fire"></i> &ensp; <span id="hot-counter"> ${this.postHot} </span></button>
                <button class="btn btn btn-primary shadow mb-3 ml-2" onclick="app.controllers.postController.postCool('${this._id}')"><i class="fas fa-snowflake"></i> &ensp; <span id="cool-counter"> ${this.postCool} </span></button>
                </div>
            </div>    
        </div>
        `
    }

    getActivePostTemplate() {
        return `
        <div class="card comment" >
            <img class="card-img-top" src="${this.image}" alt="Card image cap">
                <div class="card-body">
                    <h1 class="card-title">${this.title}</h1>
                    <h4 class="card-text">${this.description}</h4>
                    <button class="btn btn-danger shadow ml-2" onclick="app.controllers.postController.postHot('${this._id}')"><i class="fas fa-fire"></i> &ensp; <span> ${this.postHot} </span></button>
                    <button class="btn btn-primary shadow ml-2" onclick="app.controllers.postController.postCool('${this._id}')"><i class="fas fa-snowflake"></i> &ensp; <span> ${this.postCool} </span></button>
                    <button class="btn btn-dark shadow ml-5" onclick="app.controllers.postController.formDelete('${this._id}')">Delete Post </button>
                    </div>
                    <form id="form-delete" class="form-inline px-3" onsubmit="app.controllers.postController.deletePost(event)">
                    <input type="text" class="form-control mb-2 mr-sm-2" id="comment-input" name="nickname" placeholder="Enter nickname...">
                    <button type="submit" class="btn btn-success shadow mb-2">Confirm</i></button>
                    </form>
                <form class="form-inline px-3" onsubmit="app.controllers.postController.createComment(event)">
                    <input type="text" class="form-control mb-2 mr-sm-2" id="comment-input" name="description" placeholder="Enter comment here...">
                    <button type="submit" class="btn btn-success shadow mb-2"><i class="fas fa-check"></i></button>
                </form>
        </div>
        `
    }


}