export default class Post {
    constructor(data) {
        this._id = data._id
        this.title = data.title
        this.description = data.description
        this.image = data.image
        this.hot = data.hot
        this.cool = data.cool
    }

    getPostsTemplate() {
        return `
        <div class="card">
            <img class="card-img-top" src="${this.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${this.title}</h5>
                <p class="card-text">${this.description}</p>
                <button class="btn btn-outline-dark shadow" onclick="app.controllers.postController.viewActivePost('${this._id}')">View Peeve</button>
                <p class="" id="hot-counter"># hot: ${this.hot}</p>
                <p class="" id="cool-counter"># cool: ${this.cool}</p>
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
                    <button class="btn btn-danger shadow" onclick="app.controllers.activePostController.hot('${this._id}')">Hot</button>
                    <button class="btn btn-primary shadow" onclick="app.controllers.activePostController.cool('${this._id}')">Cool</button>
                </div>
        </div>
        `
    }

}