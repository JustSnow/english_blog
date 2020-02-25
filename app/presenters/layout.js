import db from '../models'
import LayoutRoutes from '../routes/layout/helper'
import imageSrcBuilder from '../services/image_src_builder'

function getFeaturedContentCategories() {
  return db.contentCategory.scope('published', 'featured').findAll()
}

function getContentCategories() {
  return db.contentCategory.scope('published', 'notFeatured').findAll()
}

function applyLayoutVariables(req, res, next) {
  Promise.all([
    getFeaturedContentCategories(),
    getContentCategories()
  ]).then(results => {
    res.locals.featuredContentCategories = results[0]
    res.locals.contentCategories = results[1]
    res.locals.layoutRoutes = LayoutRoutes
    res.locals.imageSrcBuilder = imageSrcBuilder

    next()
  }).catch(next)
}

export default applyLayoutVariables
