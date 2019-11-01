import db from '../models'
import createError from 'http-errors'
import contentCategoriesRouter from './layout/content_categories'

import { Router } from 'express'

const router = Router()

function getPageByAlias(alias) {
  return db.page.findOne({ where: { alias: alias } })
}

function renderStaticPage(res, page) {
  if (page === null) { throw new createError.NotFound() }

  res.render('pages/show', { page })
}

/* GET home page. */
router.get('/', (req, res, next) =>
  res.render('pages/home')
)
router.get('/about', (req, res, next) => {
  getPageByAlias('about').then(page => {
    renderStaticPage(res, page)
  }).catch(next)
})
router.get('/contacts', (req, res, next) => {
  getPageByAlias('contacts').then(page => {
    renderStaticPage(res, page)
  }).catch(next)
})
router.get('/privacy-and-policy', (req, res, next) => {
  getPageByAlias('privacy-and-policy').then(page => {
    renderStaticPage(res, page)
  }).catch(next)
})

router.use('/content-categories', contentCategoriesRouter)

export default router
