export default class Post {
    constructor(data) {
        this._id = data._id
        this.title = data.title
        this.description = data.description
        this.image = data.image
        this.comments = data.comments
        this.postHot = data.postHot || 0
        this.postCool = data.postCool || 0
        this.commentHot = data.commentHot || 0
        this.commentCool = data.commentCool || 0
    }

    getPostsTemplate() {
        return `
        <div class="card">
            <img class="card-img-top" src="${this.image}" alt="Card image cap">
            <div class="card-body">
                <h3 class="card-title">${this.title}</h3>
                <p class="card-text">${this.description}</p>
                <button class="btn btn-outline-dark shadow" onclick="app.controllers.postController.viewActivePost('${this._id}')">View Peeve</button>
                <button class="btn btn-sm btn-danger shadow" onclick="app.controllers.postController.postHot('${this._id}')">Fire</button><p class="ml-3" id="hot-counter"># hot: ${this.postHot}</p>
                <button class="btn btn-sm btn-primary shadow" onclick="app.controllers.postController.postCool('${this._id}')">Cool</button><p class="ml -3" id="cool-counter"># cool: ${this.postCool}</p>
                </div>
        </div>
        `
    }

    getActivePostTemplate() {
        return `
        <div class="card" >
            <img class="card-img-top" src="${this.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <p class="card-text">${this.description}</p>
                    <form class="form-inline" onsubmit="app.controllers.postController.createComment(event)">
                         <input type="text" class="form-control mb-2 mr-sm-2" id="comment-input" name="description" placeholder="Enter comment here...">
                         <button type="submit" class="btn btn-primary mb-2">Submit</button>
                    </form>
                </div>
                <div>
                <li>${this.comments}</li>
                </div>
        </div>
        `
    }


}