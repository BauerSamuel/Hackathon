export default class Post {
    constructor(data) {
        this._id = data._id
        this.title = data.title
        this.description = data.description
        this.image = data.image
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
                <h5 class="card-text">${this.description}</h5>
                <button class="btn btn-outline-dark shadow" onclick="app.controllers.postController.viewActivePost('${this._id}')">View Peeve</button><br>
                <button class="btn btn-sm btn-danger shadow" onclick="app.controllers.postController.postHot('${this._id}')">Fire</button><p class="ml-3" id="hot-counter"># hot: ${this.postHot}</p><br>
                <button class="btn btn-sm btn-primary shadow" onclick="app.controllers.postController.postCool('${this._id}')">Cool</button><p class="ml -3" id="cool-counter"># cool: ${this.postCool}</p>
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
                    <button class="btn btn-danger shadow" onclick="app.controllers.postController.hot('${this._id}')">Hot</button>
                    <button class="btn btn-primary shadow" onclick="app.controllers.postController.cool('${this._id}')">Cool</button>
                </div>
        </div>
        `
    }

}