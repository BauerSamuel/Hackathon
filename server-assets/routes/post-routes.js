let Posts = require('../models/post')

let router = require('express').Router()

router.get('', (req, res, next) => {
  Posts.find({})
    .then(posts => res.send(posts))
    .catch(err => res.status(400).send(err))

})



router.get('/:id', (req, res, next) => {

  Posts.findById(req.params.id)
    .then(post => res.send(post))
    .catch(err => res.status(400).send(err))

})



router.post('', (req, res, next) => {
  Posts.create(req.body)
    .then(post => res.send(post))
    .catch(err => res.status(400).send(err))

})


router.delete('/:id', (req, res, next) => {
  Posts.findByIdAndDelete(req.params.id)
    .then(() => res.send('Deleted post.'))
    .catch(err => res.status(400).send(err))
})

//this put request is responsible for both posting and deleting comments
router.put('/:id/comments', (req, res, next) => {
  debugger
  Posts.findById(req.params._id)
    .then(post => {
      //req.body will always be comment
      if (!req.body._id) {
        //create/posting a comment
        post.comments.push(req.body)
      } else {
        //deleting this comment
        for (let i = 0; i < post.comments.length; i++) {
          let c = post.comments[i]
          if (c._id == req.body._id) post.comments.splice(i, 1)
        }
      }
      return post.save()
    })
    .then(() => res.send("Comment change successful."))
    .catch(err => {
      console.log('bingo')
      res.status(400).send(err)
    })

})

//responsible for incrementing either hot or cold
router.put('/:id/hot-cold', (req, res, next) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (req.body.hot) {
        for (let i = 0; i < post.comments.length; i++) {
          let c = post.comments[i];
          if (c._id == req.body._id) post.comments[i].commentHot++
        }

        //increment hot
        //find the element in the array, post.comments, of comments and update
        //req.body is a complete comment object so will have an _id

      } else {
        for (let i = 0; i < post.comment.length; i++) {
          let c = post.comments[i];
          if (c._id == req.body._id) post.comments[i].commentCool++;
        }
        //increment cold
        //find the element in the array of comments and update

      }
      return post.save()
    })
    .then(() => res.send("Post updated!"))
    .catch(e => res.status(400).send(e))
})

module.exports = { router }
