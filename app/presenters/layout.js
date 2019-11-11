import db from '../models'
import LayoutRoutes from '../routes/layout/helper'

function getContentCategories() {
  return db.contentCategory.findAll()
}

function applyLayoutVariables(req, res, next) {
  Promise.all([
    getContentCategories()
  ]).then(results => {
    res.locals.contentCategories = results[0]
    res.locals.layoutRoutes = LayoutRoutes

    next()
  }).catch(next)
}

export default applyLayoutVariables
