export default class Comment {
    constructor(data) {
        this._id = data._id
        this.title = data.title
        this.description = data.description
        this.image = data.image
        this.comments = data.comments
    }

    getCommentsTemplate() {
        return `

        `
    }
}