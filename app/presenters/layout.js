import db from '../models'
import LayoutRoutes from '../routes/layout/helper'
import imageSrcBuilder from '../services/image_src_builder'

function getContentCategories() {
  return db.contentCategory.scope('published', 'featured').findAll()
}

function applyLayoutVariables(req, res, next) {
  Promise.all([
    getContentCategories()
  ]).then(results => {
    res.locals.contentCategories = results[0]
    res.locals.layoutRoutes = LayoutRoutes
    res.locals.imageSrcBuilder = imageSrcBuilder

    next()
  }).catch(next)
}

export default applyLayoutVariables
