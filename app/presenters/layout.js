import db from '../models'

function getContentCategories() {
  return db.contentCategory.findAll()
}

function applyLayoutVariables(req, res, next) {
  Promise.all([
    getContentCategories()
  ]).then(results => {
    res.locals.contentCategories = results[0]

    next()
  }).catch(next)
}

export default applyLayoutVariables
